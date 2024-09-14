"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

import FoodProductCard from "../../../components/page-ui/card";
import MealModal from "../../../components/page-ui/modal";
import Cart from "../../../components/page-ui/cart";
import useAuthStore from "../../store/authenticate";

const MealList = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [isAuthenticated, router]);

  // Optionally, you can return a loading indicator while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ScaleLoader color={"#000"} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen `}>
      <FoodProductCard />
      <MealModal />
      <Cart />
    </div>
  );
};

export default MealList;
