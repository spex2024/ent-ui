// stores/agencyStore.js
import create from 'zustand';
import axios from 'axios';

// const baseurl = 'https://enterprise-backend.vercel.app';
const baseurl = 'https://api.spexafrica.site';
// const baseurl = "http://localhost:8080";

const useAgencyStore = create((set) => ({
    agencies: [],
    loading: false,
    error: null,

    fetchAgencies: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${baseurl}/api/enterprise/agencies`, { withCredentials: true });
            set({ agencies: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateAgency: async (agencyId, updatedData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.patch(`${baseURL}/api/enterprise/agencies/${agencyId}`, updatedData, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    agencies: state.agencies.map(agency =>
                        agency._id === agencyId ? { ...agency, ...updatedData } : agency
                    ),
                    loading: false,
                }));
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    setError: (error) => set({ error }),
}));

export const getAllOrders = async (req, res) => {
    try {
        // Optionally, you can add filters based on query parameters
        // const { status, userId } = req.query;

        // Fetch all orders from the database
        const orders = await Order.find()
            .populate('user')  // Assuming you want to populate user details
            .populate('vendor')  // Assuming you want to populate vendor details
            .sort({ createdAt: -1 });  // Sort orders by creation date, latest first

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export default useAgencyStore;
