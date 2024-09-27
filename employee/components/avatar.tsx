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
  const { user, fetchUser ,loading } = useUserStore();
  const { logout, success, error } = useAuth();
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
    router.push("/login"); // Redirect to the login page after logout
  };

  if (loading) {
    return <Skeleton />;
  }

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
          <Link href={'/profile'}>

            <DropdownItem key="settings">Settings</DropdownItem>
          </Link>
          <Link href={'/order'}>

            <DropdownItem key="orders">Orders</DropdownItem>
          </Link>

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


const Skeleton = () => (
    <div className="animate-pulse flex items-center gap-4">
      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
        <div className="h-3 bg-gray-300 rounded w-24 mt-1"></div>
      </div>
    </div>
);