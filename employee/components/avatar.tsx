"use client";

import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useUserStore from "@/app/store/profile";
import useAuth from "@/app/hook/auth";
import useAuthStore from "@/app/store/authenticate";

export default function ProfileAvatar() {
  const { user, fetchUser } = useUserStore();
  const { logout, success, error } = useAuth();
  const { logout: clear } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleLogout = async () => {
    await logout();
    clear();
    router.push("/login"); // Redirect to the login page after logout
  };

  useEffect(() => {
    // Set a timeout to automatically log out after 2 minutes (120,000 milliseconds)
    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, 86400000);

    // Clear the timeout if the component unmounts or the user logs out before the timer completes
    return () => clearTimeout(logoutTimer);
  }, []);

  // Empty dependency array means this effect runs only once when the component mounts
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${user?.imageUrl}`,
            }}
            className="sm:transition-transform "
            description={user?.code}
            name={`${user?.firstName} ${user?.lastName}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-16 gap-10 flex w-full bg-slate-800 text-white py-5"
          >
            <p className=" text-sm capitalize"> {user?.agency.company}</p>
            <p className=" text-xs">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="user">Profile</DropdownItem>
          <DropdownItem key="orders">Orders</DropdownItem>

          <DropdownItem key="settings">
            <Link href={"/password/request"}>Reset Password</Link>
          </DropdownItem>

          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
