"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PodcastIcon as SpotifyIcon } from "lucide-react"
import Image from "next/image"

export default function AuthForm() {
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
            className="rounded-full mx-auto"/>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <div className="space-y-4">
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
              <Input type="email" placeholder="m@example.com" className="bg-background" />
              <Input type="password" placeholder="Password" className="bg-background" />
              <Button className="w-full" type="submit">
                Create account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

