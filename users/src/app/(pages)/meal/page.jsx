'use client';
import React from 'react';



import {useMeals} from "@/app/provider/meals/meals";
import {useSelectedMeal} from "@/app/provider/order/selection";
import MealModal from "@/app/components/page-ui/modal";
import MealCard from "@/app/components/page-ui/card";


const MealList = () => {
    const { meals } = useMeals();
    const { openModal } = useSelectedMeal();

    return (
        <div className="w-full">

                {meals?.map((meal) => (

                    <MealCard key={meal.id} meal={meal} openModal={openModal} />
                ))}
            <MealModal/>


        </div>
    );
};

export default MealList;
