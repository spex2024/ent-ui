"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

import { Navbar } from "@/components/navbar";
import Menu from "@/components/page-ui/menu";
import Cart from "@/components/page-ui/cart";
import Vendors from "@/components/page-ui/vendors";



export default function Home() {



  return (
    <section className="w-full min-h-screen dark:bg-neutral-900 dark:border-neutral-800">
      <Navbar />
      <Menu />
      <Vendors />
      <Cart />
    </section>
  );
}
