import {create} from 'zustand';
import axios from 'axios';


// const baseurl = 'https://api.spexafrica.app';
const baseurl = "http://localhost:8080";

const useReturnedPacksStore = create((set) => ({
    returnedPacks: [],
    newPacks: 0,  // New state to track the number of new return packs
    loading: false,
    error: null,

    fetchReturnedPacks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${baseurl}/api/admin/return-packs`, { withCredentials: true });
            set({
                returnedPacks: response.data.packRequests,
                newPacks: response.data.packRequests.filter(pack => pack.status === 'Pending').length,  // Update newPacks based on status
                loading: false
            });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updatePackStatus: (id, action) => set((state) => {
        console.log(`Updating pack status: id=${id}, action=${action}`);

        // Update the status in the store
        const updatedPacks = state.returnedPacks.map(pack => {
            if (pack._id === id) {
                const newStatus = action === 'Approved' ? 'Approved' : 'Rejected';
                console.log(`Pack ID ${id} status updated to: ${newStatus}`);
                return { ...pack, status: newStatus };
            }
            return pack;
        });

        // Update the count of new packs
        const newPacksCount = updatedPacks.filter(pack => pack.status === 'Pending').length;

        return {
            returnedPacks: updatedPacks,
            newPacks: newPacksCount
        };
    }),

}));

export default useReturnedPacksStore;
