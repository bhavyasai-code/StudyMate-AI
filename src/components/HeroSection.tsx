/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, BookOpen, GraduationCap, Cpu, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

export default function HeroSection({ onGetStarted, onExploreFeatures }: HeroSectionProps) {
  const words = ["Better Understanding", "Faster Revision", "Smarter Preparations", "Personalized Timelines"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studyMateUser");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) {
          setStudentName(parsed.name);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const targetWord = words[currentWordIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === targetWord) {
      // Pause at the end of typing
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : targetWord.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIdx]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-wider uppercase self-center lg:self-start w-fit shadow-xs shadow-indigo-500/10 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              {studentName ? `Welcome back, ${studentName}!` : "Empowering Students with Web AI"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-current"
            >
              Study Smarter with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 font-extrabold block sm:inline">
                StudyMate AI
              </span>
            </motion.h1>

            {/* Dynamic Typing Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8 md:h-10 text-base sm:text-lg md:text-xl font-semibold text-cyan-400 flex items-center justify-center lg:justify-start"
            >
              <span>Designed for: </span>
              <span className="ml-2 font-mono border-r-2 border-cyan-400 pr-1 animate-pulse text-indigo-400 font-bold dark:text-cyan-400">
                {displayedText}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Your personal AI-powered learning companion for better understanding, faster revision, and smarter exam preparation. Let cognitive software boost your engineering scores.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onGetStarted}
                id="hero-btn-get"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExploreFeatures}
                id="hero-btn-explore"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-slate-700 hover:border-slate-500 text-current dark:text-white hover:bg-slate-800/20 transition-all flex items-center justify-center gap-2 group cursor-pointer backdrop-blur-xs"
              >
                Explore Features
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visuals: Animated floating icons & central core */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] flex items-center justify-center">
            
            {/* Core Neural Node Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, type: "spring" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-indigo-500/20 flex items-center justify-center bg-gradient-to-b from-indigo-500/5 to-transparent shadow-2xl"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
              
              {/* Spinning particle lines placeholder */}
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-dashed border-indigo-400/20 animate-[spin_30s_linear_infinite_reverse]" />

              {/* Glowing core */}
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/30 to-cyan-500/20 flex items-center justify-center ring-1 ring-white/10 shadow-inner">
                <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-400 animate-[pulse_2s_ease-in-out_infinite]" />
              </div>
            </motion.div>

            {/* Floating Visual Elements with custom delay animations */}
            <FloatingIcon
              icon={<BookOpen className="w-6 h-6 text-indigo-400" />}
              label="Note Summarizer"
              delay={0}
              coords="top-[10%] left-[10%] sm:left-[5%]"
            />
            <FloatingIcon
              icon={<GraduationCap className="w-6 h-6 text-cyan-400" />}
              label="Smart Quizzes"
              delay={1.5}
              coords="bottom-[15%] left-[5%] sm:left-[-5%]"
            />
            <FloatingIcon
              icon={<Cpu className="w-6 h-6 text-purple-400" />}
              label="Flashcards"
              delay={0.8}
              coords="top-[15%] right-[5%] sm:right-[-5%]"
            />
            <FloatingIcon
              icon={<Sparkles className="w-5 h-5 text-yellow-400" />}
              label="AI Doubts Bot"
              delay={2.2}
              coords="bottom-[10%] right-[10%] sm:right-[5%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

interface FloatingIconProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
  coords: string;
}

function FloatingIcon({ icon, label, delay, coords }: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + delay * 0.1, duration: 0.6 }}
      className={`absolute ${coords} z-20`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl"
      >
        <div className="p-1.5 rounded-lg bg-slate-800/80">
          {icon}
        </div>
        <span className="text-xs font-bold text-slate-200 hidden sm:inline select-none">{label}</span>
      </motion.div>
    </motion.div>
  );
}
