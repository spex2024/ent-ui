"use client";
import React, { useEffect, useState } from "react";

import useUserStore from "../../app/store/profile";
import useReturnedPacksStore from "../../app/store/return-pack";

import ReturnPackForm from "./return-pack-form";

const ReturnPack = () => {
  const { user, fetchUser } = useUserStore();
  const { returnedPacks, fetchReturnedPacks } = useReturnedPacksStore();

  const [currentPage, setCurrentPage] = useState(1);
  const packsPerPage = 10;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchReturnedPacks();
  }, [fetchReturnedPacks]);

  // Safely access the pack object
  const pack = user?.pack;

  // Sort returnedPacks by createdAt date, with the latest first
  const sortedPacks = returnedPacks?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Pagination logic: slice sortedPacks to display packsPerPage packs per page
  const indexOfLastPack = currentPage * packsPerPage;
  const indexOfFirstPack = indexOfLastPack - packsPerPage;
  const currentPacks = sortedPacks?.slice(indexOfFirstPack, indexOfLastPack);

  // Calculate total pages
  const totalPages = Math.ceil(sortedPacks?.length / packsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6 lg:px-10 lg:py-10">
      <div className="w-full lg:col-span-2 h-auto bg-white place-items-center border-black py-20 dark:bg-neutral-900 dark:border-neutral-400 dark:text-white">
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

      <div className="w-full lg:col-span-1 h-auto bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-center justify-start px-5 py-5 gap-4 text-black dark:text-white text-xl">
          <h1 className={`font-bold underline`}>Returned Pack History</h1>
        </div>

        {currentPacks?.map((item) => (
          <div
            key={item?._id}
            className="w-full flex items-center justify-between px-8 py-3 gap-2 text-black text-sm"
          >
            <h1 className={`font-bold`}>{item?.code}</h1>
            <h1 className={"text-xs text-gray-500"}>
              {item?.name}
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

        {/* Pagination controls */}
        <div className="flex justify-between items-center px-8 py-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnPack;
