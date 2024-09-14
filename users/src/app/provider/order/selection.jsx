'use client'
import React, { createContext, useState, useContext } from 'react';

const SelectedMealContext = createContext();

export const SelectedMealProvider = ({ children }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    const openModal = (meal) => {
        setSelectedMeal(meal);
        setSelectedOptions({});
    };

    const closeModal = () => {
        setSelectedMeal(null);
    };

    const handleOptionChange = (category, optionName) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [category]: optionName,
        }));
    };

    return (
        <SelectedMealContext.Provider value={{ selectedMeal, openModal, closeModal, handleOptionChange, selectedOptions }}>
            {children}
        </SelectedMealContext.Provider>
    );
};

export const useSelectedMeal = () => useContext(SelectedMealContext);
