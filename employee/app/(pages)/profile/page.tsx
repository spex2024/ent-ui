'use client'

import React, { useState } from "react"
import Link from "next/link"
import { UserCircle, LayoutDashboard, Settings, Phone } from "lucide-react"

import UpdateProfile from "../../../components/page-ui/user-info"
import UserProfile from "../../../components/page-ui/user-profile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "contact", label: "Contact", icon: Phone },
  ]

  return (
      <div className="w-full max-w-6xl mx-auto mt-8 space-y-8">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={cn(
                        "flex items-center justify-start space-x-2",
                        activeTab === tab.id && "bg-muted"
                    )}
                    onClick={() => handleTabClick(tab.id)}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="p-6 bg-card text-card-foreground rounded-lg shadow-sm">
          {activeTab === "profile" && (
              <div className="space-y-8">
                <UserProfile />
                <UpdateProfile />
              </div>
          )}
          {activeTab === "dashboard" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <p>Dashboard content goes here.</p>
              </div>
          )}
          {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <p>Settings content goes here.</p>
              </div>
          )}
          {activeTab === "contact" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>Contact content goes here.</p>
              </div>
          )}
        </div>
      </div>
  )
}