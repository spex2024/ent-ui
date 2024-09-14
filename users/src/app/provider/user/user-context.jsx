// contexts/UserContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from "@/app/hook/auth";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    const baseurl = 'http://localhost:8080';

    useEffect(() => {


        const fetchUser = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/user/employee`, { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'An error occurred');
            }
        };

            fetchUser();

    }, []);


    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
