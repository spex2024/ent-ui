'use client'
import React from 'react';
import useCartStore from "@/app/provider/order/cart";
import {CirclePlus,Trash2,CircleMinus ,ShoppingBasket,CircleX} from "lucide-react";


const Cart = () => {
    const { cart, totalPrice, totalQuantity, removeFromCart, increaseQuantity, decreaseQuantity, checkout, isDrawerOpen, toggleDrawer } = useCartStore();

    return isDrawerOpen ? (
        <div className="fixed inset-0 z-50 flex ">
            <div className="w-full max-w-md p-4 bg-white shadow-lg flex flex-col justify-between ">
                <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><ShoppingBasket size={20} strokeWidth={1} /> Basket</h3>
                    <button onClick={toggleDrawer} className={`bg-black text-white rounded-full`}>
                        <CircleX />
                    </button>
                </div>
                {cart.length > 0 ? (
                    <ul className="space-y-4 h-full overflow-y-auto p-2 ">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <div className="flex-1">
                                    <span className={'font-bold'}>{item.main} - GH₵{item.price.toFixed(2)}</span>
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <div>Option-One: {item.protein}</div>
                                        <div>Option-Two: {item.sauce}</div>
                                        <div>Option-Three: {item.extras}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">

                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="ml-4 text-red-600 hover:text-red-800 rounded-full"
                                    >
                                        <Trash2 size={20} color="#df4343" strokeWidth={1} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the cart.</p>
                )}
                <div className="pt-4 mt-4 border-t">
                    <p className="text-md font-semibold">Total Quantity: {totalQuantity}</p>
                    <button
                        onClick={checkout}
                        className="mt-4 px-4 py-2 bg-black text-white  "
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default React.memo(Cart);
