import api from "../lib/axios";

export const authService = {
    signUp: async (username: string, password: string, email: string, firstName: string, lastName: string) => {
        const response = await api.post("/auth/signup", {
            username,
            password,
            email,
            firstName,
            lastName
        },
            { withCredentials: true });
        return response.data;
    },
    signIn: async (username: string, password: string) => {
        const response = await api.post('/auth/login', {
            username,
            password
        },
            { withCredentials: true });
        return response.data;
    },
    signOut: async () => {
        return api.post('/auth/signout', {}, { withCredentials: true });
    },
    fetchMe: async () => {
        const response = await api.get('/users/me', { withCredentials: true });
        return response.data.user;
    },
    refreshToken: async () => {
        const response = await api.post('/auth/refresh',{}, { withCredentials: true });
        return response.data;
    },
    test: async () => {
        const response = await api.get('/auth/test', { withCredentials: true });
        return response.data;
    }
}