// stores/vendorStore.js
import {create} from 'zustand';
import axios from 'axios';


// const baseurl = 'https://api.spexafrica.app';
// // const baseurl = "http://localhost:8080";
const baseurl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : (typeof window !== 'undefined' && window.location.hostname.endsWith('.site'))
        ? 'https://api.spexafrica.site'
        : 'https://api.spexafrica.app';

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
