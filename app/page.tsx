"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Cake, Gift, Heart, Stars, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export default function BirthdayWish() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Galaxy animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = []
    const generateStars = () => {
      for (let i = 0; i < 500; i++) {
        const radius = Math.random() * 2 + 0.5
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          color: `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${255}, ${0.7 + Math.random() * 0.3})`,
          speed: 0.05 + Math.random() * 0.1,
        })
      }
    }

    generateStars()

    // Nebula properties
    const nebulae: { x: number; y: number; radius: number; colors: string[] }[] = []
    const generateNebulae = () => {
      // Deep space nebulae
      nebulae.push({
        x: canvas.width * 0.3,
        y: canvas.height * 0.3,
        radius: 200,
        colors: ["rgba(111, 66, 193, 0.4)", "rgba(80, 60, 190, 0.3)", "rgba(130, 80, 190, 0.2)"],
      })

      nebulae.push({
        x: canvas.width * 0.7,
        y: canvas.height * 0.2,
        radius: 250,
        colors: ["rgba(193, 66, 140, 0.4)", "rgba(190, 60, 120, 0.3)", "rgba(190, 80, 150, 0.2)"],
      })

      nebulae.push({
        x: canvas.width * 0.5,
        y: canvas.height * 0.4,
        radius: 300,
        colors: ["rgba(66, 193, 152, 0.3)", "rgba(60, 170, 190, 0.2)", "rgba(80, 190, 180, 0.15)"],
      })

      // Add more nebulae for a richer galaxy feel
      nebulae.push({
        x: canvas.width * 0.2,
        y: canvas.height * 0.6,
        radius: 180,
        colors: ["rgba(138, 43, 226, 0.4)", "rgba(123, 104, 238, 0.3)", "rgba(147, 112, 219, 0.2)"],
      })

      nebulae.push({
        x: canvas.width * 0.8,
        y: canvas.height * 0.5,
        radius: 220,
        colors: ["rgba(75, 0, 130, 0.3)", "rgba(106, 90, 205, 0.2)", "rgba(72, 61, 139, 0.15)"],
      })
    }

    generateNebulae()

    // Distant galaxies
    const galaxies: { x: number; y: number; radius: number; rotation: number; speed: number }[] = []
    const generateGalaxies = () => {
      for (let i = 0; i < 3; i++) {
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          radius: 30 + Math.random() * 20,
          rotation: Math.random() * Math.PI * 2,
          speed: 0.0001 + Math.random() * 0.0002,
        })
      }
    }

    generateGalaxies()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "#050823")
      bgGradient.addColorStop(0.5, "#0a0a2a")
      bgGradient.addColorStop(1, "#1a0b2e")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        nebula.colors.forEach((color, index) => {
          const gradient = ctx.createRadialGradient(
            nebula.x,
            nebula.y,
            0,
            nebula.x,
            nebula.y,
            nebula.radius * (1 + index * 0.5),
          )
          gradient.addColorStop(0, color)
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(nebula.x, nebula.y, nebula.radius * (1 + index * 0.5), 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Draw distant galaxies
      galaxies.forEach((galaxy) => {
        galaxy.rotation += galaxy.speed

        ctx.save()
        ctx.translate(galaxy.x, galaxy.y)
        ctx.rotate(galaxy.rotation)

        // Draw spiral galaxy
        const galaxyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.radius)
        galaxyGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        galaxyGradient.addColorStop(0.2, "rgba(255, 240, 220, 0.6)")
        galaxyGradient.addColorStop(1, "rgba(255, 240, 220, 0)")

        ctx.fillStyle = galaxyGradient
        ctx.beginPath()
        ctx.arc(0, 0, galaxy.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw spiral arms
        for (let arm = 0; arm < 2; arm++) {
          ctx.beginPath()
          ctx.moveTo(0, 0)

          for (let i = 0; i < galaxy.radius; i += 0.5) {
            const angle = i / 15 + arm * Math.PI
            const x = i * Math.cos(angle)
            const y = i * Math.sin(angle)
            ctx.lineTo(x, y)
          }

          ctx.strokeStyle = "rgba(255, 240, 220, 0.3)"
          ctx.lineWidth = 2
          ctx.stroke()
        }

        ctx.restore()
      })

      // Draw and update stars
      stars.forEach((star) => {
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect to stars
        const glowSize = star.radius > 1.5 ? 3 : 2
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * glowSize, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * glowSize)
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.radius > 1.5 ? 0.4 : 0.2})`)
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = glow
        ctx.fill()

        // Twinkle effect
        star.radius = star.radius + Math.sin(Date.now() * star.speed) * 0.15

        // Subtle movement
        star.x += Math.sin(Date.now() * 0.001) * 0.05
        if (star.x > canvas.width) star.x = 0
        if (star.x < 0) star.x = canvas.width
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [canvasRef])

  // Confetti and initialization
  useEffect(() => {
    setMounted(true)

    // Trigger confetti when the page loads
    const duration = 8 * 1000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since they are random anyway, we can use the same random values
      confetti({
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a18cd1", "#ffecd2", "#a6c1ee"],
        shapes: ["star", "circle"],
        gravity: 0.5,
        scalar: 2,
      })

      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a18cd1", "#ffecd2", "#a6c1ee"],
        shapes: ["star", "circle"],
        gravity: 0.5,
        scalar: 2,
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050A30] flex flex-col items-center justify-center">
      {/* Galaxy canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cosmic dust overlay */}
      <div className="cosmic-dust absolute inset-0 z-[1]"></div>

      {/* Clouds */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>

      {/* Elegant shooting stars */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="elegant-shooting-star"
            style={{
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15 + 5}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-20 text-center px-4"
      >
        <motion.div
          className="relative inline-block"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-cinzel tracking-wider"
            style={{
              background: "linear-gradient(to right, #f8f9fa 0%, #e9d5ff 50%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              textShadow: [
                "0 0 10px rgba(233,213,255,0.8), 0 0 20px rgba(192,132,252,0.6), 0 0 30px rgba(192,132,252,0.4)",
                "0 0 15px rgba(233,213,255,0.6), 0 0 25px rgba(192,132,252,0.4), 0 0 35px rgba(192,132,252,0.2)",
                "0 0 10px rgba(233,213,255,0.8), 0 0 20px rgba(192,132,252,0.6), 0 0 30px rgba(192,132,252,0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Happy Birthday Mahi!
          </motion.h1>

          <motion.div
            className="absolute -top-10 -right-10 text-yellow-200"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-dancing"
          style={{
            color: "#f8f9fa",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          <p className="mb-4 leading-relaxed">
            On this special day, may your life be filled with endless joy, love, and wonderful surprises!
          </p>
          <p className="leading-relaxed">
            May the stars in this galaxy guide you to a year full of amazing adventures and beautiful memories.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-8 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-[#e9d5ff]"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Cake className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(233,213,255,0.7)]" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            className="text-[#c084fc]"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.3,
            }}
          >
            <Gift className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-[#f472b6]"
            animate={{
              scale: [1, 1.1, 1],
              filter: [
                "drop-shadow(0 0 8px rgba(244,114,182,0.7))",
                "drop-shadow(0 0 12px rgba(244,114,182,0.9))",
                "drop-shadow(0 0 8px rgba(244,114,182,0.7))",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            className="text-[#fef3c7]"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.6,
            }}
          >
            <Stars className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(254,243,199,0.7)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated cake with candles */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20"
      ></motion.div>

      {/* Tulip garden at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-40 md:h-48 overflow-hidden">
        <div className="tulip-container">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="tulip"
              style={{
                left: `${(i / 15) * 100}%`,
                animationDelay: `${i * 0.2}s`,
                bottom: `${Math.random() * 10 - 20}px`,
                zIndex: Math.floor(Math.random() * 10) + 20,
              }}
            >
              <div
                className="tulip-flower"
                style={{
                  background: ["#ff6b6b", "#f06595", "#cc5de8", "#5c7cfa", "#ff922b", "#ff8787", "#da77f2", "#748ffc"][
                    Math.floor(Math.random() * 8)
                  ],
                }}
              ></div>
              <div className="tulip-stem"></div>
              <div className="tulip-leaf"></div>
            </div>
          ))}
        </div>

        {/* Add some grass */}
        <div className="grass-container">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="grass-blade"
              style={{
                left: `${(i / 60) * 100}%`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`,
                zIndex: 20,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
