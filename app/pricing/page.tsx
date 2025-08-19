"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, ArrowLeft, CheckCircle, X, Zap, Crown, Heart } from "lucide-react"
import { useState } from "react"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      annualPrice: "$0",
      period: "forever",
      description: "Perfect for getting started with cosmic connections",
      features: [
        "Basic zodiac matching",
        "5 likes per day",
        "Limited messaging (3 per day)",
        "Basic profile creation",
        "View compatibility scores",
      ],
      limitations: [
        "No advanced birth chart analysis",
        "No priority matching",
        "Limited profile visibility",
        "No read receipts",
      ],
      popular: false,
      icon: <Heart className="h-8 w-8 text-primary" />,
      color: "border-border",
    },
    {
      name: "Cosmic",
      price: "$9.99",
      annualPrice: "$95.90",
      originalAnnualPrice: "$119.88",
      period: "month",
      description: "Unlock the full power of cosmic matching",
      features: [
        "Advanced compatibility analysis",
        "Unlimited likes and messages",
        "Priority matching algorithm",
        "Read receipts and typing indicators",
        "Enhanced profile visibility",
        "Detailed compatibility insights",
        "Super likes (5 per day)",
        "Advanced filters",
      ],
      limitations: [],
      popular: true,
      icon: <Star className="h-8 w-8 text-primary" />,
      color: "border-primary",
    },
    {
      name: "Celestial",
      price: "$19.99",
      annualPrice: "$191.90",
      originalAnnualPrice: "$239.88",
      period: "month",
      description: "The ultimate cosmic dating experience",
      features: [
        "Everything in Cosmic plan",
        "Complete birth chart analysis",
        "Relationship compatibility reports",
        "Personalized astrological insights",
        "Priority customer support",
        "Exclusive celestial events access",
        "Advanced relationship coaching",
        "Unlimited super likes",
        "Profile boost (weekly)",
      ],
      limitations: [],
      popular: false,
      icon: <Crown className="h-8 w-8 text-primary" />,
      color: "border-secondary",
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "You'll continue to have access to premium features until the end of your current billing period, then your account will revert to the free plan.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day money-back guarantee for all premium subscriptions. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "Is my birth chart information secure?",
      answer:
        "Absolutely. We use industry-standard encryption to protect all your personal information, including birth chart data. Your privacy is our top priority.",
    },
    {
      question: "How accurate is the birth chart analysis?",
      answer:
        "Our birth chart analysis is performed by certified astrologers and uses precise astronomical calculations based on your exact birth time and location.",
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
            Choose Your <span className="text-primary">Perfect</span> Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start your journey for free or unlock premium features to enhance your connections and find your perfect
            match faster.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={!isAnnual ? "default" : "ghost"}
              size="sm"
              className="rounded-md"
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </Button>
            <Button
              variant={isAnnual ? "default" : "ghost"}
              size="sm"
              className="rounded-md"
              onClick={() => setIsAnnual(true)}
            >
              Annual
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                Save 20%
              </Badge>
            </Button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card
                className={`h-full relative ${plan.popular ? "border-primary shadow-lg scale-105" : plan.color} hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{plan.icon}</div>
                  <CardTitle className="font-playfair text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{isAnnual ? plan.annualPrice : plan.price}</span>
                    <span className="text-muted-foreground">/{isAnnual ? "year" : plan.period}</span>
                    {isAnnual && plan.originalAnnualPrice && (
                      <div className="mt-2 flex items-center justify-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Save 20%
                        </Badge>
                        <span className="text-sm text-muted-foreground line-through">{plan.originalAnnualPrice}</span>
                      </div>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center space-x-3 opacity-60">
                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full mt-6 ${plan.popular ? "" : "variant-outline"}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.name === "Free" ? "Get Started Free" : `Choose ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Why Choose Premium?</h2>
            <p className="text-xl text-muted-foreground">See what makes our premium plans special</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Matching",
                description:
                  "Our premium algorithm considers over 50 compatibility factors including detailed birth chart analysis.",
                icon: <Star className="h-8 w-8 text-primary" />,
              },
              {
                title: "Unlimited Connections",
                description:
                  "No limits on likes, messages, or matches. Connect with as many compatible people as you want.",
                icon: <Heart className="h-8 w-8 text-primary" />,
              },
              {
                title: "Personalized Insights",
                description: "Get detailed relationship compatibility reports and personalized astrological guidance.",
                icon: <Sparkles className="h-8 w-8 text-primary" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                  <CardTitle className="font-playfair text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about our pricing</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-primary text-primary-foreground rounded-lg p-12"
        >
          <h2 className="font-playfair text-4xl font-bold mb-6">Ready to Find Your Cosmic Match?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people who have found meaningful connections through the power of astrology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
