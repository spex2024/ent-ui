"use client";

import React, { useEffect } from "react";
import { ShoppingBag, Package, Box } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useUserStore from "@/app/store/profile";

export default function PackStats() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const completeOrdersCount =
    user?.orders?.reduce((count, order) => {
      return order.status.toLowerCase() === "completed" ? count + 1 : count;
    }, 0) || 0;

  const stats = [
    {
      title: "Total Orders",
      value: completeOrdersCount,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Packs Returned",
      value: user?.returnedPack || 0,
      icon: Package,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Active Pack(s)",
      value: user?.activePack || 0,
      icon: Box,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const maxValue = Math.max(...stats.map((stat) => stat.value));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader
              className={`border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${stat.color}`}
            >
              <CardTitle className="flex items-center text-lg font-medium text-white">
                <stat.icon className="mr-2 h-5 w-5" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-4">
              <div className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
                {stat.value}
              </div>
              <Progress
                className="w-full"
                value={(stat.value / maxValue) * 100}

              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
