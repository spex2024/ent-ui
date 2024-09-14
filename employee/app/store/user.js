// stores/useUserStore.js
import { create } from "zustand";
import axios from "axios";

// const baseurl = "http://localhost:8080";
// const baseurl = "https://enterprise-backend.vercel.app";
const baseurl = "https://enterprise-backend-l6pn.onrender.com";
const useUserStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseurl}/api/user/employees`, {
        withCredentials: true,
      });

      set({ user: response.data.user, loading: false });
    } catch (error) {
      set({
        error: error.response
          ? error.response.data.message
          : "An error occurred",
        loading: false,
      });
    }
  },
}));

export default useUserStore;
