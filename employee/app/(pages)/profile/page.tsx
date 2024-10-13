"use client";

import React, { useState } from "react";
import {
  UserCircle,
  Utensils,
  Settings,
  Phone,
  FileText,
  MapPin,
} from "lucide-react";

import UserProfile from "../../../components/page-ui/user-profile";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "spex", label: "SPEX Africa", icon: Utensils },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "terms-privacy", label: "Terms & Privacy", icon: FileText },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-8">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              className={cn(
                "flex items-center justify-start space-x-2",
                activeTab === tab.id && "bg-muted text-black",
              )}
              variant={activeTab === tab.id ? "outline" : "ghost"}
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
          </div>
        )}
        {activeTab === "spex" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">About SPEX Africa</h2>
            <Card>
              <CardHeader>
                <CardTitle>SPEX Africa: Sustainable Food Marketplace</CardTitle>
                <CardDescription>
                  Connecting food vendors with enterprises and users seeking
                  sustainable food packaging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    SPEX Africa is an innovative meal marketplace that leverages
                    a web platform and mobile app to bridge the gap between food
                    vendors and those seeking sustainable food packaging
                    solutions. Our mission is to promote eco-friendly practices
                    in the food industry while enhancing convenience for our
                    users.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Our Services</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Connect food vendors with customers</li>
                        <li>Provide sustainable food packaging solutions</li>
                        <li>Offer a user-friendly ordering platform</li>
                        <li>
                          Support enterprises in adopting eco-friendly practices
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-5 w-5" />
                          <span>0302525384 | +233 57 828 9562</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5" />
                          <span>Ritz, Paterson Ave, Accra, Ghana</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Two-factor authentication
                    </span>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Change password</span>
                    <Button variant="outline">Update</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Notification preferences
                    </span>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your privacy and data sharing preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Profile visibility</span>
                    <Button variant="outline">Public</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Data sharing</span>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Our support team is here to help you with any questions or
                  issues.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-full p-2 border rounded-md"
                      id="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full p-2 border rounded-md"
                      id="email"
                      placeholder="Your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md h-32"
                      id="message"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "terms-privacy" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Terms & Privacy</h2>
            <Tabs className="w-full" defaultValue="terms">
              <TabsList>
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              </TabsList>
              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle>Terms of Service</CardTitle>
                    <CardDescription>
                      Last updated: June 1, 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        1. Acceptance of Terms
                      </h3>
                      <p>
                        By accessing or using our services, you agree to be
                        bound by these Terms of Service and all applicable laws
                        and regulations.
                      </p>
                      <h3 className="text-lg font-medium">2. Use of Service</h3>
                      <p>
                        You agree to use our service only for lawful purposes
                        and in accordance with these Terms of Service.
                      </p>
                      <h3 className="text-lg font-medium">3. User Account</h3>
                      <p>
                        You are responsible for maintaining the confidentiality
                        of your account and password.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Policy</CardTitle>
                    <CardDescription>
                      Last updated: June 1, 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        1. Information We Collect
                      </h3>
                      <p>
                        We collect information you provide directly to us, such
                        as when you create an account, make a purchase, or
                        contact us for support.
                      </p>
                      <h3 className="text-lg font-medium">
                        2. How We Use Your Information
                      </h3>
                      <p>
                        We use the information we collect to provide, maintain,
                        and improve our services, and to communicate with you.
                      </p>
                      <h3 className="text-lg font-medium">
                        3. Information Sharing and Disclosure
                      </h3>
                      <p>
                        We do not share your personal information with third
                        parties except as described in this privacy policy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
