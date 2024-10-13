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

import useUserStore from "@/app/store/profile";
import useAuth from "@/app/hook/auth";
import Link from "next/link";

export default function UserAvatar() {
  const { user, fetchUser } = useUserStore();
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
            description={""}
            name={``}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-16 gap-4 flex w-full bg-slate-800 text-white py-8"
          >
            <p className="text-xs font-semibold ">{`${user?.firstName} ${user?.lastName} (${user?.code})`}</p>
            <p className=" text-xs capitalize"> {user?.agency?.company}</p>
            <p className=" text-xs">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="user">
            <Link href={"/profile"}>Settings</Link>
          </DropdownItem>
          <DropdownItem key="orders">
            <Link href={"/order"}>Orders</Link>
          </DropdownItem>

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
