"use client";

import { useEffect } from "react";
import {
  ShoppingBag,
  CheckCircle,
  XCircle,
  Clock,
  Recycle,
  Leaf,
  Coins,
  DollarSign,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import useUserStore from "@/app/store/profile";

export default function CarbonStats() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const completeOrdersCount =
    user?.orders.filter((order) => order.status === "completed").length || 0;
  const cancelledOrdersCount =
    user?.orders?.filter((order) => order.status.toLowerCase() === "cancelled")
      .length || 0;
  const pendingOrdersCount =
    user?.orders?.filter((order) => order.status.toLowerCase() === "pending")
      .length || 0;
  const totalOrders = user?.orders.length || 0;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Complete Orders",
      value: completeOrdersCount,
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Cancelled Orders",
      value: cancelledOrdersCount,
      icon: XCircle,
      gradient: "from-red-500 to-red-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrdersCount,
      icon: Clock,
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Packs Returned",
      value: user?.returnedPack || 0,
      icon: Recycle,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Plastics Saved (kg)",
      value: user?.emissionSaved.toFixed(2) || "0.00",
      icon: Leaf,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Carbon Points",
      value: user?.points.toFixed(2) || "0.00",
      icon: Coins,
      gradient: "from-amber-500 to-amber-600",
    },
    {
      title: "Earned Revenue",
      value: `GH₵ ${user?.moneyBalance.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8  dark:bg-gray-900 rounded-lg shadow-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <CardHeader
              className={`border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${stat.gradient}`}
            >
              <CardTitle className="flex items-center text-sm font-medium text-white">
                <stat.icon className="mr-2 h-5 w-5" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white dark:bg-gray-800">
              {user ? (
                <div className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
                  {stat.value}
                </div>
              ) : (
                <Skeleton className="h-10 w-32 mx-auto" />
              )}
              <Progress
                className="mt-4"
                value={
                  (stat.value /
                    Math.max(...stats.map((s) => Number(s.value) || 0))) *
                  100
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Your Impact
        </h3>
        <div className="flex flex-wrap justify-around items-center gap-4">
          <div className="flex items-center">
            <Leaf className="h-12 w-12 text-green-500 mr-4" />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              You have saved {user?.emissionSaved.toFixed(2) || "0.00"} kg of
              plastics!
            </span>
          </div>
          <div className="flex items-center">
            <Coins className="h-12 w-12 text-yellow-500 mr-4" />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              You have earned {user?.points.toFixed(2) || "0.00"} Carbon Points!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
