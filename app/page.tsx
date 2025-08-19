"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Star, Sparkles, Menu, X, ArrowRight, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  const features = [
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Zodiac Compatibility",
      description:
        "Our advanced algorithm matches you based on astrological compatibility, ensuring cosmic harmony in your relationships.",
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Location-Based Matching",
      description:
        "Find meaningful connections nearby. Distance matters when building real relationships that can flourish.",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Shared Interests",
      description:
        "Connect over common passions and hobbies. Shared interests create the foundation for lasting relationships.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      zodiac: "Pisces",
      text: "I found my soulmate through Heart-Spark! Our compatibility was written in the stars.",
      rating: 5,
    },
    {
      name: "Alex R.",
      zodiac: "Leo",
      text: "The zodiac matching is incredibly accurate. I've never felt more understood by someone.",
      rating: 5,
    },
    {
      name: "Maya K.",
      zodiac: "Scorpio",
      text: "Finally, a dating app that considers the deeper connections between people.",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Basic zodiac matching", "5 likes per day", "Limited messaging"],
      popular: false,
    },
    {
      name: "Cosmic",
      price: "$9.99",
      period: "month",
      features: ["Advanced compatibility", "Unlimited likes", "Priority matching", "Read receipts"],
      popular: true,
    },
    {
      name: "Celestial",
      price: "$19.99",
      period: "month",
      features: ["Everything in Cosmic", "Detailed birth chart analysis", "Relationship insights", "Premium support"],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Star className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
              </div>
              <span className="font-playfair text-2xl font-bold text-foreground">Heart-Spark</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/how-we-match" className="text-foreground hover:text-primary transition-colors">
                How We Match
              </Link>
              <Link href="/news" className="text-foreground hover:text-primary transition-colors">
                News
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/login">
                <Button variant="outline" className="mr-2 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button>Join Now</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/how-we-match" className="block text-foreground hover:text-primary transition-colors">
                How We Match
              </Link>
              <Link href="/news" className="block text-foreground hover:text-primary transition-colors">
                News
              </Link>
              <Link href="/pricing" className="block text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <div className="flex space-x-4 pt-4">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full">Join Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y: backgroundY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted opacity-60" />
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full"
            animate={{
              rotate: [0, 360],
              y: [0, -25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-1 h-1 bg-primary rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, -15, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-secondary rounded-full"
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent rounded-full"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <img
            src="/new.jpg"
            alt="Romantic couple embracing"
            className="w-full h-full object-cover opacity-20"
          />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Find Your{" "}
            <motion.span
              className="text-primary"
              animate={{
                textShadow: [
                  "0 0 0px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.8)",
                  "0 0 0px rgba(239, 68, 68, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Perfect
            </motion.span>{" "}
            Match
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            Connect with your perfect match through the power of astrology, shared location, and common interests. Let
            the stars guide you to meaningful relationships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8 py-6 group">
                Start Your Journey
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex justify-center items-center space-x-8 text-muted-foreground"
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="h-5 w-5" />
              <span>10K+ Matches</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Star className="h-5 w-5" />
              </motion.div>
              <span>4.9 Rating</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-5 w-5" />
              <span>100% Secure</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Hearts Animation */}
        <motion.div style={{ y: floatingY }} className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.3, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 2,
                ease: "easeInOut",
              }}
            >
              <Heart className="h-4 w-4 text-primary/30" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6"
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Why Choose Heart-Spark?
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe that true love is written in the stars. Our unique approach combines ancient wisdom with modern
              technology to help you find your perfect match.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 group">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="font-playfair text-2xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Match Section */}
      <section id="how-we-match" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Matching Algorithm
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how we use the power of astrology, location, and shared interests to find your perfect match.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
                alt="Matching algorithm visualization"
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Astrological Analysis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We analyze your birth chart, sun sign, moon sign, and rising sign to understand your cosmic
                    personality and compatibility patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Location Matching</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Find meaningful connections nearby. We consider distance preferences to help you build relationships
                    that can flourish in person.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Interest Alignment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect over shared passions, hobbies, and life goals. Common interests create the foundation for
                    lasting relationships.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Love Stories Written in the Stars
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real couples who found their perfect match through our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </CardTitle>
                        <Badge variant="secondary">{testimonial.zodiac}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">"{testimonial.text}"</p>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.2 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your Cosmic Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Start your journey for free or unlock premium features to enhance your cosmic connections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: plan.popular ? -15 : -10,
                  scale: plan.popular ? 1.05 : 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card
                  className={`h-full relative transition-all duration-300 ${
                    plan.popular ? "border-primary shadow-xl scale-105 hover:shadow-2xl" : "hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-playfair text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    <Button
                      className={`w-full mt-6 ${plan.popular ? "" : "variant-outline"}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-playfair text-4xl md:text-5xl font-bold mb-6"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255, 255, 255, 0.5)",
                  "0 0 30px rgba(255, 255, 255, 0.8)",
                  "0 0 0px rgba(255, 255, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Your Cosmic Love Story Awaits
            </motion.h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Join thousands of people who have found their perfect match through the power of astrology. Your soulmate
              is waiting among the stars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Create Your Profile
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Download App
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-8 w-8 text-sidebar-primary" />
                <span className="font-playfair text-2xl font-bold">Heart-Spark</span>
              </div>
              <p className="text-sidebar-foreground/80 leading-relaxed mb-4">
                Connecting souls through the ancient wisdom of astrology and the power of modern technology. Find your
                perfect match today.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Privacy
                </Button>
                <Button variant="ghost" size="sm">
                  Terms
                </Button>
                <Button variant="ghost" size="sm">
                  Support
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-sidebar-foreground/80">
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Zodiac Matching
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Location-Based
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Interest Matching
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Birth Chart Analysis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-sidebar-foreground/80">
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-sidebar-primary transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-sidebar-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-sidebar-foreground/60">
            <p>&copy; 2024 Heart-Spark. All rights reserved. Made with ❤️ and guided by the stars.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
