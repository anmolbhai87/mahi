import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Dancing_Script, Inter } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Happy Birthday Mahi!",
  description: "A special birthday wish for Mahi with a beautiful galaxy theme",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${dancingScript.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
