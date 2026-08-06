// app/(auth)/register/page.tsx

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,.4)]">

      <div className="space-y-2">

        <h1 className="text-center text-4xl font-bold">
          Create Account
        </h1>

        <p className="text-center text-sm text-zinc-400">
          Join OpenQuant Forum
        </p>

      </div>

      <div className="mt-10 space-y-5">

        <Input
          placeholder="Full name"
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white"
        />

        <Input
          placeholder="Email"
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white"
        />

        <Input
          type="password"
          placeholder="Password"
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white"
        />

        <Input
          type="password"
          placeholder="Confirm password"
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white"
        />

        <Button className="h-12 w-full rounded-xl bg-white text-black hover:bg-zinc-200">
          Create Account
        </Button>

        <p className="text-center text-sm text-zinc-400">

          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-semibold text-white hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>

    </Card>
  );
}