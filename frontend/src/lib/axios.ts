import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

//gán access token vào header của mỗi request
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config;

    //những api cần làm mới token khi bị lỗi 401
    if (originalRequest.url.includes('/auth/signup') ||
        originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error);
    }
    originalRequest._retryCount = originalRequest._retryCount || 0;
    if (error.response?.status === 403 && originalRequest._retryCount < 4) {
        originalRequest._retryCount += 1;
        console.log("Refreshing token, attempt:", originalRequest._retryCount);
        try {
            const response = await api.post('/auth/refresh', { withCredentials: true });
            const newAccessToken = response.data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (err) {
            useAuthStore.getState().cleanState();
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
});
export default api;