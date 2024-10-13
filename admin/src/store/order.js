// stores/ordersStore.js
import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


// const baseurl = 'https://api.spexafrica.app';

// const baseurl = "http://localhost:8080";
const useOrdersStore = create((set) => ({
    orders: [],
    newOrderCount: 0,


    fetchOrders: async () => {
        try {
            const response = await axios.get(`${baseurl}/api/orders/orders`, { withCredentials: true });
            set((state) => {
                const newOrders = response.data;
                const existingOrderIds = new Set(state.orders.map(order => order._id));

                // Filter new orders to find those that are not already in the store
                const newlyFetchedOrders = newOrders.filter(order => !existingOrderIds.has(order._id));

                // Check for pending status in newly fetched orders
                const pendingOrders = newlyFetchedOrders.filter(order => order.status === 'pending');

                if (pendingOrders.length > 0) {
                    toast.success(`You have ${pendingOrders.length} new pending order(s)!`);
                }

                // Calculate the number of new orders
                const newOrderCount = newlyFetchedOrders.length;

                return {
                    orders: [...state.orders, ...newlyFetchedOrders],
                    newOrderCount,
                    debug: response.data
                };
            });
            console.log('Fetched orders:', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },

    updateNewOrderCount: () => set((state) => ({ newOrderCount: state.orders.length })),

}));

export default useOrdersStore;
