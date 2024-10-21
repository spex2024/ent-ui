// stores/useUserStore.js
import { create } from 'zustand';
import axios from 'axios';

//
// const baseurl = 'https://api.spexafrica.app';
// // const baseurl = "http://localhost:8080";

const baseurl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.spexafrica.app';
const useUserStore = create((set) => ({
    user: [],
    loading: true,
    error: null,
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${baseurl}/api/user/employees`, { withCredentials: true });
            console.warn(response.data);
            set({ user: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : 'An error occurred',
                loading: false,
            });
        }
    },
}));

export default useUserStore;
