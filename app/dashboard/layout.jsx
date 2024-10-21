"use client";

import { SignedIn } from "@clerk/nextjs";
import React from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
  return (
    <SignedIn>
      <div className="grid grid-cols-12">
        <div className="md:col-span-2">
          <SideNav />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
