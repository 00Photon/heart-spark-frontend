"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Heart, X, MessageCircle, Zap, Shield, MapPin, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [ageRange, setAgeRange] = useState([22, 35])
  const [maxDistance, setMaxDistance] = useState([25])
  const [selectedZodiac, setSelectedZodiac] = useState("all")
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Emma",
      age: 26,
      images: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b780?w=300&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=center",
      ],
      bio: "Artist and dreamer. Love painting under the stars and exploring cosmic connections.",
      interests: ["Art", "Astrology", "Hiking"],
      zodiac: "Pisces",
      distance: "2 miles away",
      compatibility: 94,
      verified: true,
      currentImageIndex: 0,
    },
    {
      id: 2,
      name: "Alex",
      age: 28,
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center"],
      bio: "Musician who believes in the power of the universe. Looking for my cosmic match.",
      interests: ["Music", "Meditation", "Travel"],
      zodiac: "Scorpio",
      distance: "5 miles away",
      compatibility: 87,
      verified: false,
      currentImageIndex: 0,
    },
    {
      id: 3,
      name: "Sarah",
      age: 24,
      images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=center"],
      bio: "Yoga instructor and crystal enthusiast. Let's align our chakras together.",
      interests: ["Yoga", "Crystals", "Nature"],
      zodiac: "Gemini",
      distance: "3 miles away",
      compatibility: 91,
      verified: true,
      currentImageIndex: 0,
    },
    {
      id: 4,
      name: "Marcus",
      age: 30,
      images: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=center"],
      bio: "Adventure seeker and stargazer. Let's explore the cosmos together.",
      interests: ["Adventure", "Astronomy", "Photography"],
      zodiac: "Leo",
      distance: "4 miles away",
      compatibility: 89,
      verified: true,
      currentImageIndex: 0,
    },
    {
      id: 5,
      name: "Luna",
      age: 25,
      images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=center"],
      bio: "Spiritual healer and moon child. Seeking deep connections under the stars.",
      interests: ["Spirituality", "Healing", "Moon phases"],
      zodiac: "Cancer",
      distance: "6 miles away",
      compatibility: 92,
      verified: false,
      currentImageIndex: 0,
    },
    {
      id: 6,
      name: "Zoe",
      age: 27,
      images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=center"],
      bio: "Free spirit and crystal collector. Looking for someone who understands my energy.",
      interests: ["Crystals", "Energy work", "Dancing"],
      zodiac: "Aquarius",
      distance: "7 miles away",
      compatibility: 85,
      verified: true,
      currentImageIndex: 0,
    },
    {
      id: 7,
      name: "River",
      age: 29,
      images: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=center"],
      bio: "Nature lover and meditation teacher. Let's find peace together.",
      interests: ["Nature", "Meditation", "Hiking"],
      zodiac: "Virgo",
      distance: "8 miles away",
      compatibility: 88,
      verified: false,
      currentImageIndex: 0,
    },
    {
      id: 8,
      name: "Phoenix",
      age: 31,
      images: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=center"],
      bio: "Tarot reader and cosmic guide. Ready to explore our destiny together.",
      interests: ["Tarot", "Astrology", "Spirituality"],
      zodiac: "Sagittarius",
      distance: "9 miles away",
      compatibility: 93,
      verified: true,
      currentImageIndex: 0,
    },
    {
      id: 9,
      name: "Sage",
      age: 26,
      images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=center"],
      bio: "Herbalist and earth lover. Seeking someone who appreciates natural beauty.",
      interests: ["Herbalism", "Gardening", "Earth magic"],
      zodiac: "Taurus",
      distance: "10 miles away",
      compatibility: 86,
      verified: false,
      currentImageIndex: 0,
    },
    {
      id: 10,
      name: "Nova",
      age: 23,
      images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=center"],
      bio: "Young soul with an old spirit. Love stargazing and deep conversations.",
      interests: ["Stargazing", "Philosophy", "Art"],
      zodiac: "Libra",
      distance: "11 miles away",
      compatibility: 90,
      verified: true,
      currentImageIndex: 0,
    },
  ])

  const usersPerPage = 4
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesZodiac = selectedZodiac === "all" || user.zodiac.toLowerCase() === selectedZodiac.toLowerCase()

      return matchesSearch && matchesZodiac
    })
  }, [users, searchQuery, selectedZodiac])

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const handleRemoveUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleLikeUser = (userId) => {
    console.log("[v0] Liked user:", userId)
    // Add like animation or feedback here
  }

  const handleGiftUser = (user) => {
    setSelectedUser(user)
    setShowGiftModal(true)
  }

  const handleMessageUser = (user) => {
    setSelectedUser(user)
    setShowMessageModal(true)
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleZodiacChange = (value) => {
    setSelectedZodiac(value)
    setCurrentPage(1)
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8">
          {/* Header with Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <h1 className="font-playfair text-3xl font-bold text-foreground">Discover</h1>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or interests..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={selectedZodiac} onValueChange={handleZodiacChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Zodiac" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Signs</SelectItem>
                  <SelectItem value="aries">Aries</SelectItem>
                  <SelectItem value="taurus">Taurus</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                  <SelectItem value="cancer">Cancer</SelectItem>
                  <SelectItem value="leo">Leo</SelectItem>
                  <SelectItem value="virgo">Virgo</SelectItem>
                  <SelectItem value="libra">Libra</SelectItem>
                  <SelectItem value="scorpio">Scorpio</SelectItem>
                  <SelectItem value="sagittarius">Sagittarius</SelectItem>
                  <SelectItem value="capricorn">Capricorn</SelectItem>
                  <SelectItem value="aquarius">Aquarius</SelectItem>
                  <SelectItem value="pisces">Pisces</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* User Grid */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"} found
            </p>
          </div>

          {currentUsers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <img
                      src={user.images[user.currentImageIndex] || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Image Navigation */}
                    {user.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                          onClick={() => {
                            const newIndex =
                              user.currentImageIndex > 0 ? user.currentImageIndex - 1 : user.images.length - 1
                            setUsers(users.map((u) => (u.id === user.id ? { ...u, currentImageIndex: newIndex } : u)))
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                          onClick={() => {
                            const newIndex =
                              user.currentImageIndex < user.images.length - 1 ? user.currentImageIndex + 1 : 0
                            setUsers(users.map((u) => (u.id === user.id ? { ...u, currentImageIndex: newIndex } : u)))
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        {user.compatibility}%
                      </Badge>
                    </div>
                    {user.verified && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-blue-500 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">
                        {user.name}, {user.age}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {user.zodiac}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {user.distance}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{user.bio}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleGiftUser(user)}
                      >
                        <Zap className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => handleMessageUser(user)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => handleLikeUser(user.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedZodiac("all")
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {currentUsers.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Gift Modal */}
      <Dialog open={showGiftModal} onOpenChange={setShowGiftModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send a Gift to {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 p-4">
            {["🌹", "💎", "🍫", "🎁", "⭐", "🦋", "🌙", "✨"].map((emoji, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 text-2xl bg-transparent"
                onClick={() => {
                  console.log("[v0] Sent gift:", emoji, "to", selectedUser?.name)
                  setShowGiftModal(false)
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-border rounded-md resize-none"
              rows={4}
              placeholder="Write your message..."
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("[v0] Sent message to", selectedUser?.name)
                  setShowMessageModal(false)
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
