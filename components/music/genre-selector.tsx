"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * STEP 3: Genre Selector Component
 * 
 * This component uses shadcn/ui Select for genre selection.
 * It demonstrates:
 * - Using pre-built UI components from shadcn/ui
 * - Proper TypeScript interfaces
 * - Controlled component pattern
 */

interface GenreSelectorProps {
  selectedGenre: string
  onGenreChange: (genre: string) => void
}

const genres = [
  { value: "classical", label: "Classical", icon: "🎻" },
  { value: "pop", label: "Pop", icon: "🎤" },
  { value: "jazz", label: "Jazz", icon: "🎷" },
  { value: "rock", label: "Rock", icon: "🎸" },
  { value: "electronic", label: "Electronic", icon: "🎹" },
]

export function GenreSelector({ selectedGenre, onGenreChange }: GenreSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Select Genre</label>
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full bg-card/50 border-border hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Choose a genre" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {genres.map((genre) => (
            <SelectItem
              key={genre.value}
              value={genre.value}
              className="cursor-pointer hover:bg-secondary/50"
            >
              <span className="flex items-center gap-2">
                <span role="img" aria-hidden="true">{genre.icon}</span>
                {genre.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
