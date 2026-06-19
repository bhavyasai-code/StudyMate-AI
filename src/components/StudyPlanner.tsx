/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Sparkles, BookOpen, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";
import { generateStudyPlan, ScheduleDay } from "../utils";

export default function StudyPlanner() {
  const [examDate, setExamDate] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [timetable, setTimetable] = useState<ScheduleDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Set default sample state
  const handleLoadDefaults = () => {
    // Current date + 5 days
    const target = new Date();
    target.setDate(target.getDate() + 5);
    const dateStr = target.toISOString().split("T")[0];
    setExamDate(dateStr);
    setSubjectName("Distributed Systems DBMS");
    setHoursPerDay(4);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      alert("Please specify a Subject Name to customize your dashboard timelines.");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate complex spacing optimization modeling
    setTimeout(() => {
      const plan = generateStudyPlan(subjectName, examDate, hoursPerDay);
      setTimetable(plan);
      setIsGenerating(false);
    }, 1300);
  };

  return (
    <section id="planner" className="py-20 relative overflow-hidden bg-slate-900/20">
      
      {/* Visual background lights */}
      <div className="absolute bottom-1/4 left-[-10%] w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" /> Chrono Module
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white">
            AI Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Planner</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Convert static test deadlines into dynamic interactive chronologies. Distribute priority tasks according to available daily cognitive hours.
          </p>
        </div>

        {/* Form and Timeline Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Form container */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                  Calendar Settings
                </h3>
                <button
                  type="button"
                  onClick={handleLoadDefaults}
                  className="text-[10px] font-extrabold text-purple-400 hover:text-purple-300 transition-colors uppercase font-mono tracking-wider cursor-pointer"
                >
                  Load Sample
                </button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4 text-left">
                {/* Subject Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Subject or Theme Name</label>
                  <input
                    type="text"
                    required
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g. Distributed Databases, Compiler Design"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Exam Date selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Target Exam Date</label>
                  <input
                    type="date"
                    required
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors text-slate-300"
                  />
                </div>

                {/* Study Hours selection slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Study Hours Per Day</label>
                    <span className="text-xs font-extrabold font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-sm">
                      {hoursPerDay} hrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1 hr</span>
                    <span>10 hrs (Heavy Sprint)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-generate-plan"
                  className="w-full py-3.5 mt-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Spacing Milestones...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      Generate Study Plan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Timeline display cards */}
          <div className="lg:col-span-8 relative">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl backdrop-blur-md min-h-[400px] flex flex-col">
              
              {/* Header inside timelines container */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-extrabold text-cyan-400 tracking-wider uppercase font-mono">
                  Personalized Active Calendar
                </span>
                {timetable.length > 0 && (
                  <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-sm border border-slate-700/60 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {timetable.length} Stages Prepared
                  </span>
                )}
              </div>

              {/* Loader overlay */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-15 flex flex-col items-center justify-center p-6 text-center rounded-2xl"
                  >
                    <Clock className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
                    <h4 className="text-sm font-bold text-white tracking-wide">Calculating Spaced Recovery Intervals...</h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-xs leading-relaxed font-mono">
                      Allocated active recall slots and balancing fatigue offsets based on chosen study parameters.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Timeline slot outputs */}
              <div className="flex-1">
                {timetable.length > 0 ? (
                  <div className="relative border-l border-slate-800 space-y-8 pl-5 sm:pl-8 ml-2 sm:ml-4 py-3">
                    {timetable.map((day, dIdx) => (
                      <motion.div
                        key={day.dayNumber}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: dIdx * 0.1 }}
                        className="relative"
                      >
                        {/* Timeline Node dot */}
                        <div className="absolute left-[-29px] sm:left-[-41px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500/80 flex items-center justify-center shadow-md select-none">
                          <span className="text-[10px] font-black font-mono text-cyan-400">{day.dayNumber}</span>
                        </div>

                        {/* Timing Content card */}
                        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-indigo-500/30 transition-all shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-3 flex-1 text-left">
                            {/* Phase and Hours tag */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                {day.phase}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-cyan-400" /> Focus Target: {day.allottedHours} Hours
                              </span>
                            </div>

                            {/* Core Topics text */}
                            <h4 className="text-sm font-extrabold text-white tracking-tight leading-normal">
                              {day.focusTopic}
                            </h4>

                            {/* Task points lists */}
                            <div className="space-y-1.5 pt-1.5 border-t border-slate-800/40">
                              {day.tasks.map((task, tIdx) => (
                                <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Coach tip box on right aspect */}
                          <div className="sm:w-44 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 mt-2 sm:mt-0 text-left shrink-0">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1 mb-1 font-mono">
                              <AlertTriangle className="w-3 h-3 shrink-0" /> Coach Principle
                            </span>
                            <p className="text-[10px] text-slate-400 leading-normal italic font-medium">
                              "{day.tips}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 text-slate-500 my-auto">
                    <Calendar className="w-12 h-12 text-slate-700 mb-3 animate-[pulse_2s_infinite]" />
                    <p className="text-sm font-semibold max-w-xs">Timeline remains unconfigured.</p>
                    <p className="text-xs text-slate-600 mt-1 max-w-xs">
                      Set your subject names and study limits in the left parameters drawer to compile a dynamic chronology.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
