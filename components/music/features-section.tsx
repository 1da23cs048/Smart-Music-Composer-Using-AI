import { Brain, Download, Smile } from "lucide-react"
import { FeatureCard } from "./feature-card"

/**
 * STEP 9: Features Section Component
 * 
 * This component displays the app's features in a grid layout.
 * It demonstrates:
 * - Composition with FeatureCard
 * - CSS Grid layouts
 * - Semantic HTML structure
 */

const features = [
  {
    title: "AI Music Generation",
    description:
      "Powered by advanced neural networks, our AI creates unique musical compositions tailored to your preferences.",
    icon: Brain,
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    title: "MIDI Export",
    description:
      "Download your generated music as MIDI files to use in your favorite DAW or music production software.",
    icon: Download,
    gradient: "from-neon-cyan to-blue-500",
  },
  {
    title: "Mood-Based",
    description:
      "Select from various moods to generate music that perfectly matches the emotion you want to convey.",
    icon: Smile,
    gradient: "from-neon-green to-teal-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            <span className="text-balance">
              Why Choose Smart Music Composer?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the future of music creation with our cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
