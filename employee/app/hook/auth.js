"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import useAuthStore from "@/app/store/authenticate";

const useAuth = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setIsAuthenticated } = useAuthStore();
  // const baseurl = "http://localhost:8080";
  // const baseurl = "https://enterprise-backend.vercel.app";
  const baseurl = "https://enterprise-backend-l6pn.onrender.com";

  const login = async (data) => {
    try {
      const response = await axios.post(`${baseurl}/api/user/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setSuccess(response.data.message);
        router.push("/"); // or any protected route
      }
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      const response = await axios.post(
        `${baseurl}/api/user/logout`,
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setIsAuthenticated(false);
        router.push("/login"); // or any public route
      }
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const addUser = async (user) => {
    setError(null);
    try {
      const response = await axios.post(`${baseurl}/api/user/register`, user);

      if (response.status === 200) {
        setSuccess(response.data.message);
        router.push("/login");
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

  const returnPack = async (code) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        `${baseurl}/api/user/return-pack`,
        code,
        { withCredentials: true },
      );

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
        router.push("/login");
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

      router.push("/login");
      setSuccess(response.data.message);
      if (response.status === 400) {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  // New function for updating the user profile
  const updateProfile = async (userId, userData) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.put(
        `${baseurl}/api/user/employee/${userId}`,
        userData,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return {
    login,
    logout,
    addUser,
    resetRequest,
    resetPassword,
    resendVerification,
    returnPack,
    updateProfile, // include the new function in the returned object
    success,
    error,
  };
};

export default useAuth;
