"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<String | null>(null);
  const [successMessage, setSuccessMessage] = useState<String | null>(null);

  if (session) {
    redirect("/dashboard/todolist");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password"),
      }),
    });

    const result = await response.json();

    if (result?.error) {
      setError(result.message);
    } else {
      setError(null);
      setSuccessMessage(result.message);
      router.push("/signin");
      router.refresh();
    }
  }

  return (
    <main className="w-full h-[90vh] flex justify-center items-center flex-col gap-2">
      <section className="border border-gray-200 rounded-md p-8">
        <h2 className="text-3xl uppercase font-black">
          <span className="underline-offset-8 underline">Sign</span>{" "}
          <span className="text-blue-500">up</span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mx-auto w-64 sm:w-96 mt-10"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input type="firstName" name="firstName" id="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input type="lastName" name="lastName" id="lastName" required />
          </div>
          <Button
            type="submit"
            className="text-lg bg-blue-500 hover:bg-blue-700 text-white"
          >
            Sign up
          </Button>
          <p className="text-muted-foreground">
            <Link href="/signin">Already registered? Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
