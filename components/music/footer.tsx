import { Github, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * STEP 10: Footer Component
 * 
 * This component displays the app footer with tech stack and links.
 * It demonstrates:
 * - External links with proper accessibility
 * - Semantic footer structure
 * - Brand consistency
 */

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Tech Stack */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by{" "}
              <span className="text-foreground font-medium">TensorFlow</span>
              {" + "}
              <span className="text-foreground font-medium">LSTM</span>
            </div>
          </div>

          {/* GitHub Link */}
          <Button
            variant="outline"
            size="sm"
            className="border-border hover:border-primary/50"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Smart Music Composer AI. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
