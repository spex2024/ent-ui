"use client";

import React from "react";
import { Link } from "@nextui-org/react";
import { PackageCheck, ShoppingBasket, WalletIcon } from "lucide-react";
import useUserStore from "@/app/store/profile";

const menuItems = [
  {
    icon: <ShoppingBasket color={`#fff`} size={40} />,
    alt: "Order",
    text: "Order Your Meals",
    link: "/meals",
  },
  {
    icon: <WalletIcon color={`#fff`} size={40} />,
    alt: "Wallet",
    text: "View Your Wallet",
    link: "/wallet",
  },
  {
    icon: <PackageCheck color={`#fff`} size={40} />,
    alt: "Return Pack",
    text: "Return a Pack",
    link: "/return-pack",
    showNotification: true, // Add this flag to indicate where to show notification
  },
];


const Menu = () => {
  const { user } = useUserStore();
  const packStatus = user?.pack?.status;

  return (
    <div className="w-full relative lg:mt-12 lg:mb-10">
      <div className="w-full grid lg:grid-cols-3 gap-10 lg:gap-5 place-items-center lg:w-full lg:px-96 py-10 md:px-64">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="relative flex flex-col items-center bg-black w-52 py-10 text-center border lg:w-36 h-36 rounded-xl gap-4 dark:bg-neutral-900 dark:border-neutral-800">
              <div>{item.icon}</div>
              <p className="text-sm font-medium capitalize font-body text-white lg:text-sm md:text-xs">
                {item.text}
              </p>
              {item.showNotification && packStatus === "active" && (
                <div className="absolute top-2 right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center">
                  <p className={`text-xs text-white`}>1</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
