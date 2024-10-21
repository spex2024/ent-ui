// stores/agencyStore.js
import create from 'zustand';
import axios from 'axios';


// const baseurl = 'https://api.spexafrica.app';
// // const baseurl = "http://localhost:8080";
//

const baseurl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.spexafrica.app';
const useAgencyStore = create((set) => ({
    agencies: [],
    loading: false,
    error: null,

    fetchAgencies: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${baseurl}/api/admin/agency`, { withCredentials: true });
            set({ agencies: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },


    setError: (error) => set({ error }),
}));



export default useAgencyStore;
