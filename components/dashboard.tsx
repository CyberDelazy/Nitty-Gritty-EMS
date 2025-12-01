"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Sun,
  Moon,
  Clock,
  LogOut,
  Phone,
  Mail,
  TrendingUp,
  UserCheck,
  Download,
  Menu,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UtensilsCrossed,
  FileText,
  Home,
  Users,
  BarChart3,
  Settings,
} from "lucide-react"

interface DashboardProps {
  userData: {
    name: string
    email: string
    department: string
  }
  onLogout: () => void
}

export default function Dashboard({ userData, onLogout }: DashboardProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [isOnLunch, setIsOnLunch] = useState(false)
  const [notes, setNotes] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  // Mock KPI data
  const [kpis, setKpis] = useState({
    callsMade: 24,
    leadsGenerated: 12,
    emailsSent: 38,
    promisingLeads: 5,
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn)
  }

  const handleCallOutcome = (outcome: "success" | "no-answer" | "callback") => {
    setKpis((prev) => ({
      ...prev,
      callsMade: prev.callsMade + 1,
      leadsGenerated: outcome === "success" ? prev.leadsGenerated + 1 : prev.leadsGenerated,
      promisingLeads: outcome === "callback" ? prev.promisingLeads + 1 : prev.promisingLeads,
    }))
  }

  const downloadData = (format: "pdf" | "excel") => {
    console.log(`Downloading data as ${format}...`)
    // Mock download functionality
    alert(`Downloading data as ${format.toUpperCase()}...`)
  }

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-serif font-bold text-primary">Nitty Gritty Investments</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-full text-destructive">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Users className="h-4 w-4" />
                Team
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <BarChart3 className="h-4 w-4" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Welcome Section */}
        <Card className="shadow-md border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {userData.name}!</CardTitle>
            <CardDescription className="text-base">
              {userData.department} • {userData.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleClockToggle}
                className={`flex-1 min-w-[140px] gap-2 ${
                  isClockedIn ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                }`}
              >
                <Clock className="h-4 w-4" />
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <UtensilsCrossed className="h-4 w-4" />
                <Label htmlFor="lunch-toggle" className="cursor-pointer">
                  Lunch Break
                </Label>
                <Switch id="lunch-toggle" checked={isOnLunch} onCheckedChange={setIsOnLunch} />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Current Time: {currentTime}</span>
              {isClockedIn && (
                <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-medium">
                  Active
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Calls Made
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{kpis.callsMade}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Leads Generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{kpis.leadsGenerated}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Emails Sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{kpis.emailsSent}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Promising Leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{kpis.promisingLeads}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cold Calling Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Cold Calling
            </CardTitle>
            <CardDescription>Log your call outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleCallOutcome("success")}
                className="flex-1 min-w-[140px] gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="h-4 w-4" />
                Success
              </Button>
              <Button
                onClick={() => handleCallOutcome("no-answer")}
                variant="destructive"
                className="flex-1 min-w-[140px] gap-2"
              >
                <XCircle className="h-4 w-4" />
                No Answer
              </Button>
              <Button
                onClick={() => handleCallOutcome("callback")}
                variant="outline"
                className="flex-1 min-w-[140px] gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <AlertCircle className="h-4 w-4" />
                Callback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Notes */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Daily Notes
            </CardTitle>
            <CardDescription>Track your daily activities and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your notes for today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] rounded-lg resize-none"
            />
            <Button className="mt-3 bg-primary hover:bg-primary/90">Save Notes</Button>
          </CardContent>
        </Card>

        {/* Download Data */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Data
            </CardTitle>
            <CardDescription>Download your performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => downloadData("pdf")} variant="outline" className="flex-1 min-w-[140px] gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={() => downloadData("excel")} variant="outline" className="flex-1 min-w-[140px] gap-2">
                <Download className="h-4 w-4" />
                Download Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-4 pt-4">
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </Button>
          <Button variant="ghost" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </Button>
          <Button variant="ghost" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Nitty Gritty Investments. All rights reserved.</p>
          <p className="mt-1 text-xs">Have a productive day</p>
        </div>
      </footer>
    </div>
  )
}
