"use client"

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary typewriter inline-block mb-6">
          Nitty Gritty Investments
        </h1>
        <p className="text-muted-foreground text-lg mt-8 animate-fade-in-up [animation-delay:3s]">
          Have a productive day
        </p>
      </div>
    </div>
  )
}
