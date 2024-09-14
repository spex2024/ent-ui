"use client";

import { NextUIProvider } from "@nextui-org/react";

import { Navbar } from "../../components/navbar";
import Cart from "../../components/page-ui/cart";

export default function Layout({ children }) {
  return (
    <>
      <NextUIProvider>
        <Navbar />
        <Cart />
        <main>{children}</main>
      </NextUIProvider>
    </>
  );
}
