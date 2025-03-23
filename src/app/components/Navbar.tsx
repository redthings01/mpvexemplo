// src/app/components/Navbar.tsx
"use client"; // Mark this as a Client Component

import { Disclosure } from "@headlessui/react";
import logoNav from "../assets/logo-nav.png";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#A3A27C]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex shrink-0 items-center">
            <Link href="/">
              <img alt="Loja" src={logoNav.src} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-white hover:bg-[#8a8868] px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-white hover:bg-[#8a8868] px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}