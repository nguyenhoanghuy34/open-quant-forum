// components/auth/login-form.tsx

"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

import GoogleButton from "./google-button";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,.4)]">

      <div className="space-y-2">

        <h1 className="text-center text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="text-center text-sm text-zinc-400">
          Sign in to OpenQuant Forum
        </p>

      </div>

      <div className="mt-10 space-y-5">

        <div>

          <label className="mb-2 block text-sm text-zinc-300">
            Email
          </label>

          <div className="relative">

            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

            <Input
              type="email"
              placeholder="you@example.com"
              className="h-12 rounded-xl border-white/10 bg-white/5 pl-12 text-white"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm text-zinc-300">
            Password
          </label>

          <div className="relative">

            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 rounded-xl border-white/10 bg-white/5 pl-12 pr-12 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-zinc-400" />
              ) : (
                <Eye className="h-5 w-5 text-zinc-400" />
              )}
            </button>

          </div>

        </div>

        <div className="flex justify-end">

          <Link
            href="#"
            className="text-sm text-zinc-400 hover:text-white"
          >
            Forgot password?
          </Link>

        </div>

        <Button className="h-12 w-full rounded-xl bg-white text-black hover:bg-zinc-200">
          Sign In
        </Button>

        <div className="relative py-2">

          <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

          <span className="relative mx-auto block w-fit bg-transparent px-3 text-xs text-zinc-500">
            OR CONTINUE WITH
          </span>

        </div>

        <GoogleButton />

        <p className="text-center text-sm text-zinc-400">

          Don't have an account?

          <Link
            href="/register"
            className="ml-2 font-semibold text-white hover:underline"
          >
            Create one
          </Link>

        </p>

      </div>

    </Card>
  );
}