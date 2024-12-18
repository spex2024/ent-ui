"use client";
import create from "zustand";
import axios from "axios";

// const baseurl = "https://api.spexafrica.app";
// // const baseurl = "http://localhost:8080";

const baseurl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : (typeof window !== 'undefined' && window.location.hostname.endsWith('.site'))
        ? 'https://api.spexafrica.site'
        : 'https://api.spexafrica.app';


const useCartStore = create((set) => ({
  success: null,
  error: null,

  // Submit the order directly without adding to cart
  submitOrder: async (meal, selectedDays, options) => {
    // Destructure necessary fields from the meal object
    const { _id, vendor, price, mealName, createdAt, imageUrl } = meal;

    // Create the order object to send to the backend
    const orderData = {
      meal: {
        id: _id,
        vendor,
        mealName,
        createdAt,
        imageUrl,
        price,
        quantity: 1,
      },
      selectedDays, // This should appear here if passed correctly
      options, // Include options if relevant
    };
    console.log("Order data being sent:", orderData);

    try {
      const response = await axios.post(
        `${baseurl}/api/orders/order`,
        orderData,
        { withCredentials: true },
      );

      console.log(response.data.message);

      // Verify the correct structure of the response
      if (response.status === 201 && response.data?.message) {
        set({
          success: response.data.message, // Set the success message from backend
          error: null, // Clear any previous errors
        });
      } else {
        set({
          error: response.data.message,
          success: null,
        });
      }
    } catch (error) {
      // Handle different error structures
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while placing the order.";

      set({
        error: errorMessage,
        success: null, // Clear success in case of error
      });
    }
  },

  // Function to clear notifications
  clearNotifications: () => {
    set({
      success: null,
      error: null,
    });
  },
}));

export default useCartStore;
