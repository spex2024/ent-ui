import { create } from "zustand";
import axios from "axios";

const baseurl = "https://api.spexafrica.app";
// const baseurl = "http://localhost:8080";

const useReturnedPacksStore = create((set) => ({
  returnedPacks: [],
  newPacks: 0, // New state to track the number of new return packs
  loading: false,
  error: null,

  fetchReturnedPacks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseurl}/api/user/return-pack`, {
        withCredentials: true,
      });

      set({
        returnedPacks: response.data.packRequests,
        newPacks: response.data.packRequests.filter(
          (pack) => pack.status === "Pending",
        ).length, // Update newPacks based on status
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useReturnedPacksStore;
