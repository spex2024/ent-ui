"use client";

import React, { useState } from "react";
import Link from "next/link";

import UpdateProfile from "../../../components/page-ui/user-info";
import UserProfile from "../../../components/page-ui/user-profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="md:flex w-[70vw] mx-auto mt-20">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <Link
            aria-current={activeTab === "profile" ? "page" : undefined}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "profile" ? "text-black bg-gray-200" : "hover:text-gray-900 hover:bg-gray-100"} dark:hover:bg-gray-700 dark:hover:text-white`}
            href="#"
            onClick={() => handleTabClick("profile")}
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 me-2 ${activeTab === "profile" ? "text-black" : "text-gray-500 dark:text-gray-400"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "dashboard" ? "text-black bg-gray-200" : "hover:text-gray-900 hover:bg-gray-100"} dark:hover:bg-gray-700 dark:hover:text-white`}
            href="#"
            onClick={() => handleTabClick("dashboard")}
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 me-2 ${activeTab === "dashboard" ? "text-black" : "text-gray-500 dark:text-gray-400"}`}
              fill="currentColor"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "settings" ? "text-black bg-gray-200" : "hover:text-gray-900 hover:bg-gray-100"} dark:hover:bg-gray-700 dark:hover:text-white`}
            href="#"
            onClick={() => handleTabClick("settings")}
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 me-2 ${activeTab === "settings" ? "text-black" : "text-gray-500 dark:text-gray-400"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
            Settings
          </Link>
        </li>
        <li>
          <Link
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "contact" ? "text-black bg-gray-200" : "hover:text-gray-900 hover:bg-gray-100"} dark:hover:bg-gray-700 dark:hover:text-white`}
            href="#"
            onClick={() => handleTabClick("contact")}
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 me-2 ${activeTab === "contact" ? "text-black" : "text-gray-500 dark:text-gray-400"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.128 1 1 0 0 0 .725 1.69Zm10.111 8.227-3.898-2.999a3.953 3.953 0 0 0-3.949-.433l-1.546.75a2.01 2.01 0 0 1-2.25-.354L3.413 9.573a2 2 0 0 1-.353-2.25l.75-1.545a3.955 3.955 0 0 0-.433-3.949L1.43 1.937a2.01 2.01 0 0 0-3.08.482c-2.081 3.111-1.261 7.26 2.682 11.204 2.549 2.548 5.384 4.097 7.846 4.693.49.123.994.184 1.5.184a9.24 9.24 0 0 0 5.854-2.167 2.01 2.01 0 0 0 .483-3.081Z" />
            </svg>
            Contact
          </Link>
        </li>
      </ul>
      <div className="p-4 rounded-lg   w-full h-auto">
        {activeTab === "profile" && (
          <div className=" rounded-lg w-[60vw]  flex flex-col justify-center items-center">
            <UserProfile />
            <UpdateProfile />
          </div>
        )}
        {activeTab === "dashboard" && (
          <div className="p-4 rounded-lg w-[60vw]">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p>Dashboard content goes here.</p>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-4 rounded-lg w-[60vw]">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <p>Settings content goes here.</p>
          </div>
        )}
        {activeTab === "contact" && (
          <div className="p-4 rounded-lg w-[60vw]">
            <h1 className="text-2xl font-semibold mb-4">Contact</h1>
            <p>Contact content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
