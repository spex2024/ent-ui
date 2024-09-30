"use client";

import { useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import ProfileAvatar from "@/components/avatar";
import UserAvatar from "@/components/page-ui/profile";
import useOrderStore from "@/app/store/order";

const Navbar = () => {
  const { orders, fetchOrders } = useOrderStore();

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders(); // Fetch the orders
  }, [fetchOrders]);

  const newOrdersExist =
    Array.isArray(orders) && orders.some((order) => order.status === "pending");

  return (
    <NextUINavbar
      className={`dark:bg-neutral-900 dark:border-neutral-800`}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt={"spex africa"}
              height={70}
              src={
                "https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
              }
              width={70}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
                {item.label === "Orders" && newOrdersExist && (
                  <span className="absolute top-[-12px] right-[-10px] flex items-center justify-center h-5 w-8 bg-red-500 text-white text-xs font-bold rounded ">
                    <p className={`text-xs `}>New</p>
                  </span>
                )}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent
        className="sm:flex basis-1/5 sm:basis-full hidden lg:flex"
        justify="end"
      >
        <ThemeSwitch />
        <ProfileAvatar />
      </NavbarContent>
      <NavbarContent
        className="basis-1/5 sm:hidden lg:hidden"
        justify="end"
      >
        <UserAvatar />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;
