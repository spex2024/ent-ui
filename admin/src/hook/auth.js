'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuthStore from "@/store/authenticate";

const useAuth = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    // const baseurl = "http://localhost:8080";
    const baseurl = 'https://api.spexafrica.app';

    const login = async (data) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/admin/login`, data, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response?.data?.message);
                router.push('/'); // or any protected route
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
        console.error = () => {};
    };

    const logout = async () => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/admin/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                setSuccess(response.data?.message);
                router.push('/login'); // or any public route
            }
        } catch (error) {
            setError(error.response.data?.message);
        }
    };

    const addUser = async (user) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/register`, user);
            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
                router.push('/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const addVendor = async (vendor) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/vendor/add-vendor`, vendor);
            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
                router.push('/vendors');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handlePackRequest = async ({ id, action }) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/approve`, { id, action });
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resetRequest = async (user) => {
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/request`, user);
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resetPassword = async (user, token) => {
        const data = { token, ...user };
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/reset`, data);
            if (response.status === 200) {
                router.push('/login');
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resendVerification = async (data) => {
        try {
            const response = await axios.post(`${baseurl}/api/user/resend`, data);
            router.push('/login');
            setSuccess(response.data.message);
            if (response.status === 400) {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    const completeOrder = async (orderId) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/orders/complete`, { orderId }, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const cancelOrder = async (orderId) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/orders/cancel`, { orderId }, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const deleteUser = async (userId) => {
        setError(null);
        try {
            const response = await axios.delete(`${baseurl}/api/user/employee/${userId}`, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const deleteVendor = async (vendorId) => {
        setError(null);
        try {
            const response = await axios.delete(`${baseurl}/api/vendor/${vendorId}`, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response?.data?.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const deleteEnterprise = async (entId) => {
        setError(null);
        try {
            const response = await axios.delete(`${baseurl}/api/enterprise/agency/${entId}`, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response?.data?.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const deleteOrder = async (orderId) => {
        setError(null);
        try {
            const response = await axios.delete(`${baseurl}/api/orders/${orderId}`, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response?.data?.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const updateVendor = async (vendorId, userData) => {
        setError(null);
        try {
            const response = await axios.put(`${baseurl}/api/vendor/update/${vendorId}`, userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                router.push('/vendors');
                setSuccess(response?.data?.message);
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const updateEnterprise = async (entId, userData) => {
        setError(null);
        try {
            const response = await axios.put(`${baseurl}/api/enterprise/update/${entId}`, userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setTimeout(() => { window.location.reload(); }, 3000); // Delayed reload
                setSuccess(response?.data?.message);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    return {
        login,
        logout,
        addUser,
        addVendor,
        resetRequest,
        resetPassword,
        resendVerification,
        handlePackRequest,
        completeOrder,
        cancelOrder,
        deleteUser,
        deleteVendor,
        deleteEnterprise,
        deleteOrder,
        updateVendor,
        updateEnterprise,
        error,
        success,
    };
};

export default useAuth;
