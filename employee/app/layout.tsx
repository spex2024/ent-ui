import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import { Providers } from "./store/providers";


import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Spex Africa - Employee Interface",
  description: "SPEX (Smart Pack Exchange) is a meal marketplace that leverages a web platform/app to connect food vendors with enterprises and users seeking sustainable food packaging",
  icons: {
    icon: "https://res.cloudinary.com/ddwet1dzj/image/upload/v1724079914/favicon_l68bd5.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased w-full",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Toaster />
            <main className="mx-auto w-full   flex-grow">
              {children}
            </main>
            {/*<footer className="w-full flex items-center justify-center py-3">*/}
            {/*  <Link*/}
            {/*    isExternal*/}
            {/*    className="flex items-center gap-1 text-current"*/}
            {/*    href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"*/}
            {/*    title="nextui.org homepage"*/}
            {/*  >*/}
            {/*    <span className="text-default-600">Powered by</span>*/}
            {/*    <p className="text-primary">NextUI</p>*/}
            {/*  </Link>*/}
            {/*</footer>*/}
          </div>
        </Providers>
      </body>
    </html>
  );
}
