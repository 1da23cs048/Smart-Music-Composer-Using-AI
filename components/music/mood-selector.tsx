"use client"

import { cn } from "@/lib/utils"

/**
 * STEP 2: Mood Selector Component
 * 
 * This component creates glowing mood buttons for selecting the music mood.
 * It demonstrates:
 * - Conditional styling with cn() utility
 * - Tailwind CSS animations and transitions
 * - Event handling with TypeScript
 * - Accessibility best practices
 */

interface MoodSelectorProps {
  selectedMood: string
  onMoodChange: (mood: string) => void
}

const moods = [
  { id: "happy", label: "Happy", emoji: "😊", color: "from-yellow-500 to-orange-500" },
  { id: "sad", label: "Sad", emoji: "😢", color: "from-blue-500 to-indigo-500" },
  { id: "relaxing", label: "Relaxing", emoji: "😌", color: "from-green-500 to-teal-500" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "from-pink-500 to-red-500" },
]

export function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Select Mood</label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
              "hover:scale-105 hover:shadow-lg",
              selectedMood === mood.id
                ? `border-transparent bg-gradient-to-br ${mood.color} text-primary-foreground shadow-lg`
                : "border-border bg-card/50 hover:border-primary/50"
            )}
            aria-pressed={selectedMood === mood.id}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {mood.emoji}
            </span>
            <span className="text-sm font-medium">{mood.label}</span>
            {selectedMood === mood.id && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
