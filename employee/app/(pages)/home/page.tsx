"use client";

import React, { useEffect } from "react";
import {
  ChevronRight,
  ArrowRight,
  ShoppingBasket,
  WalletIcon,
  RotateCcw,
} from "lucide-react";
import Link from "next/link"; // Import the Link component

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useVendorStore from "@/app/store/vendor";
import useUserStore from "@/app/store/profile";


const menuItems = [
  {
    icon: <ShoppingBasket color={`#fff`} size={40} />,
    alt: "Order",
    text: "Order Your Meals",
    link: "/meal",
  },
  {
    icon: <WalletIcon color={`#fff`} size={40} />,
    alt: "Wallet",
    text: "View Your Wallet",
    link: "/wallet",
  },
  {
    icon: <RotateCcw size={40} />,
    alt: "Return Pack",
    text: "Return a Pack",
    link: "/return-pack",
    showNotification: true, // Add this flag to indicate where to show notification
  },
];

export default function Component() {
  const { vendors, fetchVendors } = useVendorStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const packStatus = user?.pack?.status;

  return (
    <div className={`min-h-screen flex flex-col `}>
      <div className="bg-background text-foreground flex-grow">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative mb-12 rounded-lg overflow-hidden">
              <div className="absolute inset-0">
                <img
                  alt="Delicious food spread"
                  className="w-full h-full object-cover"
                  src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541341/hero_tg9gt8.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col items-start justify-end h-[400px] p-8 md:p-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white max-w-2xl">
                  Corporate Meal In Reusable Packs
                </h2>
                <p className="text-xl mb-6 text-white/80 max-w-xl">
                  Be part of the sustainable food packaging revolution!
                  Together, we can make a difference, one smart pack at a time.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {menuItems?.map((menuItem, index) => (
                <Link key={index} href={menuItem.link}>
                  <Card className="bg-[#71bc44] text-white overflow-hidden transition-transform hover:scale-105 relative">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-around sm:items-start">
                      <div>
                        {menuItem.icon}
                        {/* Always show notification if packStatus is active */}
                        {packStatus === "active" &&
                          menuItem.showNotification && (
                            <div className="absolute top-2 right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center">
                              <p className={`text-xs text-white`}>1</p>
                            </div>
                          )}
                      </div>
                      <div className="flex-grow text-center sm:text-left sm:px-5 sm:justify-center lg:gap-5">
                        <p className="text-xl font-semibold mb-1">
                          {menuItem?.alt || "name"}
                        </p>
                        <p className="text-md text-white/80 mb-2">
                          {menuItem.text || "name"}
                        </p>
                      </div>
                      <Button
                        className="bg-white text-green-600 hover:bg-green-100 mt-2 sm:mt-0"
                        size="sm"
                        variant="secondary"
                      >
                        <span className="sr-only">{menuItem?.alt}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {vendors.map(
                    (restaurant: {
                      _id: React.Key | null | undefined;
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                      imageUrl: string | undefined;
                      location:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                      rating:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                    }) => (
                      <CarouselItem
                        key={restaurant?._id}
                        className="pl-2 md:pl-4 sm:basis-full md:basis-1/4"
                      >
                        <div className="p-1">
                          <Card className="overflow-hidden">
                            <CardContent className="p-0 relative">
                              <img
                                alt={`${restaurant?.name}`}
                                className="w-full h-36 object-cover"
                                src={restaurant?.imageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-2">
                                <p className="text-sm font-bold text-white truncate">
                                  {restaurant?.name || "no name"}
                                </p>
                                <div className="flex items-center justify-between text-xs text-white/80">
                                  <span>{restaurant?.location}</span>
                                  <div className="flex items-center">
                                    <span className="text-yellow-400 mr-1">
                                      ★
                                    </span>
                                    <span>{restaurant?.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ),
                  )}
                </CarouselContent>
                <div className="absolute top-1/2 transform -translate-y-1/2 -left-4 z-10">
                  <CarouselPrevious>
                    <Button className="h-8 w-8" size="icon" variant="outline">
                      <ArrowRight className="h-4 w-4 transform rotate-180" />
                    </Button>
                  </CarouselPrevious>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -right-4 z-10">
                  <CarouselNext>
                    <Button className="h-8 w-8" size="icon" variant="outline">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CarouselNext>
                </div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              </Carousel>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
