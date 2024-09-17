"use client";

import { NextUIProvider } from "@nextui-org/react";


import Cart from "../../components/page-ui/cart";
import Navbar from "../../components/navbar";

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
