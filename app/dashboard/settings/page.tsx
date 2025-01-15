"use client";
import { signIn, useSession } from "next-auth/react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password");

    // Convert string values to appropriate types
    const id = parseInt(session?.user.id || "");

    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      }),
    });

    const result = await response.json();

    if (result?.error) {
      // setError(result.message);
    } else {
      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/dashboard/todolist",
        email: session?.user.email,
        password: password,
      });
      // setError(null);
      // setSuccessMessage(result.message);
    }
  }

  return (
    <section className="border border-gray-200 rounded-md p-3 mt-4">
      <h2 className="text-3xl uppercase font-black">Settings</h2>
      <p className="text-lg text-muted-foreground mb-4">Your profil settings</p>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Global settings</CardTitle>
            <CardDescription>Edit your informations and save</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 mb-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={session?.user.firstName}
              />
            </div>
            <div className="space-y-1 mb-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={session?.user.lastName}
              />
            </div>
            <div className="space-y-1 mb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={session?.user.email}
                disabled
              />
            </div>{" "}
            <div className="space-y-1 mb-2">
              <Label htmlFor="email">
                Enter your password to confirm editing
              </Label>
              <Input type="password" id="password" name="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="w-full bg-blue-500 hover:bg-opacity-50 hover:bg-blue-500"
              type="submit"
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
