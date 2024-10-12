"use client";
import React, { useEffect } from "react";

import useUserStore from "../../app/store/profile";

const PackStats = () => {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const completeOrdersCount =
    user?.orders?.reduce((count, order) => {
      return order.status.toLowerCase() === "completed" ? count + 1 : count;
    }, 0) || 0;

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-5 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="inline-flex justify-center items-center">
            <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
              Total Orders
            </span>
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
              {completeOrdersCount}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="inline-flex justify-center items-center">
            <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
              Packs Returned
            </span>
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
              {user?.returnedPack}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="inline-flex justify-center items-center">
            <span className="text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
              Active Pack(s)
            </span>
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
              {user?.activePack}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackStats;
