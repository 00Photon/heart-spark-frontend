"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import  Link  from "next/link"
import {
  Users,
  Heart,
  MessageCircle,
  Star,
  Sparkles,
  Search,
  Eye,
  CheckCircle,
  DollarSign,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Shield,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for admin dashboard
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    age: 26,
    zodiac: "Pisces",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    status: "active",
    verified: true,
    subscription: "premium",
    matches: 23,
    messages: 156,
    reports: 0,
  },
  {
    id: 2,
    name: "Alex Rivera",
    email: "alex@example.com",
    age: 29,
    zodiac: "Leo",
    location: "Los Angeles, CA",
    joinDate: "2024-02-03",
    status: "active",
    verified: true,
    subscription: "free",
    matches: 18,
    messages: 89,
    reports: 1,
  },
  {
    id: 3,
    name: "Maya Patel",
    email: "maya@example.com",
    age: 24,
    zodiac: "Scorpio",
    location: "New York, NY",
    joinDate: "2024-01-28",
    status: "suspended",
    verified: false,
    subscription: "premium",
    matches: 31,
    messages: 203,
    reports: 3,
  },
]

const mockReports = [
  {
    id: 1,
    reportedUser: "John Doe",
    reportedBy: "Jane Smith",
    reason: "Inappropriate content",
    date: "2024-03-15",
    status: "pending",
    severity: "medium",
  },
  {
    id: 2,
    reportedUser: "Mike Johnson",
    reportedBy: "Sarah Chen",
    reason: "Fake profile",
    date: "2024-03-14",
    status: "resolved",
    severity: "high",
  },
  {
    id: 3,
    reportedUser: "Lisa Wong",
    reportedBy: "Alex Rivera",
    reason: "Harassment",
    date: "2024-03-13",
    status: "investigating",
    severity: "high",
  },
]

const analyticsData = [
  { month: "Jan", users: 1200, matches: 3400, messages: 8900 },
  { month: "Feb", users: 1800, matches: 4200, messages: 12300 },
  { month: "Mar", users: 2400, matches: 5100, messages: 15600 },
  { month: "Apr", users: 3200, matches: 6800, messages: 19200 },
  { month: "May", users: 4100, matches: 8200, messages: 23400 },
  { month: "Jun", users: 5200, matches: 9600, messages: 28100 },
]

const subscriptionData = [
  { name: "Free", value: 65, color: "#84cc16" },
  { name: "Premium", value: 30, color: "#15803d" },
  { name: "VIP", value: 5, color: "#d97706" },
]

const mockAdmins = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@cosmichearts.com",
    role: "Super Admin",
    joinDate: "2023-12-01",
    status: "active",
    lastLogin: "2024-03-15",
  },
  {
    id: 2,
    name: "Moderator Jane",
    email: "jane@cosmichearts.com",
    role: "Moderator",
    joinDate: "2024-01-15",
    status: "active",
    lastLogin: "2024-03-14",
  },
]

const subscriptionPlans = [
  {
    id: 1,
    name: "Premium Monthly",
    price: "$9.99",
    duration: "1 month",
    features: ["Unlimited likes", "See who liked you", "Boost profile"],
    subscribers: 2543,
    revenue: "$15,234",
    status: "active",
  },
  {
    id: 2,
    name: "Premium Annual",
    price: "$79.99",
    duration: "12 months",
    features: ["All Premium features", "20% discount", "Priority support"],
    subscribers: 678,
    revenue: "$6,789",
    status: "active",
  },
  {
    id: 3,
    name: "VIP Monthly",
    price: "$19.99",
    duration: "1 month",
    features: ["All Premium features", "Read receipts", "Advanced filters"],
    subscribers: 143,
    revenue: "$1,433",
    status: "active",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
  const [isViewUserOpen, setIsViewUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`)
    // Handle user actions (suspend, activate, delete, etc.)
  }

  const handleReportAction = (reportId: number, action: string) => {
    console.log(`${action} report ${reportId}`)
    // Handle report actions (resolve, dismiss, escalate)
  }

  const handleAddUser = (userData: any) => {
    console.log("[v0] Adding new user:", userData)
    setIsAddUserOpen(false)
  }

  const handleAddAdmin = (adminData: any) => {
    console.log("[v0] Adding new admin:", adminData)
    setIsAddAdminOpen(false)
  }

  const handleViewUser = (user: any) => {
    setCurrentUser(user)
    setIsViewUserOpen(true)
  }

  const handleEditUser = (user: any) => {
    setCurrentUser(user)
    setIsEditUserOpen(true)
  }

  const handleDeleteUser = (user: any) => {
    setCurrentUser(user)
    setIsDeleteUserOpen(true)
  }

  const confirmDeleteUser = () => {
    console.log("[v0] Deleting user:", currentUser?.id)
    setIsDeleteUserOpen(false)
    setCurrentUser(null)
  }

  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Matches",
      value: "8,234",
      change: "+8.2%",
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Messages Sent",
      value: "45,678",
      change: "+15.3%",
      icon: MessageCircle,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$23,456",
      change: "+22.1%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Star className="h-8 w-8 text-primary" />
                  <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
                </div>
                <span className="font-playfair text-2xl font-bold text-foreground">Cosmic Hearts</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Admin Panel
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your cosmic dating platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">
              Users
            </TabsTrigger>
            <TabsTrigger value="admins" className="text-xs sm:text-sm">
              Admins
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-xs sm:text-sm">
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm">
              Reports
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-sm text-green-600">{stat.change} from last month</p>
                          </div>
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "Sarah Chen", action: "Created new match", time: "2 minutes ago" },
                      { user: "Alex Rivera", action: "Updated profile", time: "5 minutes ago" },
                      { user: "Maya Patel", action: "Sent message", time: "8 minutes ago" },
                      { user: "John Doe", action: "Joined platform", time: "12 minutes ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{activity.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports
                      .filter((r) => r.status === "pending")
                      .map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-foreground">{report.reportedUser}</p>
                            <p className="text-sm text-muted-foreground">{report.reason}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all users on your platform</CardDescription>
                  </div>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="user-name">Full Name</Label>
                          <Input id="user-name" placeholder="Enter full name" />
                        </div>
                        <div>
                          <Label htmlFor="user-email">Email</Label>
                          <Input id="user-email" type="email" placeholder="Enter email" />
                        </div>
                        <div>
                          <Label htmlFor="user-age">Age</Label>
                          <Input id="user-age" type="number" placeholder="Enter age" />
                        </div>
                        <div>
                          <Label htmlFor="user-zodiac">Zodiac Sign</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select zodiac sign" />
                            </SelectTrigger>
                            <SelectContent>
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
                        </div>
                        <div>
                          <Label htmlFor="user-location">Location</Label>
                          <Input id="user-location" placeholder="Enter location" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleAddUser({})}>Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Matches</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${user.name[0]}`} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground flex items-center">
                                  {user.name}
                                  {user.verified && <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />}
                                </p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "suspended"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.subscription === "premium" ? "default" : "outline"}>
                              {user.subscription}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.matches}</TableCell>
                          <TableCell>
                            {user.reports > 0 ? (
                              <Badge variant="destructive">{user.reports}</Badge>
                            ) : (
                              <span className="text-muted-foreground">0</span>
                            )}
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Admin Management</CardTitle>
                    <CardDescription>Manage admin users and permissions</CardDescription>
                  </div>
                  <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Shield className="h-4 w-4 mr-2" />
                        Add Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Admin</DialogTitle>
                        <DialogDescription>Create a new admin account</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="admin-name">Full Name</Label>
                          <Input id="admin-name" placeholder="Enter full name" />
                        </div>
                        <div>
                          <Label htmlFor="admin-email">Email</Label>
                          <Input id="admin-email" type="email" placeholder="Enter email" />
                        </div>
                        <div>
                          <Label htmlFor="admin-role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super-admin">Super Admin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="admin-password">Password</Label>
                          <Input id="admin-password" type="password" placeholder="Enter password" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleAddAdmin({})}>Add Admin</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Admin</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAdmins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{admin.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{admin.name}</p>
                                <p className="text-sm text-muted-foreground">{admin.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{admin.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{admin.status}</Badge>
                          </TableCell>
                          <TableCell>{admin.lastLogin}</TableCell>
                          <TableCell>{admin.joinDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Subscription Management</CardTitle>
                    <CardDescription>Manage subscription plans and pricing</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Subscribers</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptionPlans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{plan.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {plan.features.slice(0, 2).join(", ")}
                                {plan.features.length > 2 && "..."}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{plan.price}</TableCell>
                          <TableCell>{plan.duration}</TableCell>
                          <TableCell>{plan.subscribers.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold text-green-600">{plan.revenue}</TableCell>
                          <TableCell>
                            <Badge variant="default">{plan.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review and manage user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reported User</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.reportedUser}</TableCell>
                          <TableCell>{report.reportedBy}</TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.severity === "high"
                                  ? "destructive"
                                  : report.severity === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {report.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.status === "resolved"
                                  ? "default"
                                  : report.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                              {report.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleReportAction(report.id, "resolve")}
                                  >
                                    Resolve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReportAction(report.id, "dismiss")}
                                  >
                                    Dismiss
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#15803d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="matches" fill="#84cc16" />
                      <Bar dataKey="messages" fill="#15803d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="Cosmic Hearts" />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" type="email" defaultValue="support@cosmichearts.com" />
                  </div>
                  <div>
                    <Label htmlFor="max-distance">Maximum Distance (miles)</Label>
                    <Input id="max-distance" type="number" defaultValue="100" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moderation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="auto-suspend">Auto-suspend after reports</Label>
                    <Input id="auto-suspend" type="number" defaultValue="3" />
                  </div>
                  <div>
                    <Label htmlFor="verification-required">Require verification for new users</Label>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="required">Required</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View User Modal */}
        <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {currentUser && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                    <p className="text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Age</Label>
                    <p>{currentUser.age}</p>
                  </div>
                  <div>
                    <Label>Zodiac Sign</Label>
                    <p>{currentUser.zodiac}</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p>{currentUser.location}</p>
                  </div>
                  <div>
                    <Label>Join Date</Label>
                    <p>{currentUser.joinDate}</p>
                  </div>
                  <div>
                    <Label>Matches</Label>
                    <p>{currentUser.matches}</p>
                  </div>
                  <div>
                    <Label>Messages</Label>
                    <p>{currentUser.messages}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {currentUser && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={currentUser.name} />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={currentUser.email} />
                </div>
                <div>
                  <Label htmlFor="edit-age">Age</Label>
                  <Input id="edit-age" type="number" defaultValue={currentUser.age} />
                </div>
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input id="edit-location" defaultValue={currentUser.location} />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={currentUser.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditUserOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Modal */}
        <AlertDialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {currentUser?.name}? This action cannot be undone and will permanently
                remove all user data, matches, and messages.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
