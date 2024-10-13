"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { UserCircle2, MapPin, Phone, Briefcase, Hash } from "lucide-react";

import useUserStore from "../../app/store/profile";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserProfile() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <div className="h-32 bg-[#71bc44]" />
      <CardContent className="relative pt-4 pb-8 px-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 -mt-16">
            <div className="rounded-full border-4 border-background overflow-hidden">
              <Image
                priority
                alt={user?.firstName || "User Avatar"}
                className="object-cover"
                height={128}
                src={user?.imageUrl || "/default-avatar.png"}
                width={128}
              />
            </div>
          </div>
          <div className="flex-grow pt-2">
            <h1 className="text-2xl font-bold text-foreground">
              {`${user?.firstName || "First Name"} ${user?.lastName || "Last Name"}`}
            </h1>
            <p className="text-muted-foreground">{user?.code || "Code"}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="flex items-center gap-1" variant="secondary">
              <Phone className="w-3 h-3" />
              {user?.phone || "Phone"}
            </Badge>
            <Badge className="flex items-center gap-1" variant="secondary">
              <Briefcase className="w-3 h-3" />
              {user?.agency.company || "Company"}
            </Badge>
            <Badge className="flex items-center gap-1" variant="secondary">
              <MapPin className="w-3 h-3" />
              {user?.agency?.location || "Location"}
            </Badge>
          </div>
          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Additional Info</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <UserCircle2 className="w-5 h-5" />
                <span>Member since {new Date().getFullYear()}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Hash className="w-5 h-5" />
                <span>Employee ID: {user?.code || "N/A"}</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
