import Link from "next/link";

// Components
import { Button } from "./ui/button";

export default function LoginButtons() {
  return (
    <div className="flex gap-4 mt-4">
      <Link href="/signin">
        <Button className="text-lg bg-blue-500 hover:bg-blue-700 text-white">
          Sign in
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="text-lg bg-blue-500 hover:bg-blue-700 text-white">
          Sign up
        </Button>
      </Link>
    </div>
  );
}
