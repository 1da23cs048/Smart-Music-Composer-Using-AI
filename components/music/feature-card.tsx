import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

/**
 * STEP 8: Feature Card Component
 * 
 * This is a reusable card component for displaying features.
 * It demonstrates:
 * - Server Components (no "use client")
 * - TypeScript generics with LucideIcon
 * - Hover effects and transitions
 */

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient = "from-neon-purple to-neon-pink",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl border border-border bg-card/30",
        "hover:bg-card/50 hover:border-primary/30 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Gradient background on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300",
          `bg-gradient-to-br ${gradient}`
        )}
      />

      <div className="relative space-y-4">
        {/* Icon */}
        <div
          className={cn(
            "inline-flex p-3 rounded-xl",
            `bg-gradient-to-br ${gradient}`
          )}
        >
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
