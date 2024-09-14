'use client'
import create from 'zustand';
import axios from "axios";

const useCartStore = create((set, get) => ({
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
    isDrawerOpen: false,
    addToCart: (meal, options) => set((state) => {
        const itemIndex = state.cart.findIndex(item =>
            item.mealId === meal._id &&
            item.protein === options['protein'] &&
            item.sauce === options['sauce'] &&
            item.extras === options['extras']
        );

        if (itemIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[itemIndex].quantity += 1;
            return {
                cart: updatedCart,
                totalPrice: state.totalPrice + meal.main.price,
                totalQuantity: state.totalQuantity + 1
            };
        } else {
            const newCartItem = {
                mealId: meal._id,
                main: meal.main.name,
                price: meal.main.price,
                protein: options['protein'] || '',
                sauce: options['sauce'] || '',
                extras: options['extras'] || '',
                quantity: 1,
            };
            return {
                cart: [...state.cart, newCartItem],
                totalPrice: state.totalPrice + meal.main.price,
                totalQuantity: state.totalQuantity + 1
            };
        }
    }),
    removeFromCart: (index) => set((state) => {
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
            totalQuantity: newTotalQuantity
        };
    }),
    increaseQuantity: (index) => set((state) => {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity += 1;
        return {
            cart: updatedCart,
            totalPrice: state.totalPrice + updatedCart[index].price,
            totalQuantity: state.totalQuantity + 1
        };
    }),
    decreaseQuantity: (index) => set((state) => {
        const updatedCart = [...state.cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            return {
                cart: updatedCart,
                totalPrice: state.totalPrice - updatedCart[index].price,
                totalQuantity: state.totalQuantity - 1
            };
        } else {
            updatedCart.splice(index, 1);
            return {
                cart: updatedCart,
                totalPrice: state.totalPrice - updatedCart[index].price,
                totalQuantity: state.totalQuantity - 1
            };
        }
    }),
    checkout: async () => {
        const { cart, totalPrice, totalQuantity } = get(); // Use `get` to access state in async functions
        try {
            // Log total price and total quantity for debugging
            console.log('Total Price:', totalPrice , cart);
            console.log('Total Quantity:', totalQuantity);

            // Example API request
            const response = await axios.post('http://localhost:8080/api/orders/order', {
              cart,
              totalPrice,
              totalQuantity
            },{withCredentials:true});

            console.log('Order submitted:', response);
            set({ cart: [], totalPrice: 0, totalQuantity: 0, isDrawerOpen: false });
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    },
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export default useCartStore;
