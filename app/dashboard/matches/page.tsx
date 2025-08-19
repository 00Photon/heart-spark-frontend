"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Shield, MessageCircle, Send } from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=center"],
    bio: "Artist and dreamer. Love painting under the stars and exploring cosmic connections.",
    interests: ["Art", "Astrology", "Hiking"],
    zodiac: "Pisces",
    distance: "2 miles away",
    compatibility: 94,
    verified: true,
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
  },
  {
    id: 3,
    name: "Sarah",
    age: 24,
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=center"],
    bio: "Yoga instructor and crystal enthusiast. Let's align our chakras together.",
    interests: ["Yoga", "Crystals", "Nature"],
    zodiac: "Gemini",
    distance: "3 miles away",
    compatibility: 91,
    verified: true,
  },
]

export default function MatchesPage() {
  const [messageModal, setMessageModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [messageText, setMessageText] = useState("")

  const handleMessage = (user) => {
    setSelectedUser(user)
    setMessageModal(true)
  }

  const sendMessage = () => {
    if (messageText.trim()) {
      console.log("[v0] Sending message to", selectedUser?.name, ":", messageText)
      setMessageText("")
      setMessageModal(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-foreground">Your Matches</h1>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {mockUsers.length} matches
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUsers.map((user) => (
                <Card
                  key={user.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <img
                      src={user.images[0] || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
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
                      <Badge variant="outline">{user.zodiac}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{user.distance}</p>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>
                    <Button size="sm" className="w-full" onClick={() => handleMessage(user)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={messageModal} onOpenChange={setMessageModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={selectedUser?.images?.[0] || "/placeholder.svg"}
                alt={selectedUser?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{selectedUser?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedUser?.zodiac} • {selectedUser?.distance}
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Write your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setMessageModal(false)}>
                Cancel
              </Button>
              <Button onClick={sendMessage} disabled={!messageText.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
