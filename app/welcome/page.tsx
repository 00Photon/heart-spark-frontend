"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Sparkles, Heart, Users, MapPin, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const features = [
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Zodiac Matching",
      description: "Find compatible matches based on astrological harmony",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Local Connections",
      description: "Discover people in your area for meaningful relationships",
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Shared Interests",
      description: "Connect over common passions and hobbies",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-primary rounded-full animate-pulse delay-1500" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl relative z-10 text-center"
      >
        <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {/* Logo and welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex justify-center items-center space-x-2 mb-6">
                <div className="relative">
                  <Star className="h-12 w-12 text-primary" />
                  <Sparkles className="h-6 w-6 text-secondary absolute -top-1 -right-1" />
                </div>
                <span className="font-playfair text-3xl font-bold text-foreground">Cosmic Hearts</span>
              </div>

              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
                Welcome to Your Cosmic Journey!
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Your account has been successfully created. Get ready to discover meaningful connections guided by the
                stars and shared interests.
              </p>
            </motion.div>

            {/* Features preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-muted/30"
                >
                  <div className="mx-auto mb-3 p-2 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center items-center space-x-8 mb-8 text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">10K+ Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">5K+ Matches</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span className="font-semibold">4.9 Rating</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <a href="/dashboard">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              Your cosmic adventure begins now. Let the stars guide you to your perfect match!
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
