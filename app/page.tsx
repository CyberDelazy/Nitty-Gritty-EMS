"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "login" | "dashboard">("splash")
  const [userData, setUserData] = useState<{
    name: string
    email: string
    department: string
  } | null>(null)

  useEffect(() => {
    // Show splash screen for 4 seconds
    const timer = setTimeout(() => {
      setCurrentScreen("login")
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (name: string, email: string, department: string) => {
    setUserData({ name, email, department })
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setUserData(null)
    setCurrentScreen("login")
  }

  return (
    <>
      {currentScreen === "splash" && <SplashScreen />}
      {currentScreen === "login" && <LoginPage onLogin={handleLogin} />}
      {currentScreen === "dashboard" && userData && <Dashboard userData={userData} onLogout={handleLogout} />}
    </>
  )
}
