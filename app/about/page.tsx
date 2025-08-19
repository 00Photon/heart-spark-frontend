"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Sparkles, Heart, ArrowLeft, Shield } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Luna Starweaver",
      role: "Founder & Chief Astrologer",
      bio: "PhD in Astronomy with 15+ years in astrological research and relationship counseling.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=center",
      zodiac: "Aquarius",
    },
    {
      name: "Marcus Chen",
      role: "CTO & Algorithm Designer",
      bio: "Former Google engineer specializing in machine learning and compatibility algorithms.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center",
      zodiac: "Virgo",
    },
    {
      name: "Sofia Rodriguez",
      role: "Head of User Experience",
      bio: "UX designer passionate about creating meaningful digital connections.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=center",
      zodiac: "Libra",
    },
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Authentic Connections",
      description: "We believe in fostering genuine relationships built on compatibility and shared values.",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Cosmic Wisdom",
      description: "Ancient astrological knowledge combined with modern technology for better matches.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Safe & Secure",
      description: "Your privacy and safety are our top priorities in creating a trusted dating environment.",
    },
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
              <span className="font-playfair text-2xl font-bold text-foreground">Heart-Spark</span>
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
            About <span className="text-primary">Heart-Spark</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help people find meaningful connections through the ancient wisdom of astrology
            combined with modern technology and shared interests.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Heart-Spark was born from a simple belief: that the universe has a way of bringing compatible souls
                  together. Our founder, Dr. Luna Starweaver, noticed that traditional dating apps were missing
                  something crucial - the spark that makes relationships truly special.
                </p>
                <p>
                  After years of research in both astronomy and relationship psychology, she partnered with tech
                  innovators to create a platform that considers not just surface-level preferences, but the deeper
                  astrological compatibility that can predict long-term relationship success.
                </p>
                <p>
                  Today, we've helped thousands of people find their perfect matches, creating relationships that are
                  not just based on attraction, but on genuine compatibility written in the stars.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center"
                alt="Our story"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Heart-Spark
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{value.icon}</div>
                    <CardTitle className="font-playfair text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Heart-Spark
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-2xl">{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                      >
                        {member.zodiac}
                      </Badge>
                    </div>
                    <CardTitle className="font-playfair text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-semibold text-primary">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-lg p-12 text-center"
        >
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Users" },
              { number: "12K+", label: "Successful Matches" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support Available" },
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
          className="text-center mt-20"
        >
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">Ready to Find Your Cosmic Match?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who have found meaningful connections through the power of astrology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/how-we-match">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Learn How We Match
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
