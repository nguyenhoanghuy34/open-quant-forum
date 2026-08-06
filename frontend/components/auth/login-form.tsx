"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import GoogleButton from "./google-button";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md rounded-2xl border-zinc-800 bg-zinc-900 text-white shadow-xl">

      <CardHeader className="space-y-2">

        <CardTitle className="text-center text-3xl font-bold">
          Welcome Back
        </CardTitle>

        <p className="text-center text-sm text-zinc-400">
          Sign in to OpenQuant Forum
        </p>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>

          <Input
            type="password"
            placeholder="••••••••"
          />
        </div>

        <Button className="h-11 w-full">
          Login
        </Button>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-zinc-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <GoogleButton />

      </CardContent>

    </Card>
  );
}