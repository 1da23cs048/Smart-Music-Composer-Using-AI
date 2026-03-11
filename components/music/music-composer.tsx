"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Sparkles, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { MoodSelector } from "./mood-selector"
import { GenreSelector } from "./genre-selector"
import { TempoSlider } from "./tempo-slider"
import { LengthSelector } from "./length-selector"
import { MusicPlayer } from "./music-player"
import { Spinner } from "@/components/ui/spinner"
import { getAudioEngine, AudioEngine } from "@/lib/audio-engine"

export function MusicComposer() {
  // State for music generation settings
  const [mood, setMood] = useState("happy")
  const [genre, setGenre] = useState("pop")
  const [tempo, setTempo] = useState(120)
  const [length, setLength] = useState("60")

  // State for playback and generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasMusic, setHasMusic] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [volume, setVolume] = useState(0.5)

  // Audio engine reference
  const audioEngineRef = useRef<AudioEngine | null>(null)

  // Initialize audio engine on mount
  useEffect(() => {
    audioEngineRef.current = getAudioEngine()
    audioEngineRef.current.setVolume(volume)

    return () => {
      // Cleanup on unmount
      if (audioEngineRef.current) {
        audioEngineRef.current.stop()
      }
    }
  }, [])

  // Update volume when it changes
  useEffect(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(volume)
    }
  }, [volume])

  // Format duration for display
  const formatDuration = (seconds: string) => {
    const secs = parseInt(seconds)
    if (secs < 60) return `0:${secs.toString().padStart(2, "0")}`
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`
  }

  // Generate music handler
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setIsPlaying(false)
    setHasMusic(false)

    // Stop any currently playing music
    if (audioEngineRef.current) {
      audioEngineRef.current.stop()
    }

    // Simulate AI generation time (generating the pattern)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate the music pattern
    if (audioEngineRef.current) {
      audioEngineRef.current.generate(mood, genre, tempo, parseInt(length))
    }

    setIsGenerating(false)
    setHasMusic(true)
    setShowConfetti(true)

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000)
  }, [mood, genre, tempo, length])

  // Playback controls
  const handlePlayPause = useCallback(() => {
    if (!audioEngineRef.current) return

    if (isPlaying) {
      audioEngineRef.current.pause()
      setIsPlaying(false)
    } else {
      audioEngineRef.current.play(mood, genre)
      setIsPlaying(true)
    }
  }, [isPlaying, mood, genre])

  const handleDownload = useCallback(() => {
    // In a real app, this would export MIDI
    alert("MIDI export feature coming soon!")
  }, [])

  const handleReset = useCallback(() => {
    if (audioEngineRef.current) {
      audioEngineRef.current.stop()
    }
    setHasMusic(false)
    setIsPlaying(false)
    setMood("happy")
    setGenre("pop")
    setTempo(120)
    setLength("60")
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Confetti effect */}
      {showConfetti && <ConfettiEffect />}

      <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-pink/20 pointer-events-none" />

        <div className="relative p-6 md:p-8 space-y-8">
          {/* Controls Section */}
          <div className="space-y-6">
            <MoodSelector selectedMood={mood} onMoodChange={setMood} />
            <GenreSelector selectedGenre={genre} onGenreChange={setGenre} />
            <TempoSlider tempo={tempo} onTempoChange={setTempo} />
            <LengthSelector selectedLength={length} onLengthChange={setLength} />
          </div>

          {/* Generate Button */}
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-neon-purple via-primary to-neon-pink hover:opacity-90 transition-all duration-300 animate-pulse-glow disabled:animate-none disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Music
              </>
            )}
          </Button>

          {/* Player Section */}
          {(hasMusic || isGenerating) && (
            <>
              <MusicPlayer
                isPlaying={isPlaying}
                isGenerating={isGenerating}
                hasMusic={hasMusic}
                musicInfo={
                  hasMusic
                    ? {
                        mood,
                        genre,
                        tempo,
                        duration: formatDuration(length),
                      }
                    : null
                }
                onPlayPause={handlePlayPause}
                onDownload={handleDownload}
                onReset={handleReset}
              />

              {/* Volume Control */}
              {hasMusic && (
                <div className="flex items-center gap-3 px-4">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    onValueChange={(values) => setVolume(values[0])}
                    min={0}
                    max={1}
                    step={0.01}
                    className="flex-1"
                    aria-label="Volume"
                  />
                  <span className="text-xs text-muted-foreground w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

/**
 * Confetti Effect Component
 */
function ConfettiEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full animate-[confetti_3s_ease-out_forwards]"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: ["#a855f7", "#ec4899", "#06b6d4", "#22c55e", "#f59e0b"][
              Math.floor(Math.random() * 5)
            ],
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
