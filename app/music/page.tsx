"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative w-[50vw] h-[80vh] max-w-[500px] max-h-[500px]">
        <div
          className={`w-full h-full rounded-full shadow-xl overflow-hidden
                      ${isPlaying ? "animate-spin" : ""}`}
          style={{
            animationDuration: "4s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {/* Vinyl background */}
          <svg viewBox="0 0 200 200" className="w-full h-full absolute">
            <defs>
              <radialGradient id="vinylGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="70%" stopColor="#111" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#vinylGradient)" />
            <circle cx="100" cy="100" r="95" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="55" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="35" fill="none" stroke="#222" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="#222" strokeWidth="0.5" />
          </svg>

          {/* Album cover image */}
          <div className="w-[95%] h-[95%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
            <Image src="/careless.jpg" alt="Album cover" draggable="false" layout="fill" objectFit="cover" />
          </div>

          {/* Vinyl center */}
          <div className="w-[15%] h-[15%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111] border border-[#333]">
            <div className="w-[30%] h-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#222]" />
          </div>
        </div>

        {/* Tonearm */}
        <div
          className="absolute top-0 right-[10%] w-[40%] h-[40%] transform -rotate-45 origin-bottom-left"
          style={{
            transition: "transform 0.5s ease-out",
            transform: isPlaying ? "rotate(-25deg)" : "rotate(-45deg)",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <line x1="0" y1="100" x2="100" y2="0" stroke="#d4d4d4" strokeWidth="2" />
            <circle cx="95" cy="5" r="5" fill="#d4d4d4" />
          </svg>
        </div>
      </div>
      <Button onClick={() => setIsPlaying(!isPlaying)} className="mt-8">
        {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  )
}

