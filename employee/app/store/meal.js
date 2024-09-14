// stores/mealStore.js
import { create } from "zustand";
import axios from "axios";
// const baseurl = "https://enterprise-backend.vercel.app";
const baseurl = "https://enterprise-backend-l6pn.onrender.com";
// const baseurl = "http://localhost:8080";
const useMealStore = create((set) => ({
  meal: [],
  error: null,
  fetchMeals: async () => {
    try {
      const response = await axios.get(`${baseurl}/api/vendor/meal`, {
        withCredentials: true,
      });

      if (response.data) {
        set({ meal: response.data, error: null });
      } else {
        set({ error: "No data received from the server." });
      }
    } catch (error) {
      console.error(
        "Error fetching meals:",
        error.response ? error.response.data : error.message,
      );
      set({ error: "Failed to fetch meals. Please try again later." });
    }
  },
}));

export default useMealStore;
