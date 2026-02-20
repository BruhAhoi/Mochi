import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
    persist((set, get) => ({
        accessToken: null,
        user: null,
        loading: false,

        setAccessToken: (token) => {
            set({ accessToken: token });
        },
        cleanState: () => {
            set({ accessToken: null, user: null, loading: false });
            useChatStore.getState().reset();
            localStorage.clear();
            sessionStorage.clear();
        },

        signUp: async (username, password, email, firstname, lastname) => {
            try {
                get().cleanState();
                set({ loading: true });
                await authService.signUp(username, password, email, firstname, lastname);
                toast.success("Đăng kí thành công!")
            } catch (error) {
                toast.error("Đăng kí thất bại. Vui lòng thử lại.")
            }
        },
        signIn: async (username, password) => {
            try {
                set({ loading: true });
                localStorage.clear();
                useChatStore.getState().reset();
                const { accessToken } = await authService.signIn(username, password);
                get().setAccessToken(accessToken);
                await get().fetchMe();
                useChatStore.getState().fetchConversations();
                toast.success("Đăng nhập thành công!")
            } catch (error) {
                console.error("Sign in error:", error);
                toast.error("Đăng nhập thất bại. Vui lòng thử lại.")
            } finally {
                set({ loading: false });
            }
        },
        signOut: async () => {
            try {
                get().cleanState();
                await authService.signOut();
                toast.success("Đăng xuất thành công!")
            } catch (error) {
                console.error("Sign out error:", error);
                toast.error("Đăng xuất thất bại. Vui lòng thử lại.")
            }
        },
        fetchMe: async () => {
            try {
                const user = await authService.fetchMe();
                set({ user });
            } catch (error) {
                console.error("Fetch me error:", error);
                set({ user: null, accessToken: null });
                toast.error("Không thể lấy thông tin người dùng.")
            } finally {
                set({ loading: false });
            }
        },
        refreshToken: async () => {
            try {
                const { user, fetchMe, setAccessToken } = get();
                const accessToken = await authService.refreshToken();
                setAccessToken(accessToken);
                if (!user) {
                    await fetchMe();
                }
            } catch (error) {
                console.error("Refresh token error:", error);
                toast.error("Phiên đã hết hạn. Vui lòng đăng nhập lại.");
                get().cleanState();
            } finally {
                set({ loading: false });
            }
        },
    }), {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user }),
    })
);