"use client";

import FoodProductCard from "../../../components/page-ui/card";
import MealModal from "../../../components/page-ui/modal";
import Cart from "../../../components/page-ui/cart";

const MealList = () => {
  return (
    <div className={`min-h-screen `}>
      <FoodProductCard />
      <MealModal />
      <Cart />
    </div>
  );
};

export default MealList;
