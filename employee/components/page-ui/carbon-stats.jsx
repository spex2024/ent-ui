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
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Complete Orders",
      value: completeOrdersCount,
      icon: CheckCircle,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Cancelled Orders",
      value: cancelledOrdersCount,
      icon: XCircle,
      gradient: "from-lime-500 to-lime-700",
    },
    {
      title: "Pending Orders",
      value: pendingOrdersCount,
      icon: Clock,
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Packs Returned",
      value: user?.returnedPack || 0,
      icon: Recycle,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Plastics Saved (kg)",
      value: user?.emissionSaved.toFixed(2) || "0.00",
      icon: Leaf,
      gradient: "from-lime-500 to-lime-700",
    },
    {
      title: "Carbon Points",
      value: user?.points.toFixed(2) || "0.00",
      icon: Coins,
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Earned Revenue",
      value: `GH₵ ${user?.moneyBalance.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      gradient: "from-green-500 to-green-700",
    },
  ];

  const getProgressColor = (value) => {
    if (value < 25) return "from-green-200 to-green-300";
    if (value < 50) return "from-green-300 to-green-400";
    if (value < 75) return "from-green-400 to-green-500";

    return "from-green-500 to-green-600";
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-green-900 rounded-lg shadow-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <CardHeader
              className={`border-b border-green-200 dark:border-green-700 bg-gradient-to-r ${stat.gradient}`}
            >
              <CardTitle className="flex items-center text-sm font-medium text-white">
                <stat.icon className="mr-2 h-5 w-5" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white dark:bg-green-800">
              {user ? (
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </div>
              ) : (
                <Skeleton className="h-10 w-32 mx-auto" />
              )}
              {user && (
                <div className="mt-4 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-2 bg-green-100 dark:bg-green-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(
                          (stat.value /
                            Math.max(
                              ...stats.map((s) => Number(s.value) || 0),
                            )) *
                            100,
                        )}`}
                        style={{
                          width: `${(stat.value / Math.max(...stats.map((s) => Number(s.value) || 0))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <Progress
                      className="h-2 bg-transparent"
                      value={
                        (stat.value /
                          Math.max(...stats.map((s) => Number(s.value) || 0))) *
                        100
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 sm:mt-12 bg-white dark:bg-green-800 p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">
          Your Impact
        </h3>
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 dark:text-green-400 mr-4" />
            <span className="text-base sm:text-lg font-medium text-green-700 dark:text-green-200">
              You have saved {user?.emissionSaved.toFixed(2) || "0.00"} kg of
              plastics!
            </span>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <Coins className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 dark:text-green-400 mr-4" />
            <span className="text-base sm:text-lg font-medium text-green-700 dark:text-green-200">
              You have earned {user?.points.toFixed(2) || "0.00"} Carbon Points!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
