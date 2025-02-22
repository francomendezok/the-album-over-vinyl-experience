"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PodcastIcon as SpotifyIcon } from "lucide-react"
import Image from "next/image"
import { useActionState } from "react";
import { login } from "@/lib/actions";

interface State {
  errors: {
    email?: string[]
    password?: string[]
  }
  state?: string
}

const initialState: State = {
  errors: {},
}

export default function AuthForm() {
  const [state, loginAction] = useActionState(login, initialState)

  const pending = state === undefined // The state is undefined while the action is pending


  return (
    <div className="dark">
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="items-center text-2xl text-center">The Album Over Vynil Experience</h1>
          <Image
            src="/logo.jpg"
            alt="Album art"
            width={150}
            height={150}
            priority
            className="rounded-full mx-auto"/>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <div className="space-y-4">
            <form action={loginAction}>
              <Button variant="outline" className="w-full bg-[#1DB954] text-white hover:bg-[#1ed760]" type="button">
                <SpotifyIcon className="mr-2 h-4 w-4" />
                Continue with Spotify
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="space-y-4">
                <Input type="email" name="email" placeholder="m@example.com" value="contact@cosdensolutions.io" className="bg-background" />
                <Input type="password" name="password" placeholder="Password" value="12345678" className="bg-background" />
                <Button disabled={pending} className="w-full" type="submit">
                  Create account
                </Button>
                {state?.errors?.email && (
                  <p className="text-red-500">{state.errors.email}</p>
                )}
                {state?.errors?.password && (
                  <p className="text-red-500">{state.errors.password}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

