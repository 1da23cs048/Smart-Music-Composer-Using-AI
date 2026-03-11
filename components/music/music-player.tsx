"use client"

import { Play, Pause, Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WaveformVisualizer } from "./waveform-visualizer"

/**
 * STEP 7: Music Player Component
 * 
 * This component handles playback controls and displays music info.
 * It demonstrates:
 * - Button components with icons
 * - Composition with child components
 * - Event handling patterns
 */

interface MusicPlayerProps {
  isPlaying: boolean
  isGenerating: boolean
  hasMusic: boolean
  musicInfo: {
    mood: string
    genre: string
    tempo: number
    duration: string
  } | null
  onPlayPause: () => void
  onDownload: () => void
  onReset: () => void
}

export function MusicPlayer({
  isPlaying,
  isGenerating,
  hasMusic,
  musicInfo,
  onPlayPause,
  onDownload,
  onReset,
}: MusicPlayerProps) {
  return (
    <div className="space-y-4 animate-slide-up">
      {/* Waveform */}
      <WaveformVisualizer isPlaying={isPlaying} isGenerating={isGenerating} />

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          disabled={isGenerating}
          className="border-border hover:border-primary/50 hover:bg-primary/10"
          aria-label="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          size="lg"
          onClick={onPlayPause}
          disabled={!hasMusic || isGenerating}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink hover:opacity-90 transition-all duration-300 glow-purple"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onDownload}
          disabled={!hasMusic || isGenerating}
          className="border-border hover:border-neon-green/50 hover:bg-neon-green/10 hover:text-neon-green"
          aria-label="Download MIDI"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Music Info */}
      {musicInfo && hasMusic && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Generated:{" "}
            <span className="text-foreground font-medium capitalize">
              {musicInfo.mood} {musicInfo.genre}
            </span>
            {" - "}
            <span className="text-neon-cyan">{musicInfo.tempo} BPM</span>
            {" - "}
            <span className="text-neon-pink">{musicInfo.duration}</span>
          </p>
        </div>
      )}
    </div>
  )
}
