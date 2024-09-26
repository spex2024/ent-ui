"use client";
import React from "react";
import { Trash2, ShoppingBasket, CircleX } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import useCartStore from "../../app/store/cart";

const Cart = () => {
  const {
    cart,
    totalQuantity,
    removeFromCart,
    checkout,
    isDrawerOpen,
    toggleDrawer,
    success,
  } = useCartStore();


  const handleCheckout = async () => {
    await checkout();

    if (success) {
      toast.success(success);
    }
  };

  return isDrawerOpen ? (
    <div className="fixed inset-0 z-50 flex  dark:bg-neutral-900 dark:border-neutral-400 dark:text-white">
      <div className="w-full max-w-md p-4 bg-white shadow-lg flex flex-col justify-between  dark:bg-neutral-900 dark:border-neutral-400 dark:text-white">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBasket size={20} strokeWidth={1} /> Basket
          </h3>
          <button
            className="bg-black text-white rounded-full"
            onClick={toggleDrawer}
          >
            <CircleX />
          </button>
        </div>
        {cart.length > 0 ? (
          <ul className="space-y-4 h-full overflow-y-auto p-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Option-One: {item.protein}</div>
                    <div>Option-Two: {item.sauce}</div>
                    <div>Option-Three: {item.extras}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="ml-4 text-red-600 hover:text-red-800 rounded-full"
                    onClick={() => removeFromCart(index)}
                  >
                    <Trash2 color="#df4343" size={20} strokeWidth={1} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
        <div className="pt-4 mt-4 border-t">
          <p className="text-md font-semibold">
            Total Quantity: {totalQuantity}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white"
            onClick={handleCheckout}
          >
            Place Order
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  ) : null;
};

export default React.memo(Cart);
