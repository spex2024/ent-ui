// stores/useUserStore.js
import { create } from 'zustand';
import axios from 'axios';

// const baseurl = 'https://enterprise-backend.vercel.app';
const baseurl = 'https://backend.ekowenu.site';

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
