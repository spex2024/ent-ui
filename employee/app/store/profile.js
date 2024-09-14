// stores/userStore.js
import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  fetchUser: async () => {
    // const baseurl = "http://localhost:8080";
    // const baseurl = "https://enterprise-backend.vercel.app";
    const baseurl = "https://enterprise-backend-l6pn.onrender.com";

    try {
      const response = await axios.get(`${baseurl}/api/user/employee`, {
        withCredentials: true,
      });

      set({ user: response.data.user, loading: false, error: null });
    } catch (error) {
      set({
        user: null,
        loading: false,
        error: error.response
          ? error.response.data.message
          : "An error occurred",
      });
    }
  },
}));

export default useUserStore;
