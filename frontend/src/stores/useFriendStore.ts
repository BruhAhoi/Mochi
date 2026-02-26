
import { friendService } from "../services/friendService";
import type { FriendState } from "../types/store";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set) => ({
    loading: false,
    friends: [],
    receivedList: [],
    sentList: [],
    searchByUsername: async (username: string) => {
        try{
            set({ loading: true });
            const user = await friendService.searchByUsername(username);
            return user;
        }catch(error){
            console.error("Search friend error", error);
            return null;
        } finally {
            set({ loading: false });
        }
    },
    addFriend: async (to, message) => {
        try{
            set({ loading: true }); 
            const resultMessage = await friendService.sendFriendRequest(to, message);
            return resultMessage;
        }catch(error){
            console.error("Add friend error", error);
            return "Failed to send friend request";
        } finally {
            set({ loading: false });
        }
    },
    getAllFriendRequest: async () => {
        try{
            set({ loading: true });

            const result = await friendService.getAllFriendRequest();

            if(!result) return;

            const {received, sent} = result;
            set({ receivedList: received, sentList: sent });

        }catch(error){
            console.error("Get friend request error", error);
        } finally {
            set({ loading: false });
        }
    },
    acceptRequest: async (requestId) => {
        try{
            set({ loading: true });

            await friendService.acceptRequest(requestId);

            set((state) => ({
                receivedList: state.receivedList.filter(req => req._id !== requestId)
            }));
        }catch(error){
            console.error("Accept friend request error", error);
        } finally {
            set({ loading: false });
        }
    },
    declineRequest: async (requestId) => {
        try{
            set({ loading: true });
            await friendService.declineRequest(requestId);
            set((state) => ({
                receivedList: state.receivedList.filter(req => req._id !== requestId)
            }));
        }catch(error){
            console.error("Decline friend request error", error);
        } finally {
            set({ loading: false });
        }
    },
    getFriends: async () => {
        try{
            set({ loading: true });
            const friends = await friendService.getFriendList();
            set({ friends });
        }catch(error){
            console.error("Get friend list error", error);
        } finally {
            set({ loading: false });
        }
    }

}));