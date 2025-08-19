"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Sparkles, ArrowLeft, Calendar, ArrowRight, TrendingUp } from "lucide-react"

export default function NewsPage() {
  const featuredPost = {
    id: 1,
    title: "Mercury Retrograde and Your Love Life: What to Expect This Season",
    excerpt:
      "Discover how the current Mercury retrograde might be affecting your romantic connections and what you can do to navigate this cosmic event successfully.",
    content: "Mercury retrograde periods are often misunderstood when it comes to relationships...",
    author: "Dr. Luna Starweaver",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Astrology",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "The Science Behind Astrological Compatibility",
      excerpt:
        "Exploring the psychological and statistical foundations that make zodiac matching more than just superstition.",
      author: "Marcus Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Research",
      image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Success Story: How Sarah and Alex Found Love Through the Stars",
      excerpt: "A heartwarming tale of two Heart-Spark users who discovered their perfect match through our platform.",
      author: "Sofia Rodriguez",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Spring Equinox: The Perfect Time for New Beginnings in Love",
      excerpt:
        "Why the spring equinox energy makes it an ideal time to start your journey toward finding your cosmic match.",
      author: "Dr. Luna Starweaver",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Seasonal",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 5,
      title: "New Feature Alert: Birth Chart Analysis Now Available",
      excerpt: "We're excited to announce our new detailed birth chart analysis feature for premium subscribers.",
      author: "Heart-Spark Team",
      date: "March 5, 2024",
      readTime: "3 min read",
      category: "Product Updates",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 6,
      title: "Dating Tips for Each Zodiac Sign",
      excerpt: "Personalized dating advice based on your astrological sign to help you make the best first impression.",
      author: "Sofia Rodriguez",
      date: "March 3, 2024",
      readTime: "7 min read",
      category: "Dating Tips",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 7,
      title: "The Psychology of Cosmic Connections",
      excerpt: "Understanding why astrological compatibility resonates with so many people in modern dating.",
      author: "Dr. Luna Starweaver",
      date: "March 1, 2024",
      readTime: "9 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center",
    },
  ]

  const categories = [
    "All",
    "Astrology",
    "Research",
    "Success Stories",
    "Dating Tips",
    "Product Updates",
    "Seasonal",
    "Psychology",
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
            Heart-Spark <span className="text-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the latest in astrology, relationship advice, success stories, and updates from the Heart-Spark
            community.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4">
                  {featuredPost.category}
                </Badge>
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{featuredPost.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{featuredPost.author}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date} • {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Button>
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-8 text-center">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-lg p-12 text-center"
        >
          <h2 className="font-playfair text-3xl font-bold mb-4">Stay Connected to Your Perfect Match</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest astrological insights, dating tips, and Heart-Spark updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background border-0 focus:ring-2 focus:ring-secondary"
            />
            <Button variant="secondary" size="lg" className="px-8">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
