"use client";

import Link from "next/link";

// Components
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="max-w-[1200px] w-full  mx-auto h-[80px] flex items-center justify-between p-5 border-b border-gray-300">
      <Link href="/">
        <Logo size="text-2xl" />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
