/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Sparkles, HelpCircle, RefreshCw, Eye } from "lucide-react";
import { FlashcardsData, Flashcard } from "../data";

export default function FlashcardsSection() {
  const subjects = ["All", "AI & ML", "Python", "DBMS"];
  const [selectedSubject, setSelectedSubject] = useState("All");
  
  // Track flipped state of cards (key: cardId, value: boolean)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleToggleFlip = (cardId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleResetFlips = () => {
    setFlippedCards({});
  };

  const filteredCards = selectedSubject === "All"
    ? FlashcardsData
    : FlashcardsData.filter(fc => fc.subject === selectedSubject);

  return (
    <section id="flashcards" className="py-20 relative overflow-hidden bg-slate-950/20">
      
      {/* Visual backdrops */}
      <div className="absolute top-1/4 left-[-15%] w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-15%] w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" /> Revision Deck
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white">
            Smart Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Flashcards</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
            Reinforce key computer science topics using targeted active recall. Click any card to execute a fluid 3D card-flip rotation and display high-yield answers.
          </p>
        </div>

        {/* Filters and resets bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10 border-b border-slate-800/60 pb-6">
          {/* Subjects Tabs */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubject === sub
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/10"
                    : "bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <button
            onClick={handleResetFlips}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Card Orientations
          </button>
        </div>

        {/* 3D Flashcard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((fc, index) => {
              const isFlipped = !!flippedCards[fc.id];
              return (
                <motion.div
                  key={fc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="h-64 perspective-1000 cursor-pointer select-none group"
                  onClick={() => handleToggleFlip(fc.id)}
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    
                    {/* CARD FRONT SIDE (Question) */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between backface-hidden shadow-xl group-hover:border-purple-500/40 hover:shadow-2xl transition-all">
                      
                      {/* Subtitle / Subject */}
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-2 shrink-0">
                        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
                          {fc.subject} Core
                        </span>
                        <HelpCircle className="w-4 h-4 text-purple-500 animate-[bounce_3s_infinite]" />
                      </div>

                      {/* Main Question Text */}
                      <div className="my-auto flex flex-col justify-center items-center text-center">
                        <p className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-relaxed max-w-xs px-2">
                          {fc.question}
                        </p>
                      </div>

                      {/* Card Footer Click Indicator */}
                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-extrabold uppercase font-mono mt-2 select-none group-hover:text-purple-400 self-center">
                        <Eye className="w-3.5 h-3.5 shrink-0" /> Click To Reveal Answer
                      </div>

                    </div>


                    {/* CARD BACK SIDE (Answer - Rotated y by 180 degrees) */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-purple-950/20 via-slate-950 to-indigo-950/20 border border-purple-500/30 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
                      
                      {/* Subtitle Header */}
                      <div className="flex items-center justify-between border-b border-purple-500/10 pb-3 mb-2 shrink-0">
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                          AI Verification Key
                        </span>
                        <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                      </div>

                      {/* Answer response */}
                      <div className="my-auto overflow-y-auto max-h-[120px] pr-1 flex flex-col justify-center">
                        <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed leading-[1.6]">
                          {fc.answer}
                        </p>
                      </div>

                      {/* Footer back indicator */}
                      <div className="flex items-center justify-center gap-1 text-[9px] text-purple-300/80 font-bold uppercase font-mono mt-2 select-none">
                        Click Card to Hide
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
