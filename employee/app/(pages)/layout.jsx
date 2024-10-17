"use client";


import Cart from "../../components/page-ui/cart";
import Navbar from "../../components/navbar";
import Footer from "../../components/page-ui/footer";
import TopNav from "../../components/page-ui/top-nav";
import {Providers} from "../store/providers";

export default function Layout({ children }) {

  return (
    <>
      <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
        <TopNav />
        <Navbar />
        <Cart />
        <main>{children}</main>
        <Footer />
      </Providers>
    </>
  );
}
