"use client";

import React, { useEffect } from "react";
import { Star } from "lucide-react";

import useSelectedMealStore from "../../app/store/selection";
import useUserStore from "../../app/store/profile";
import useCartStore from "../../app/store/cart";

import NotFound from "./not-found";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FoodProductCard() {
  const { user, fetchUser } = useUserStore();
  const { openModal } = useSelectedMealStore();
  const { clearNotifications } = useCartStore();

  useEffect(() => {
    clearNotifications();
    fetchUser();
  }, [clearNotifications, fetchUser]);

  const agency = user?.agency;
  const vendors = agency?.vendors;
  const mealItems = vendors?.flatMap((vendor: { meals: any; }) => vendor.meals) || [];

  if (mealItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <NotFound message="No meals found" />
      </div>
    );
  }

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");

    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {mealItems.map(
          (meal: {
            _id: React.Key | null | undefined;
            main: { name: any };
            imageUrl: string | undefined;
            vendor: {
              location: string;
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
            };
          }) => (
            <Card
              key={meal._id}
              className="group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  alt={meal.main?.name || "Meal image"}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  src={meal?.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge
                  className="absolute bg-[#71bc44] text-white top-2 left-2 text-[10px] sm:text-xs rounded-full"
                  variant="secondary"
                >
                  {limitWords(meal.vendor?.location, 3)}
                </Badge>
                <div className="absolute bottom-2 left-2 flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-[10px] sm:text-xs font-bold text-white">
                    4.5
                  </span>
                </div>
              </div>
              <CardContent className="p-2 sm:p-3">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-xs sm:text-sm font-semibold line-clamp-1 mb-1 sm:mb-0">
                          {meal.main?.name || "Unnamed Meal"}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{meal.main?.name || "Unnamed Meal"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    className="h-6 sm:h-7 w-[40%] sm:w-[40%] text-[10px] sm:text-xs bg-[#71bc44] text-white hover:bg-primary/20 hover:text-primary flex items-center justify-center sm:gap-2 gap-3"
                    variant="ghost"
                    onClick={() => openModal(meal)}
                  >
                    Place Order
                  </Button>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-1 sm:mb-2">
                  {meal?.vendor?.name}
                </p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
