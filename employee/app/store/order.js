// stores/userStore.js
import { create } from "zustand";
import axios from "axios";

const useOrderStore = create((set) => ({
  orders: null,
  success: null,
  loading: true,
  error: null,
  fetchOrders: async () => {
    // // const baseurl = "http://localhost:8080";
    // const baseurl = "https://api.spexafrica.app";
    const baseurl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : (typeof window !== 'undefined' && window.location.hostname.endsWith('.site'))
            ? 'https://api.spexafrica.site'
            : 'https://api.spexafrica.app';

    try {
      const response = await axios.get(`${baseurl}/api/orders/user`, {
        withCredentials: true,
      });

      console.log(response.data.message);

      set({ orders: response.data.orders, loading: false, error: null });
    } catch (error) {
      set({
        orders: null,
        success: null,
        loading: false,
        error: error.response
          ? error.response.data.message
          : "An error occurred",
      });
    }
  },
}));

export default useOrderStore;
