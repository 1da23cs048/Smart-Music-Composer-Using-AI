"use client"

import { cn } from "@/lib/utils"

/**
 * STEP 5: Length Selector Component
 * 
 * This component allows users to select the duration of the generated music.
 * It demonstrates:
 * - Radio-button-like toggle behavior
 * - Grid layouts with Tailwind
 * - Conditional styling
 */

interface LengthSelectorProps {
  selectedLength: string
  onLengthChange: (length: string) => void
}

const lengths = [
  { value: "30", label: "30s", description: "Quick" },
  { value: "60", label: "1 min", description: "Short" },
  { value: "120", label: "2 min", description: "Medium" },
  { value: "300", label: "5 min", description: "Long" },
]

export function LengthSelector({ selectedLength, onLengthChange }: LengthSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Duration</label>
      <div className="grid grid-cols-4 gap-2">
        {lengths.map((length) => (
          <button
            key={length.value}
            onClick={() => onLengthChange(length.value)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all duration-200",
              selectedLength === length.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card/30 text-muted-foreground hover:border-primary/50 hover:bg-card/50"
            )}
            aria-pressed={selectedLength === length.value}
          >
            <span className="text-lg font-semibold">{length.label}</span>
            <span className="text-xs opacity-70">{length.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
