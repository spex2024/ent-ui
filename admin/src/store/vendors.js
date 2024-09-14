// stores/vendorStore.js
import create from 'zustand';
import axios from 'axios';

// const baseurl = 'https://enterprise-backend.vercel.app';
const baseurl = 'https://enterprise-backend-l6pn.onrender.com';
// const baseurl = "http://localhost:8080";

const useVendorStore = create((set) => ({
    vendors: [],
    loading: false,
    error: null,

    fetchVendors: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${baseurl}/api/admin/vendors`, { withCredentials: true });
            set({ vendors: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },


    setError: (error) => set({ error }),
}));

export default useVendorStore;
