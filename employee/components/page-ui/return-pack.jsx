"use client";
import React, { useEffect } from "react";

import useUserStore from "../../app/store/profile";
import useReturnedPacksStore from "../../app/store/return-pack";

import ReturnPackForm from "./return-pack-form";

const ReturnPack = () => {
  const { user, fetchUser } = useUserStore();
  const { returnedPacks, fetchReturnedPacks } = useReturnedPacksStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchReturnedPacks();
  }, [fetchReturnedPacks]);

  // Safely access the pack object
  const pack = user?.pack;

console.log(pack)

  // Sort returnedPacks by createdAt date, with the latest first
  const sortedPacks = returnedPacks?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3  gap-6 lg:px-10 lg:py-10  ">
      <div className="w-full lg:col-span-2 h-auto bg-white place-items-center border-black py-20  dark:bg-neutral-900 dark:border-neutral-400 dark:text-white ">
        {pack?.status === "active" ? (
          <div className="w-full flex flex-col items-center justify-center px-5 py-5 gap-10">
            <div className="flex items-center justify-start px-5 py-5 gap-4 text-black dark:text-white text-sm">
              <span className={`h-2 w-2 rounded-full bg-green-500`} />
              <h1>{pack?.status}</h1>
              <h1>{pack?.userCode}</h1>
              <h1>{pack?.agency}</h1>
            </div>
            <ReturnPackForm />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center px-5 py-5 gap-10">
            <div className="flex items-center justify-start px-5 py-5 gap-4 text-black dark:text-white text-lg">
              <h1>0 active pack(s) found</h1>
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:col-span-1 h-auto bg-white  dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-center justify-start px-5 py-5 gap-4 text-black dark:text-white text-xl">
          <h1 className={`font-bold underline`}>Returned Pack History</h1>
        </div>
        {sortedPacks?.map((item) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-between px-8 py-3 gap-2 text-black text-sm"
          >
            <h1 className={`font-bold`}>{item.code}</h1>
            <h1 className={"text-xs text-gray-500"}>
              {item.name}
              {new Date(item.createdAt).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnPack;
