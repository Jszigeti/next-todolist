"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Components
import { LogOut } from "lucide-react";

export default function Logout() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div
      onClick={handleSignOut}
      className="flex items-center md:w-full w-20 justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-2 bg-red-500 hover:bg-opacity-50 text-white text-sm font-bold rounded-md md:mt-4"
    >
      <LogOut />
      <span className="hidden lg:block">Logout</span>
    </div>
  );
}
