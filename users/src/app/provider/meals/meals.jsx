'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuth from "@/app/hook/auth";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
    const [meal, setMeals] = useState([]);
    const [error, setError] = useState(null);
    const {user} = useAuth()

    useEffect(() => {


        const fetchMeals = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/vendor/meal',{withCredentials: true});
                setMeals(response.data)
                console.log("Meals",response.data)

            } catch (error) {
                // Set a user-friendly error message
                setError('Failed to fetch meals. Please try again later.');
            }
        };

            fetchMeals();


    }, []);

    return (
        <MealContext.Provider value={{ meal, error }}>
            {children}
        </MealContext.Provider>
    );
};

export const useMeals = () => useContext(MealContext);
