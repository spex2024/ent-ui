"use client";


import Menu from "@/components/page-ui/menu";
import Vendors from "@/components/page-ui/vendors";
import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <section className="w-full min-h-screen dark:bg-neutral-900 dark:border-neutral-800">
      <Navbar />
      <Menu />
      <Vendors />
    </section>
  );
}
