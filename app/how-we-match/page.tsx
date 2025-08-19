"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, ArrowLeft, Brain, MapPin, Heart, Zap } from "lucide-react"

export default function HowWeMatchPage() {
  const matchingSteps = [
    {
      step: 1,
      title: "Astrological Profile Creation",
      description:
        "We analyze your birth chart, including sun, moon, and rising signs to understand your cosmic personality.",
      details: [
        "Birth chart analysis using exact birth time and location",
        "Planetary positions and their influence on personality",
        "Compatibility patterns based on elemental harmony",
        "Venus and Mars placements for relationship insights",
      ],
      icon: <Star className="h-12 w-12 text-primary" />,
    },
    {
      step: 2,
      title: "Location & Lifestyle Matching",
      description:
        "Find compatible matches within your preferred distance range who share similar lifestyle preferences.",
      details: [
        "Customizable distance preferences (1-100 miles)",
        "Lifestyle compatibility scoring",
        "Activity level and social preferences",
        "Career and education alignment",
      ],
      icon: <MapPin className="h-12 w-12 text-primary" />,
    },
    {
      step: 3,
      title: "Interest & Values Alignment",
      description:
        "Connect over shared passions, hobbies, and core values that create lasting relationship foundations.",
      details: [
        "Detailed interest categorization and weighting",
        "Core values assessment and matching",
        "Communication style compatibility",
        "Long-term goal alignment analysis",
      ],
      icon: <Heart className="h-12 w-12 text-primary" />,
    },
    {
      step: 4,
      title: "AI-Powered Compatibility Scoring",
      description: "Our advanced algorithm combines all factors to generate a comprehensive compatibility score.",
      details: [
        "Machine learning-based compatibility prediction",
        "Continuous algorithm improvement based on successful matches",
        "Multi-dimensional scoring across all compatibility factors",
        "Personalized match recommendations",
      ],
      icon: <Brain className="h-12 w-12 text-primary" />,
    },
  ]

  const zodiacCompatibility = [
    { sign1: "Aries", sign2: "Leo", compatibility: 95, element: "Fire" },
    { sign1: "Taurus", sign2: "Virgo", compatibility: 92, element: "Earth" },
    { sign1: "Gemini", sign2: "Libra", compatibility: 88, element: "Air" },
    { sign1: "Cancer", sign2: "Scorpio", compatibility: 94, element: "Water" },
    { sign1: "Leo", sign2: "Sagittarius", compatibility: 91, element: "Fire" },
    { sign1: "Virgo", sign2: "Capricorn", compatibility: 89, element: "Earth" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Star className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
              </div>
              <span className="font-playfair text-2xl font-bold text-foreground">Cosmic Hearts</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            How We <span className="text-primary">Match</span> You
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the science and art behind our unique matching algorithm that combines ancient astrological wisdom
            with modern AI technology.
          </p>
        </motion.div>

        {/* Matching Process */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">Our Matching Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive 4-step process that ensures the highest quality matches
            </p>
          </motion.div>

          <div className="space-y-12">
            {matchingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mr-4">
                          {step.step}
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <Zap className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-8 ${
                        index % 2 === 1 ? "lg:col-start-1" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Zodiac Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">Zodiac Compatibility Examples</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how different zodiac signs complement each other based on elemental harmony
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zodiacCompatibility.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center items-center space-x-4 mb-2">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {match.sign1}
                      </Badge>
                      <Heart className="h-6 w-6 text-primary" />
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {match.sign2}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {match.element} Element
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{match.compatibility}%</div>
                    <p className="text-sm text-muted-foreground">Compatibility Score</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-lg p-12 mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Our Success Rate</h2>
            <p className="text-xl text-muted-foreground">Real results from our advanced matching algorithm</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "87%", label: "Match Satisfaction Rate" },
              { number: "73%", label: "First Date Success" },
              { number: "45%", label: "Long-term Relationships" },
              { number: "92%", label: "Algorithm Accuracy" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
            Ready to Experience Our Matching Magic?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who have found their perfect cosmic match through our advanced algorithm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Your Profile
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Learn About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
