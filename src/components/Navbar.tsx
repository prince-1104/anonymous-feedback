"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-background text-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          True Feedback
        </a>

        {/* Middle Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Actions */}
          {session ? (
            <>
              <span className="mr-4">Welcome, {user.username || user.email}</span>
              <Button onClick={() => signOut()} className="w-full md:w-auto" variant="outline">
                Logout
              </Button>
            </>
          ) :  (
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button className="w-full md:w-auto" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full md:w-auto" variant="outline">
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
