"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

import { Navbar } from "@/components/navbar";
import Menu from "@/components/page-ui/menu";
import Cart from "@/components/page-ui/cart";
import Vendors from "@/components/page-ui/vendors";
import useAuthStore from "@/app/store/authenticate";



export default function Home() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated){
            router.push("/");
        }
    }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen dark:bg-neutral-900 dark:border-neutral-800">
      <Navbar />
      <Menu />
      <Vendors />
      <Cart />
    </section>
  );
}
