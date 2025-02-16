"use client"

import { useState, useRef } from "react"
import { Play, Pause, SkipBack, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [speed, setSpeed] = useState("33")
  const [isDragging, setIsDragging] = useState(false)
  const vinylRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const lastPositionRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPlaying) {
      setIsDragging(true)
      lastPositionRef.current = e.clientX
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isPlaying) {
      const diff = e.clientX - lastPositionRef.current
      setRotation(prev => prev + diff * 0.5)
      lastPositionRef.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0d14]">
      {/* Turntable */}
      <div className="relative w-[90vw] md:w-[600px] aspect-[4/3] bg-[#1a1d24] rounded-xl p-8 shadow-2xl">
        {/* Platter area */}
        <div className="absolute right-8 top-8 w-[50%] aspect-square">
          {/* Vinyl and album */}
          <div
            ref={vinylRef}
            className={`relative w-full h-full rounded-full shadow-xl overflow-hidden vinyl-player
                        ${isPlaying ? "animate-spin" : ""}`}
            style={{
              animationDuration: speed === "45" ? "2s" : "4s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              transform: `rotate(${rotation}deg)`,
              cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\"><path d=\"M21 14v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3\"/><path d=\"M10 3 8 21\"/><path d=\"M16 3c-1 6-2 11-3 14\"/><path d=\"M20 3c-1 6-2 11-3 14\"/></svg>') 16 16, pointer",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
              {/* Vinyl grooves */}
              {[...Array(8)].map((_, i) => (
                <circle key={i} cx="100" cy="100" r={95 - i * 10} fill="none" stroke="#222" strokeWidth="0.5" />
              ))}
            </svg>

            {/* Album cover */}
            <div className="w-[95%] h-[95%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
              <Image src="/careless.jpg" alt="Album cover" layout="fill" objectFit="cover" className="opacity-90" />
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

        {/* Controls */}
        <div className="absolute left-8 bottom-8 space-y-6">
          {/* Playback controls */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setIsPlaying(false)}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => setIsPlaying(!isPlaying)} className="h-12 w-12">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>

          {/* Speed control */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Speed</p>
            <div className="flex gap-2">
              <Button variant={speed === "33" ? "default" : "outline"} size="sm" onClick={() => setSpeed("33")}>
                33
              </Button>
              <Button variant={speed === "45" ? "default" : "outline"} size="sm" onClick={() => setSpeed("45")}>
                45
              </Button>
            </div>
          </div>

          {/* Volume control */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Volume</p>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
