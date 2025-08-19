"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Sparkles, ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    console.log("OTP verification:", otpCode)
    // Handle OTP verification logic here
  }

  const handleResend = () => {
    setTimeLeft(300)
    setOtp(["", "", "", "", "", ""])
    console.log("Resending OTP...")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-primary rounded-full animate-pulse delay-1500" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to signup */}
        <Link
          href="/signup"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Signup
        </Link>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-2">
              <div className="relative">
                <Star className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
              </div>
              <span className="font-playfair text-2xl font-bold text-foreground">Cosmic Hearts</span>
            </div>
            <CardTitle className="font-playfair text-3xl">Verify Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent a 6-digit verification code to your email address. Please enter it below to complete your
              registration.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  Time remaining: <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                </p>
                {timeLeft === 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResend}
                    className="text-primary bg-transparent"
                  >
                    Resend Code
                  </Button>
                ) : (
                  <Button type="button" variant="ghost" onClick={handleResend} className="text-muted-foreground">
                    Didn't receive the code? Resend
                  </Button>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-base" disabled={otp.some((digit) => !digit)}>
                Verify & Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
