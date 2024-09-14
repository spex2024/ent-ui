import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


  export const metadata: Metadata = {
  title: "Spex Africa",
  description: "SPEX (Smart Pack Exchange) is a meal marketplace that leverages a web platform/app to connect food vendors with enterprises and users seeking sustainable food packaging",
    icons: {
      icon: "https://res.cloudinary.com/ddwet1dzj/image/upload/v1724079914/favicon_l68bd5.ico",
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
