"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * STEP 6: Waveform Visualizer Component
 * 
 * This component creates an animated waveform display.
 * It demonstrates:
 * - Complex animations with CSS
 * - Dynamic bar generation
 * - useEffect for animation timing
 * - Conditional rendering based on playback state
 */

interface WaveformVisualizerProps {
  isPlaying: boolean
  isGenerating?: boolean
}

export function WaveformVisualizer({ isPlaying, isGenerating = false }: WaveformVisualizerProps) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    // Generate initial bar heights
    setBars(Array.from({ length: 50 }, () => Math.random() * 100))
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    // Animate bars when playing
    const interval = setInterval(() => {
      setBars(Array.from({ length: 50 }, () => Math.random() * 100))
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="relative w-full h-32 bg-card/30 rounded-xl border border-border overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-pink/10 to-neon-purple/10" />
      
      {/* Waveform bars */}
      <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-4">
        {bars.map((height, index) => (
          <div
            key={index}
            className={cn(
              "w-1 rounded-full transition-all duration-100",
              isPlaying
                ? "bg-gradient-to-t from-neon-purple to-neon-pink"
                : isGenerating
                ? "bg-neon-cyan/50"
                : "bg-muted-foreground/30"
            )}
            style={{
              height: `${isPlaying || isGenerating ? height : 30}%`,
              transitionDelay: `${index * 10}ms`,
            }}
          />
        ))}
      </div>

      {/* Playhead line */}
      {isPlaying && (
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-neon-green animate-pulse" />
      )}

      {/* Generating overlay */}
      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}
    </div>
  )
}
