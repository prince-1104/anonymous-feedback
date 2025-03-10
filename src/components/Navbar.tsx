"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold mb-4 md:mb-0">True Feedback</span>
        </Link>
        {session?.user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {session.user.name }</span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/sign-in">
              <Button className="w-full bg-slate-700 text-white md:w-auto" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="w-full bg-slate-700 text-white md:w-auto" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
