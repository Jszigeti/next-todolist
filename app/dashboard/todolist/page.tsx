"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <section className="border border-gray-200 rounded-md p-3 mt-4">
      <h2 className="text-3xl uppercase font-black">Dashboard</h2>
      <p className="text-lg text-muted-foreground mb-4">
        Welcome {session?.user.firstName}
      </p>
    </section>
  );
}
