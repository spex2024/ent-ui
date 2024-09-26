"use client";
import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const baseurl = "https://api.spexafrica.site";
// const baseurl = "http://localhost:8080";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
      isDrawerOpen: false,
      success: null,
      error: null,

      addToCart: (meal, options) =>
        set((state) => {
          const itemIndex = state.cart.findIndex(
            (item) =>
              item.mealId === meal._id &&
              item.protein === options["protein"] &&
              item.sauce === options["sauce"] &&
              item.extras === options["extras"],
          );

          if (itemIndex > -1) {
            const updatedCart = [...state.cart];

            updatedCart[itemIndex].quantity += 1;

            return {
              cart: updatedCart,
              totalPrice: state.totalPrice + meal.main.price,
              totalQuantity: state.totalQuantity + 1,
            };
          } else {
            const newCartItem = {
              mealId: meal._id,
              main: meal.main.name,
              price: meal.main.price,
              protein: options["protein"] || "",
              sauce: options["sauce"] || "",
              extras: options["extras"] || "",
              quantity: 1,
            };

            return {
              cart: [...state.cart, newCartItem],
              totalPrice: state.totalPrice + meal.main.price,
              totalQuantity: state.totalQuantity + 1,
            };
          }
        }),

      removeFromCart: (index) =>
        set((state) => {
          const item = state.cart[index];
          let updatedCart = [...state.cart];
          let newTotalPrice = state.totalPrice;
          let newTotalQuantity = state.totalQuantity;

          if (item.quantity > 1) {
            updatedCart[index].quantity -= 1;
            newTotalPrice -= item.price;
            newTotalQuantity -= 1;
          } else {
            updatedCart.splice(index, 1);
            newTotalPrice -= item.price * item.quantity;
            newTotalQuantity -= item.quantity;
          }

          return {
            cart: updatedCart,
            totalPrice: newTotalPrice,
            totalQuantity: newTotalQuantity,
          };
        }),

      checkout: async () => {
        const { cart, totalPrice, totalQuantity } = get();

        try {
          const response = await axios.post(
            `${baseurl}/api/orders/order`,
            {
              cart,
              totalPrice,
              totalQuantity,
            },
            { withCredentials: true },
          );

          if (response.status === 201) {
            set({
              cart: [],
              totalPrice: 0,
              totalQuantity: 0,
              success: response.data.message || "Order placed successfully!", // Ensure a default message is set
              isDrawerOpen: false,
            });
          }
        } catch (error) {
          set({
            error: error.response
              ? error.response.data.message
              : "An error occurred",
          });
        }
      },

      // Clear the cart and remove from sessionStorage on logout
      clearCart: () => {
        set({
          cart: [],
          totalPrice: 0,
          totalQuantity: 0,
        });

        // Remove the persisted cart data from sessionStorage
        sessionStorage.removeItem("cart-storage");
      },

      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    }),
    {
      name: "cart-storage", // Name for the storage
      getStorage: () => sessionStorage, // Use sessionStorage for persistence
    },
  ),
);

export default useCartStore;
