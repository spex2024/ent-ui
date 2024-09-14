"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import useUserStore from "../../app/store/profile";

const UserProfile = () => {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="w-[55%] p-5 bg-slate-900 rounded-xl">
      <div className="w-full flex items-center gap-x-10">
        <div className="shrink-0">
          <Image
            priority
            alt={user?.firstName || "User Avatar"}
            className="rounded-lg"
            height={110}
            src={user?.imageUrl || "/default-avatar.png"} // Use a fallback image if imageUrl is not available
            width={110}
          />
        </div>

        <div className="grow text-white">
          <h1 className="lg:text-lg text-sm font-medium dark:text-neutral-200">
            {`${user?.firstName || "First Name"} ${user?.lastName || "Last Name"}`}
          </h1>
          <p className="text-sm lg:text-lg dark:text-neutral-400">
            {user?.code || "Code"}
          </p>
          <p className="text-sm lg:text-lg dark:text-neutral-400">
            {user?.phone || "Phone"}
          </p>
          <p className="text-sm lg:text-lg dark:text-neutral-400">
            {user?.agency?.company || "Company"}
          </p>
          <p className="text-sm lg:text-sm dark:text-neutral-400">
            {user?.agency?.location || "Location"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
