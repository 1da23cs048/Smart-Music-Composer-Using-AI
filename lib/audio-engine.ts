"use client"

/**
 * Audio Engine - Web Audio API based music generator
 * 
 * This creates actual playable music using:
 * - Oscillators for melody and bass
 * - Gain nodes for volume control
 * - Different scales and patterns based on mood
 */

// Musical scales for different moods
const SCALES: Record<string, number[]> = {
  happy: [0, 2, 4, 5, 7, 9, 11, 12], // Major scale
  sad: [0, 2, 3, 5, 7, 8, 10, 12], // Natural minor scale
  relaxing: [0, 2, 4, 7, 9, 12, 14, 16], // Pentatonic scale
  energetic: [0, 2, 4, 5, 7, 9, 11, 12], // Major with octave
}

// Base frequencies for different genres
const GENRE_BASE_FREQ: Record<string, number> = {
  pop: 261.63, // C4
  electronic: 220.0, // A3
  jazz: 293.66, // D4
  classical: 261.63, // C4
  lofi: 196.0, // G3
  ambient: 174.61, // F3
}

// Waveform types for different genres
const GENRE_WAVEFORMS: Record<string, OscillatorType> = {
  pop: "sine",
  electronic: "sawtooth",
  jazz: "triangle",
  classical: "sine",
  lofi: "triangle",
  ambient: "sine",
}

export class AudioEngine {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private oscillators: OscillatorNode[] = []
  private gainNodes: GainNode[] = []
  private isPlaying = false
  private currentPattern: number[] = []
  private patternIndex = 0
  private tempo = 120
  private intervalId: ReturnType<typeof setInterval> | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      this.masterGain.gain.value = 0.3
    }
  }

  private generatePattern(mood: string, length: number): number[] {
    const scale = SCALES[mood] || SCALES.happy
    const pattern: number[] = []
    const patternLength = length * 4 // Notes per second

    for (let i = 0; i < patternLength; i++) {
      // Add some musical variation
      const noteIndex = Math.floor(Math.random() * scale.length)
      pattern.push(scale[noteIndex])
      
      // Occasionally add rests (represented as -1)
      if (Math.random() > 0.8) {
        pattern.push(-1)
      }
    }

    return pattern
  }

  private playNote(frequency: number, waveform: OscillatorType, duration: number) {
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = waveform
    oscillator.frequency.value = frequency

    // Create an envelope for the note
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + duration)

    this.oscillators.push(oscillator)
    this.gainNodes.push(gainNode)
  }

  private playBassNote(frequency: number, duration: number) {
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.value = frequency / 2 // One octave lower

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration * 0.8)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + duration)

    this.oscillators.push(oscillator)
    this.gainNodes.push(gainNode)
  }

  generate(mood: string, genre: string, tempo: number, lengthSeconds: number): void {
    this.tempo = tempo
    this.currentPattern = this.generatePattern(mood, lengthSeconds)
    this.patternIndex = 0
  }

  play(mood: string, genre: string): void {
    if (!this.audioContext || this.isPlaying) return

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume()
    }

    this.isPlaying = true
    const baseFreq = GENRE_BASE_FREQ[genre] || 261.63
    const waveform = GENRE_WAVEFORMS[genre] || "sine"
    const beatDuration = 60 / this.tempo

    this.intervalId = setInterval(() => {
      if (this.patternIndex >= this.currentPattern.length) {
        this.patternIndex = 0 // Loop
      }

      const semitone = this.currentPattern[this.patternIndex]
      
      if (semitone !== -1) {
        // Calculate frequency for the semitone
        const frequency = baseFreq * Math.pow(2, semitone / 12)
        this.playNote(frequency, waveform, beatDuration * 0.8)

        // Add bass on every 4th beat
        if (this.patternIndex % 4 === 0) {
          this.playBassNote(baseFreq, beatDuration * 2)
        }
      }

      this.patternIndex++
    }, beatDuration * 1000 / 2) // Play twice per beat for more interesting rhythm
  }

  pause(): void {
    this.isPlaying = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  stop(): void {
    this.pause()
    this.patternIndex = 0
    
    // Clean up oscillators
    this.oscillators.forEach((osc) => {
      try {
        osc.stop()
      } catch {
        // Already stopped
      }
    })
    this.oscillators = []
    this.gainNodes = []
  }

  setVolume(value: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, value))
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying
  }

  dispose(): void {
    this.stop()
    if (this.audioContext) {
      this.audioContext.close()
    }
  }
}

// Singleton instance
let audioEngineInstance: AudioEngine | null = null

export function getAudioEngine(): AudioEngine {
  if (!audioEngineInstance && typeof window !== "undefined") {
    audioEngineInstance = new AudioEngine()
  }
  return audioEngineInstance!
}
