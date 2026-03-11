"use client"

import { Slider } from "@/components/ui/slider"

/**
 * STEP 4: Tempo Slider Component
 * 
 * This component allows users to select BPM (Beats Per Minute).
 * It demonstrates:
 * - Using shadcn/ui Slider component
 * - Visual feedback with dynamic styling
 * - Range input handling
 */

interface TempoSliderProps {
  tempo: number
  onTempoChange: (tempo: number) => void
}

export function TempoSlider({ tempo, onTempoChange }: TempoSliderProps) {
  // Calculate color based on tempo
  const getTempoColor = () => {
    if (tempo < 90) return "text-blue-400"
    if (tempo < 120) return "text-green-400"
    if (tempo < 150) return "text-yellow-400"
    return "text-red-400"
  }

  const getTempoLabel = () => {
    if (tempo < 90) return "Slow"
    if (tempo < 120) return "Moderate"
    if (tempo < 150) return "Fast"
    return "Very Fast"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">Tempo</label>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold font-mono ${getTempoColor()}`}>
            {tempo}
          </span>
          <span className="text-xs text-muted-foreground">BPM</span>
        </div>
      </div>
      
      <Slider
        value={[tempo]}
        onValueChange={(value) => onTempoChange(value[0])}
        min={60}
        max={180}
        step={1}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>60 BPM</span>
        <span className={`font-medium ${getTempoColor()}`}>{getTempoLabel()}</span>
        <span>180 BPM</span>
      </div>
    </div>
  )
}
