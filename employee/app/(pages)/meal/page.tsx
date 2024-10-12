'use client'
import React from 'react';
import FoodProductCard from "@/components/page-ui/card";
import MealModal from "@/components/page-ui/modal";
import Cart from "@/components/page-ui/cart";

const Meal = () => {
    return (
        <div className={`w-full max-w-7xl container mx-auto min-h-screen py-10`}>
            <FoodProductCard />
            <MealModal />
            <Cart />
        </div>
    );
};

export default Meal;