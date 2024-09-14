'use client'

import React from 'react';
import {Link} from "@nextui-org/react";
import {PackageCheck, ShoppingBasket, WalletIcon,} from "lucide-react";

const menuItems = [
    { icon: <ShoppingBasket size={70} color={`#fff`} />, alt: 'Order', text: 'Order Now', link:'/meals' },
    { icon: <WalletIcon size={70} color={`#fff`} />, alt: 'Wallet', text: 'Wallet',link:'/profile' },
    { icon: <PackageCheck size={70} color={`#fff`} />, alt: 'Order', text: 'Return Pack' ,link:'/return-pack'},

];

const Menu = () => {
    return (
        <div className="container relative  mt-12">
            <div className="grid lg:grid-cols-3 gap-3 place-items-center  lg:w-full lg:px-96 py-10">
                {menuItems.slice(0, 3).map((item, index) => (
                    <Link key={index} href={item.link} >
                        <div className=" flex flex-col items-center  bg-black w-52 py-10 text-center border lg:w-44 h-38 rounded-xl gap-2">
                            {item.icon}
                            <p className="text-sm font-medium capitalize font-body text-white lg:text-lg md:text-base ">
                                {item.text}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;
