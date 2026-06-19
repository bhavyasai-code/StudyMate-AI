/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, CheckCircle, BookOpen, Clock, Play, Award, Sparkles } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
}

function AnimatedCounter({ end, duration = 1.2 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endCount = end;
    if (start === endCount) return;

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / endCount), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endCount) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="font-mono">{count}</span>;
}

export default function DashboardSection() {
  const [notesSummarized, setNotesSummarized] = useState(12);
  const [quizzesCompleted, setQuizzesCompleted] = useState(8);
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(45);
  const [hoursTracked, setHoursTracked] = useState(24);

  // Gamified interaction toast triggering
  const [toastMessage, setToastMessage] = useState("");
  
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const incrementMetric = (type: "notes" | "quiz" | "flashcard" | "hours") => {
    if (type === "notes") {
      setNotesSummarized(prev => prev + 1);
      triggerToast("📚 Notes summarizing log metric registered in telemetry dashboard!");
    } else if (type === "quiz") {
      setQuizzesCompleted(prev => prev + 1);
      triggerToast("🎯 Quiz session logged! Diagnostic score cached successfully.");
    } else if (type === "flashcard") {
      setFlashcardsReviewed(prev => prev + 5);
      triggerToast("⚡ Active Recall: Reviewed +5 additional flashcards!");
    } else if (type === "hours") {
      setHoursTracked(prev => prev + 1);
      triggerToast("⏱️ Study tracker updated: Allotted +1 hour of active focus.");
    }
  };

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden bg-slate-900/40">
      
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" /> Growth Dashboard
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white font-sans">
            Your Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Dashboard</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Monitor revision streaks and diagnostic scoring telemetry. Click the active increment buttons to dynamically log custom study achievements.
          </p>
        </div>

        {/* Dashboard Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Notes Summarized */}
          <div className="p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between h-56 relative group hover:border-indigo-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">Lectures Condenses</span>
                <BookOpen className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter end={notesSummarized} />
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">Summarized academic files</p>
              </div>
            </div>
            
            <button
               onClick={() => incrementMetric("notes")}
               className="w-full text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 hover:text-white bg-indigo-500/5 hover:bg-indigo-600 border border-indigo-500/20 py-2 rounded-xl transition-all select-none cursor-pointer"
            >
              Log Summarized Unit
            </button>
          </div>

          {/* Card 2: Quizzes Completed */}
          <div className="p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between h-56 relative group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">Assigned Testing</span>
                <CheckCircle className="w-4.5 h-4.5 text-cyan-400" />
              </div>
              <div className="text-left">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter end={quizzesCompleted} />
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">Diagnostic quizzes finished</p>
              </div>
            </div>
            
            <button
               onClick={() => incrementMetric("quiz")}
               className="w-full text-[10px] uppercase tracking-wider font-extrabold text-cyan-400 hover:text-white bg-cyan-500/5 hover:bg-cyan-600 border border-cyan-500/20 py-2 rounded-xl transition-all select-none cursor-pointer"
            >
              Log Diagnostic Quiz
            </button>
          </div>

          {/* Card 3: Flashcards Reviewed */}
          <div className="p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between h-56 relative group hover:border-purple-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">Recall Drills</span>
                <Layers className="w-4.5 h-4.5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter end={flashcardsReviewed} />
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed font-sans">Definitions correctly flipped</p>
              </div>
            </div>
            
            <button
               onClick={() => incrementMetric("flashcard")}
               className="w-full text-[10px] uppercase tracking-wider font-extrabold text-purple-400 hover:text-white bg-purple-500/5 hover:bg-purple-600 border border-purple-500/20 py-2 rounded-xl transition-all select-none cursor-pointer"
            >
              Log +5 Flashcards
            </button>
          </div>

          {/* Card 4: Study Hours Tracked */}
          <div className="p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between h-56 relative group hover:border-indigo-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">Cognitive Sprints</span>
                <Clock className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter end={hoursTracked} /> hrs
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">Dedicated focus periods</p>
              </div>
            </div>
            
            <button
               onClick={() => incrementMetric("hours")}
               className="w-full text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 hover:text-white bg-indigo-500/5 hover:bg-indigo-600 border border-indigo-500/20 py-2 rounded-xl transition-all select-none cursor-pointer"
            >
              Log Focused Hour
            </button>
          </div>

        </div>

        {/* Gamified feedback notifications toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-slate-100 shadow-2xl flex items-center gap-3.5 max-w-sm backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 uppercase tracking-widest shadow-inner">
                <Sparkles className="w-4 h-4 animate-pulse text-cyan-400" />
              </div>
              <p className="text-xs font-bold leading-normal text-left">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
