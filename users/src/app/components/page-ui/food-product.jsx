'use client'
import React, { useState, useEffect } from 'react';
import { useMeals } from "@/app/provider/meals/meals";
import { useSelectedMeal } from "@/app/provider/order/selection";
import { ShoppingBasket, Star } from "lucide-react";
const FoodProductCard = () => {
    const [meals, setMeals] = useState([]);
    const { meal } = useMeals();
    const { openModal } = useSelectedMeal();

    useEffect(() => {
        meal.map((meal) => (
            setMeals(meal.meals)

        ))

    }, [meal]);

    console.log(meals);

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 justify-center lg:px-10 place-items-center px-5">
            {meals?.map((meal) => (
                <div key={meal._id} className="group my-10 w-full lg:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md m-4">
                    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={meal?.imageUrl} alt="mealimage" />
                    </a>
                    <div className="mt-4 px-5 pb-5">
                        <div className="mt-2 mb-5 flex items-center justify-between">
                            <a href="#">
                                <h5 className="text-2xl tracking-tight text-slate-900 font-bold">{meal.main?.name || ''}</h5>
                            </a>
                            <button onClick={() => openModal(meal)}>
                                <ShoppingBasket className="text-black"/>
                            </button>
                        </div>
                        <div
                            className="w-full flex items-center justify-between rounded-full text-center text-sm cursor-pointer">
                            <p className={`text-xs `}>{meal.vendor.name}({meal.vendor.location})</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodProductCard;
