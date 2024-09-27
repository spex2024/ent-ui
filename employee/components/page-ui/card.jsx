"use client";
import React, { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

import useSelectedMealStore from "../../app/store/selection";
import useUserStore from "../../app/store/profile";

import NotFound from "./not-found";
import useCartStore from "../../app/store/cart";

const FoodProductCard = () => {
  const { user, fetchUser } = useUserStore();
  const { openModal } = useSelectedMealStore();
  const {  clearNotifications } = useCartStore();
  useEffect(() => {
    clearNotifications();
  }, [clearNotifications]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  const agency = user?.agency;
  const vendors = agency?.vendors;

  const mealItem = vendors?.flatMap((vendor) => vendor.meals);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 justify-center lg:px-10 place-items-center px-5">
      {mealItem?.length > 0 ? (
        mealItem.map((meal) => (
          <div
            key={meal._id}
            className="group my-10 w-full lg:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md m-4"
          >
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                alt="mealimage"
                className="peer absolute top-0 right-0 h-full w-full object-cover"
                src={meal?.imageUrl}
              />
            </Link>
            <div className="mt-4 px-5 pb-5">
              <div className="mt-2 mb-5 flex items-center justify-between">
                <Link href="#">
                  <h5 className="text-2xl tracking-tight text-slate-900 font-bold">
                    {meal.main?.name || ""}
                  </h5>
                </Link>
                <button onClick={() => openModal(meal)}>
                  <ShoppingBasket className="text-black" />
                </button>
              </div>
              <div className="w-full flex items-center justify-between rounded-full text-center text-sm cursor-pointer">
                <p className="text-xs">
                  {meal.vendor?.name} ({meal.vendor?.location})
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={`w-full flex justify-center items-center h-screen`}>
          <NotFound message="No meals found" />
        </div>
      )}
    </div>
  );
};

export default FoodProductCard;
