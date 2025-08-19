"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Camera, Crown, CreditCard, Check } from "lucide-react"

export default function SettingsPage() {
  const [paymentModal, setPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [currentPlan, setCurrentPlan] = useState("free")

  const subscriptionPlans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["5 likes per day", "Basic matching", "Limited messages"],
      current: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      period: "month",
      features: ["Unlimited likes", "Advanced filters", "See who liked you", "Unlimited messages", "Read receipts"],
      popular: true,
    },
    {
      id: "platinum",
      name: "Platinum",
      price: "$19.99",
      period: "month",
      features: [
        "Everything in Premium",
        "Priority matching",
        "Super likes",
        "Boost profile",
        "Message before matching",
      ],
      premium: true,
    },
  ]

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan)
    setPaymentModal(true)
  }

  const processPayment = () => {
    console.log("[v0] Processing payment for", selectedPlan?.name)
    setCurrentPlan(selectedPlan?.id)
    setPaymentModal(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-3xl font-bold text-foreground mb-8">Settings</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=center" />
                        <AvatarFallback>YU</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Your Name" />
                      </div>
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" defaultValue="25" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full p-3 border border-border rounded-md resize-none"
                        rows={4}
                        defaultValue="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Crown className="h-6 w-6 text-yellow-500" />
                        <div>
                          <p className="font-semibold capitalize">{currentPlan} Plan</p>
                          <p className="text-sm text-muted-foreground">
                            {subscriptionPlans.find((p) => p.id === currentPlan)?.price} /{" "}
                            {subscriptionPlans.find((p) => p.id === currentPlan)?.period}
                          </p>
                        </div>
                      </div>
                      {currentPlan === "free" && <Badge variant="secondary">Free</Badge>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade Your Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {subscriptionPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`relative p-6 border rounded-lg ${
                            plan.popular ? "border-primary bg-primary/5" : "border-border"
                          } ${currentPlan === plan.id ? "opacity-50" : ""}`}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                          )}
                          <div className="text-center mb-4">
                            <h3 className="font-semibold text-lg">{plan.name}</h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold">{plan.price}</span>
                              <span className="text-muted-foreground">/{plan.period}</span>
                            </div>
                          </div>
                          <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button
                            className="w-full"
                            variant={currentPlan === plan.id ? "secondary" : "default"}
                            disabled={currentPlan === plan.id}
                            onClick={() => handleUpgrade(plan)}
                          >
                            {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Discovery Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium">Age Range: 22 - 35</Label>
                      <Slider defaultValue={[22, 35]} max={50} min={18} step={1} className="mt-2" />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Maximum Distance: 25 miles</Label>
                      <Slider defaultValue={[25]} max={100} min={1} step={1} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Show me on Discovery</Label>
                        <p className="text-sm text-muted-foreground">Control your visibility to other users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "New Matches", description: "Get notified when you have a new match" },
                      { label: "Messages", description: "Get notified when you receive a message" },
                      { label: "Super Likes", description: "Get notified when someone super likes you" },
                      { label: "Profile Views", description: "Get notified when someone views your profile" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Safety</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Show Distance", description: "Display your distance to other users" },
                      { label: "Show Last Active", description: "Show when you were last active" },
                      { label: "Read Receipts", description: "Let others know when you've read their messages" },
                      { label: "Online Status", description: "Show when you're online" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked={index < 2} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Dialog open={paymentModal} onOpenChange={setPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to {selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{selectedPlan?.name} Plan</span>
                <span className="font-bold">
                  {selectedPlan?.price}/{selectedPlan?.period}
                </span>
              </div>
              <ul className="text-sm space-y-1">
                {selectedPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setPaymentModal(false)}>
                Cancel
              </Button>
              <Button onClick={processPayment}>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay {selectedPlan?.price}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
