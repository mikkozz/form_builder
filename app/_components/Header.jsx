"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex flex-row items-center justify-between py-2 border-b border-b-neutral-100 px-10">
      <div>
        <Link href="/" className="font-semibold">
          ai form BUILDER
        </Link>
      </div>
      <div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            {" "}
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button size="sm">Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;
