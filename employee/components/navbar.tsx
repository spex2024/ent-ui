import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import ProfileAvatar from "@/components/avatar";
import CartDrawer from "@/components/page-ui/cart-drawer";
import useAuthStore from "@/app/store/authenticate";
import Image from "next/image";
import UserAvatar from "@/components/page-ui/profile";

export const Navbar = () => {
  const { isAuthenticated } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [isAuthenticated, router]);

   if(!isAuthenticated) return  null

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className={`dark:bg-neutral-900 dark:border-neutral-800`}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={'https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png'} alt={'spex africa'} width={70} height={70}/>
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
        className=" sm:flex basis-1/5 sm:basis-full hidden lg:flex"
        justify="end"
      >
        <ThemeSwitch />
        <CartDrawer />
        <ProfileAvatar />
      </NavbarContent>
      <NavbarContent
        className=" sm:flex basis-1/5 sm:basis-full lg:hidden"
        justify="end"
      >
        <CartDrawer />
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
