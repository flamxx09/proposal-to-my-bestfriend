"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import RainEffect from "@/components/RainEffect"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"
import FloatingHearts from "@/components/FloatingHearts"
import Music from "@/components/Music"
import { questionOne, questionTwo } from "@/data"

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const nextScreen = (screen) => {
    if (!musicStarted) {
      setMusicStarted(true)
    }
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950/30 via-black/70 to-rose-950/40 relative overflow-hidden">

      {/* Dots background */}
      <div className="fixed inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

      {/* Radial gradients for background */}
      <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 25%, rgba(75, 0, 79, 0.6), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 80% 80%, rgba(77, 2, 24, 0.6), transparent 40%)",
      }} />

      <div className="fixed inset-0 z-0 blur-[140px] opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(80, 0, 92, 0.5), transparent 40%)",
      }} />

      {!isLoading && <RainEffect />}

      <FloatingHearts />

      <Music shouldPlay={musicStarted} />

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}

        {currentScreen === "question1" && (
          <QuestionScreen
            key="question1"
            question={questionOne}
            onYes={() => nextScreen("question2")}
            isFirst={true}
          />
        )}

        {currentScreen === "question2" && (
          <QuestionScreen
            key="question2"
            question={questionTwo}
            onYes={() => nextScreen("balloons")}
            isFirst={false}
          />
        )}

        {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}

        {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}

        {currentScreen === "final" && <FinalScreen key="final" />}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        @anujbuilds
      </motion.div>
    </div>
  )
}
