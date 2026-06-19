/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { BookOpen, HelpCircle, Layers, CalendarRange, MessageSquare } from "lucide-react";

interface AboutCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  id: string;
}

const features: AboutCard[] = [
  {
    id: "about_notes",
    title: "AI Note Summarization",
    description: "Instantly condense lengthy textbooks or lecture transcripts into digestible, high-yield bulleted parameters and structural takeaways.",
    icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
    color: "from-indigo-500/10 to-indigo-500/5 hover:border-indigo-500/40"
  },
  {
    id: "about_quizzes",
    title: "Smart Quiz Generation",
    description: "Challenge yourself with interactive 5-MCQ dynamic diagnostics across core engineering subjects with automatic grading and performance reviews.",
    icon: <HelpCircle className="w-6 h-6 text-cyan-400" />,
    color: "from-cyan-500/10 to-cyan-500/5 hover:border-cyan-500/40"
  },
  {
    id: "about_flashcards",
    title: "Interactive Flashcards",
    description: "Harness standard cognitive psychological models of active recall with elegant 3D card-flippers that reinforce fragile definitions.",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500/10 to-purple-500/5 hover:border-purple-500/40"
  },
  {
    id: "about_planning",
    title: "Personalized Study Planning",
    description: "Convert chaotic exam dates into dynamic chronologies broken down into hours-per-day, structured with revision guides and diagnostic timelines.",
    icon: <CalendarRange className="w-6 h-6 text-indigo-400" />,
    color: "from-indigo-500/10 to-indigo-500/5 hover:border-purple-500/40"
  },
  {
    id: "about_doubt",
    title: "AI Doubt Assistance",
    description: "Clear your academic bottlenecks instantly with a continuous responsive chatbot ready to address complex SQL, Networks, and DSA queries.",
    icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
    color: "from-cyan-500/10 to-cyan-500/5 hover:border-indigo-500/40"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative bg-slate-900/40 backdrop-blur-md border-y border-slate-800/40 overflow-hidden">
      
      {/* Visual backdrops */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            Powering Your Academic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Trajectory
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed"
          >
            StudyMate AI incorporates advanced educational heuristics, spacing mechanisms, and user-centric structures to help computer science and engineering students excel.
          </motion.p>
        </div>

        {/* Feature Bento-style Grid / Responsive Flex */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.id}
              id={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-b ${feat.color} border border-slate-800/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col space-y-4 shadow-lg backdrop-blur-xs group`}
            >
              {/* Card Icon Header */}
              <div className="p-3 w-fit rounded-xl bg-slate-950/80 border border-slate-800 ring-1 ring-white/5 transition-transform group-hover:scale-110">
                {feat.icon}
              </div>

              {/* Title & Desc */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Subtle learn indicator inside margins */}
              <div className="pt-2 flex items-center text-xs font-bold text-indigo-400/80 group-hover:text-indigo-300 transition-colors self-start select-none">
                Interactive Tool Enabled
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
