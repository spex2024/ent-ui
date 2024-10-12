"use client";

import { NextUIProvider } from "@nextui-org/react";

import Cart from "../../components/page-ui/cart";
import Navbar from "../../components/navbar";
import Footer from "../../components/page-ui/footer";
import TopNav from "../../components/page-ui/top-nav";

export default function Layout({ children }) {
  return (
    <>
      <NextUIProvider>
        <TopNav />
        <Navbar />
        <Cart />
        <main>{children}</main>
        <Footer />
      </NextUIProvider>
    </>
  );
}
