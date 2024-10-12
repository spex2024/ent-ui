import React from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

const TopNav = () => {
  return (
    <div>
      <div className="w-full bg-background text-foreground flex-grow sm:block hidden">
        <div className="border-b  ">
          <div className="container max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
            <Button className="text-sm text-gray-600" size="sm" variant="ghost">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-600">
                Partner with Spex as a:
              </span>
              <Button
                className="text-sm text-[#71bc44] hover:text-primary"
                size="sm"
                variant="ghost"
              >
                Vendor
              </Button>
              <Button
                className="text-sm text-[#71bc44]  hover:text-primary"
                size="sm"
                variant="ghost"
              >
                Enterprise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
