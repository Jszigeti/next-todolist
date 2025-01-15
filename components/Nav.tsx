"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import { ListTodo, Settings } from "lucide-react";
import Logout from "./Logout";

export default function Nav() {
  const pathname = usePathname();

  const navLink = [
    { name: "Todolist", icon: ListTodo, path: "/dashboard/todolist" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <nav className="flex md:flex-col md:h-full md:w-20 w-full lg:w-56 justify-between md:justify-start">
      <div className="flex md:flex-col gap-4">
        {navLink.map((link, index) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Link key={index} href={link.path}>
              <div
                className={`flex items-center md:w-full w-20 justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-2 hover:bg-blue-500 hover:bg-opacity-50 hover:text-white text-sm font-bold rounded-md ${
                  isActive && "bg-blue-500 text-white"
                }`}
              >
                <link.icon />
                <span className="hidden lg:block">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Logout />
    </nav>
  );
}
