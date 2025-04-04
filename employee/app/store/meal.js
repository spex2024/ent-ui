// stores/mealStore.js
import { create } from "zustand";
import axios from "axios";

// const baseurl = "https://api.spexafrica.app";
// // const baseurl = "http://localhost:8080";

const baseurl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : (typeof window !== 'undefined' && window.location.hostname.endsWith('.site'))
        ? 'https://api.spexafrica.site'
        : 'https://api.spexafrica.app';

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
