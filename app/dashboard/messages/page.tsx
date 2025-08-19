"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MessageCircle, Send, MoreVertical, Smile, Mic, Paperclip, Trash2, User, Flag, Ban } from "lucide-react"

const mockMessages = [
  {
    id: 1,
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=center",
    lastMessage: "Hey! How's your day going?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=center",
    lastMessage: "Would love to hear about your art!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=center",
    lastMessage: "Thanks for the super like! ✨",
    timestamp: "3h ago",
    unread: 1,
    online: true,
  },
]

const initialChatMessages = {
  1: [
    { id: 1, text: "Hey! I saw we matched. How's your day going?", sender: "them", timestamp: "2:30 PM", type: "text" },
    {
      id: 2,
      text: "Hi! It's going great, thanks for asking! I love your art pieces.",
      sender: "me",
      timestamp: "2:32 PM",
      type: "text",
    },
    {
      id: 3,
      text: "Thank you! I'd love to hear more about your interests too.",
      sender: "them",
      timestamp: "2:35 PM",
      type: "text",
    },
  ],
  2: [{ id: 1, text: "Would love to hear about your art!", sender: "them", timestamp: "1:00 PM", type: "text" }],
  3: [{ id: 1, text: "Thanks for the super like! ✨", sender: "them", timestamp: "11:00 AM", type: "text" }],
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messageInput, setMessageInput] = useState("")
  const [showStickers, setShowStickers] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [profileModal, setProfileModal] = useState(false)
  const [selectedUserProfile, setSelectedUserProfile] = useState(null)
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [chatMessages, setChatMessages] = useState(initialChatMessages)

  const stickers = ["😍", "❤️", "🔥", "✨", "🌟", "💫", "🦋", "🌸", "💕", "😘", "🥰", "😊"]

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }))

      setMessageInput("")
    }
  }

  const sendSticker = (sticker) => {
    const newMessage = {
      id: Date.now(),
      text: sticker,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "sticker",
    }

    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }))

    setShowStickers(false)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      files.forEach((file) => {
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        }
        setUploadedFiles((prev) => [...prev, fileData])
      })
    }
    event.target.value = ""
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const sendFiles = () => {
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        const newMessage = {
          id: Date.now() + Math.random(),
          text: file.name,
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "file",
          fileData: file,
        }

        setChatMessages((prev) => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), newMessage],
        }))
      })

      setUploadedFiles([])
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    console.log("[v0] Voice recording:", !isRecording ? "started" : "stopped")
  }

  const handleChatAction = (action) => {
    const currentUser = mockMessages.find((m) => m.id === selectedChat)
    console.log("[v0] Chat action:", action, "for user:", currentUser?.name)

    if (action === "profile") {
      setSelectedUserProfile(currentUser)
      setProfileModal(true)
    }
  }

  const currentMessages = chatMessages[selectedChat] || []

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex bg-card">
          {/* Messages List */}
          <div className="w-1/3 border-r border-border">
            <div className="p-4 border-b border-border">
              <h2 className="font-playfair text-xl font-bold text-foreground">Messages</h2>
            </div>
            <ScrollArea className="h-full">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedChat === message.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedChat(message.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.name[0]}</AvatarFallback>
                      </Avatar>
                      {message.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-foreground truncate">{message.name}</p>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
                    </div>
                    {message.unread > 0 && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        {message.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={mockMessages.find((m) => m.id === selectedChat)?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{mockMessages.find((m) => m.id === selectedChat)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {mockMessages.find((m) => m.id === selectedChat)?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {mockMessages.find((m) => m.id === selectedChat)?.online
                            ? "Online now"
                            : "Last seen recently"}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleChatAction("profile")}>
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChatAction("delete")} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChatAction("report")} className="text-yellow-600">
                          <Flag className="h-4 w-4 mr-2" />
                          Report User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChatAction("block")} className="text-red-600">
                          <Ban className="h-4 w-4 mr-2" />
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-xs ${
                            message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.type === "file" && message.fileData ? (
                            <div className="space-y-2">
                              {message.fileData.type.startsWith("image/") ? (
                                <img
                                  src={message.fileData.url || "/placeholder.svg"}
                                  alt={message.fileData.name}
                                  className="max-w-full h-auto rounded"
                                />
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Paperclip className="h-4 w-4" />
                                  <span className="text-sm">{message.fileData.name}</span>
                                </div>
                              )}
                            </div>
                          ) : message.type === "sticker" ? (
                            <div className="text-2xl">{message.text}</div>
                          ) : (
                            <p className="text-sm">{message.text}</p>
                          )}
                          <span
                            className={`text-xs ${
                              message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  {showStickers && (
                    <div className="mb-3 p-3 bg-muted rounded-lg">
                      <div className="grid grid-cols-6 gap-2">
                        {stickers.map((sticker, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="text-2xl h-12"
                            onClick={() => sendSticker(sticker)}
                          >
                            {sticker}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedFiles.length > 0 && (
                    <div className="mb-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Files to send:</span>
                        <Button size="sm" onClick={sendFiles} className="h-7">
                          Send Files
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-2 bg-background rounded border"
                          >
                            <div className="flex items-center space-x-2">
                              {file.type.startsWith("image/") && (
                                <img
                                  src={file.url || "/placeholder.svg"}
                                  alt={file.name}
                                  className="w-8 h-8 object-cover rounded"
                                />
                              )}
                              <div>
                                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowStickers(!showStickers)}>
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button variant={isRecording ? "destructive" : "ghost"} size="sm" onClick={toggleRecording}>
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={sendMessage} disabled={!messageInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a match to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Dialog open={profileModal} onOpenChange={setProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedUserProfile?.name}'s Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage src={selectedUserProfile?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedUserProfile?.name?.[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{selectedUserProfile?.name}</h3>
              <p className="text-muted-foreground">
                {selectedUserProfile?.online ? "Online now" : "Last seen recently"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Status:</strong> Looking for meaningful connections
              </p>
              <p className="text-sm">
                <strong>Interests:</strong> Art, Music, Travel
              </p>
              <p className="text-sm">
                <strong>Zodiac:</strong> Pisces ♓
              </p>
            </div>
            <Button className="w-full" onClick={() => setProfileModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
