"use client"

import { useEffect, useState } from "react"
import { Music, Music2, Music3, Music4 } from "lucide-react"

/**
 * STEP 1: Floating Musical Notes Animation
 * 
 * This component creates animated musical notes that float around the hero section.
 * It demonstrates:
 * - React hooks (useState, useEffect)
 * - Client-side rendering with "use client"
 * - Dynamic positioning and animations
 * - Lucide React icons
 */

interface Note {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  icon: "music" | "music2" | "music3" | "music4"
}

export function FloatingNotes() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    // Generate random notes on client-side only
    const generatedNotes: Note[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 24 + 16,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
      icon: ["music", "music2", "music3", "music4"][Math.floor(Math.random() * 4)] as Note["icon"],
    }))
    setNotes(generatedNotes)
  }, [])

  const iconMap = {
    music: Music,
    music2: Music2,
    music3: Music3,
    music4: Music4,
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {notes.map((note) => {
        const IconComponent = iconMap[note.icon]
        return (
          <div
            key={note.id}
            className="absolute text-neon-purple/30 animate-float"
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              animationDelay: `${note.delay}s`,
              animationDuration: `${note.duration}s`,
            }}
          >
            <IconComponent size={note.size} />
          </div>
        )
      })}
    </div>
  )
}
