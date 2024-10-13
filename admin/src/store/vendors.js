// stores/vendorStore.js
import {create} from 'zustand';
import axios from 'axios';


// const baseurl = 'https://api.spexafrica.app';
const baseurl = "http://localhost:8080";

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
