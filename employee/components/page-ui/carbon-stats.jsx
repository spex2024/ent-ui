"use client";

import { useEffect, useMemo } from "react";
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

export default function Component() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const stats = useMemo(() => {
    const completeOrdersCount =
      user?.orders.filter((order) => order.status === "completed").length || 0;
    const cancelledOrdersCount =
      user?.orders?.filter(
        (order) => order.status.toLowerCase() === "cancelled",
      ).length || 0;
    const pendingOrdersCount =
      user?.orders?.filter((order) => order.status.toLowerCase() === "pending")
        .length || 0;
    const totalOrders = user?.orders.length || 0;

    return [
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
        title: "Plastics Saved",
        value: user?.emissionSaved || 0,
        subValue: user?.gramPoints || 0,
        icon: Leaf,
        gradient: "from-lime-500 to-lime-700",
        unit: "kg",
      },
      {
        title: "Plastic Points",
        value: user?.points || 0,
        icon: Coins,
        gradient: "from-emerald-500 to-emerald-700",
      },
      {
        title: "Earned Revenue",
        value: user?.moneyBalance || 0,
        icon: DollarSign,
        gradient: "from-green-500 to-green-700",
        prefix: "GH₵",
      },
    ];
  }, [user]);

  const getProgressColor = (value) => {
    if (value < 25) return "from-green-200 to-green-300";
    if (value < 50) return "from-green-300 to-green-400";
    if (value < 75) return "from-green-400 to-green-500";

    return "from-green-500 to-green-600";
  };

  const formatValue = (value, prefix = "", unit = "", useToFixed = false) => {
    const formattedValue = useToFixed ? value.toFixed(2) : value;

    return `${prefix}${formattedValue}${unit ? ` ${unit}` : ""}`;
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
                <stat.icon aria-hidden="true" className="mr-2 h-5 w-5" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white dark:bg-green-800">
              {user ? (
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-emerald-600 dark:text-emerald-400">
                  {stat.title === "Plastics Saved" ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span>
                        {formatValue(stat.value, "", "", false)}
                        <sub className="text-xs">(plastics)</sub>
                      </span>
                      <span className="text-base">
                        = {formatValue(stat.subValue, "", stat.unit, true)}
                        <sub className="text-xs">(points)</sub>
                      </span>
                    </div>
                  ) : (
                    formatValue(
                      stat.value,
                      stat.prefix,
                      stat.unit,
                      stat.title === "Plastic Points" ||
                        stat.title === "Earned Revenue",
                    )
                  )}
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
                            Math.max(...stats.map((s) => s.value))) *
                            100,
                        )}`}
                        style={{
                          width: `${(stat.value / Math.max(...stats.map((s) => s.value))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <Progress
                      className="h-2 bg-transparent"
                      value={
                        (stat.value / Math.max(...stats.map((s) => s.value))) *
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
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImpactCard
          emissionSaved={user?.emissionSaved}
          gramPoints={user?.gramPoints}
          points={user?.points}
          title="Your Impact"
        />
        <ImpactCard
          emissionSaved={user?.agency?.emissionSaved}
          gramPoints={user?.agency?.gramPoints}
          points={user?.agency?.points}
          title={`${user?.agency?.company || "Agency"} Impact`}
        />
      </div>
    </div>
  );
}

function ImpactCard({ title, emissionSaved, gramPoints, points }) {
  return (
    <div className="bg-white dark:bg-green-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <Leaf
            aria-hidden="true"
            className="h-4 w-4 sm:h-12 sm:w-12 text-green-500 dark:text-green-400 mr-4"
          />
          <span className="text-base sm:text-lg font-medium text-green-700 dark:text-green-200">
            Saved {emissionSaved || 0} plastics = {(gramPoints || 0).toFixed(2)}{" "}
            kg in gram points
          </span>
        </div>
        <div className="flex items-center">
          <Coins
            aria-hidden="true"
            className="h-8 w-8  text-green-500 dark:text-green-400 mr-4"
          />
          <span className="text-base sm:text-lg font-medium text-green-700 dark:text-green-200">
            Earned {(points || 0).toFixed(2)} Plastic Points!
          </span>
        </div>
      </div>
    </div>
  );
}
