"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Components
import Logo from "@/components/Logo";
import { Typewriter, Cursor } from "react-simple-typewriter";
import LoginButtons from "@/components/LoginButtons";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard/todolist");
  }

  return (
    <main className="w-full h-[90vh] flex justify-center items-center flex-col gap-2">
      <Logo size="text-4xl md:text-6xl" />
      <h2 className="text-4xl md:text-6xl font-black mt-4 mb-2 uppercase flex items-center">
        <Typewriter
          typeSpeed={50}
          words={["Do sport", "Do shopping", "Call brother", "Prepare meeting"]}
          loop={0}
        />
        <span>
          <Cursor />
        </span>
      </h2>
      <p className="my-2 text-center">Start creating your todo list now!</p>
      <LoginButtons />
    </main>
  );
}
