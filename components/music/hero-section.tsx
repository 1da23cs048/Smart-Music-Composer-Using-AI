import { Music } from "lucide-react"
import { FloatingNotes } from "./floating-notes"
import { MusicComposer } from "./music-composer"

/**
 * STEP 12: Hero Section Component
 * 
 * This is the main hero section containing the title, subtitle, and composer.
 * It demonstrates:
 * - Full-screen layouts
 * - Background effects and gradients
 * - Responsive typography
 * - Component composition
 */

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/10 via-transparent to-transparent" />

      {/* Floating musical notes */}
      <FloatingNotes />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink shadow-lg glow-purple">
            <Music className="h-12 w-12 text-primary-foreground" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-balance bg-gradient-to-r from-foreground via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Smart Music Composer AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Generate custom music by mood, genre & tempo using AI. Create unique compositions in seconds.
          </p>
        </div>

        {/* Main Composer Interface */}
        <MusicComposer />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
