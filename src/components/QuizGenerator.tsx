/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, ListChecks } from "lucide-react";
import { QuizBank, QuizQuestion } from "../data";

export default function QuizGenerator() {
  const subjects = ["AI & ML", "Python", "DBMS", "Data Structures", "Computer Networks"];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState<"setup" | "active" | "results">("setup");
  
  // Track selected answers (key: questionId, value: optionIndex)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate quiz: slice 5 questions corresponding to chosen subject
  const handleGenerateQuiz = () => {
    const filtered = QuizBank.filter((q) => q.subject === selectedSubject);
    // Shuffle slightly or sort to make sure we gather 5 questions
    setActiveQuestions(filtered.slice(0, 5));
    setAnswers({});
    setActiveQuestionIndex(0);
    setCurrentStep("active");
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < activeQuestions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    setIsSubmitting(true);
    // Mimic evaluation wait
    setTimeout(() => {
      setCurrentStep("results");
      setIsSubmitting(false);
    }, 1200);
  };

  const handleRestart = () => {
    setCurrentStep("setup");
    setAnswers({});
    setActiveQuestionIndex(0);
  };

  const currentQuestion = activeQuestions[activeQuestionIndex];
  const isQuestionAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const unansweredCount = activeQuestions.filter((q) => answers[q.id] === undefined).length;

  return (
    <section id="quiz" className="py-20 relative overflow-hidden bg-slate-900/20">
      
      {/* Ambient glowing circles */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-cyan-600/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Assessment Hub
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white">
            Smart Quiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Generator</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Configure dynamic 5-MCQ evaluations across core computer science tracks. Complete exercises to earn virtual diagnostic telemetry feedback.
          </p>
        </div>

        {/* Outer Diagnostic Containercard */}
        <div className="max-w-3xl mx-auto">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Quiz Configuration Setup */}
            {currentStep === "setup" && (
              <motion.div
                key="setup-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-2.5xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md text-center max-w-xl mx-auto"
              >
                <div className="p-4 w-16 h-16 bg-gradient-to-tr from-cyan-500/15 to-indigo-500/15 border border-cyan-500/30 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-inner">
                  <ListChecks className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Initialize AI Diagnostics</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                  Select your core course of study. StudyMate AI will assemble 5 diagnostic multiple-choice items optimized for your selected area.
                </p>

                {/* Styled Dropdown selection */}
                <div className="space-y-2 text-left mb-8 max-w-xs mx-auto">
                  <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Choose Subject Core</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-sm font-bold p-3.5 rounded-xl outline-hidden transition-colors cursor-pointer"
                  >
                    {subjects.map((subj) => (
                      <option key={subj} value={subj} className="bg-slate-950 text-slate-200 py-2">
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerateQuiz}
                  id="btn-generate-quiz"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mx-auto active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-4.5 h-4.5 text-cyan-100" />
                  Generate Quiz
                </button>
              </motion.div>
            )}

            {/* STEP 2: Active Testing Screen */}
            {currentStep === "active" && currentQuestion && (
              <motion.div
                key="active-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-2.5xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md"
              >
                
                {/* Header Info Panel */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-cyan-400 font-extrabold tracking-widest uppercase font-mono">
                      Evaluating: {selectedSubject}
                    </span>
                    <span className="text-lg font-bold text-white mt-0.5">
                      Question {activeQuestionIndex + 1} of {activeQuestions.length}
                    </span>
                  </div>
                  
                  {/* Small progress index dot row */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    {activeQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === activeQuestionIndex
                            ? "bg-cyan-400 scale-120 shadow-xs shadow-cyan-400"
                            : answers[activeQuestions[idx].id] !== undefined
                            ? "bg-indigo-500"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                    style={{ width: `${((activeQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {/* Option Grid */}
                <div className="grid grid-cols-1 gap-3.5 mb-8">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQuestion.id, idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                          isSelected
                            ? "bg-cyan-950/30 border-cyan-400 text-white shadow-xs shadow-cyan-400/10"
                            : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6.5 h-6.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center border shrink-0 transition-colors ${
                            isSelected
                              ? "bg-cyan-400 border-cyan-400 text-slate-950"
                              : "bg-slate-900 border-slate-800 text-slate-400 group-hover:border-slate-700"
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        
                        {/* Selector indicator dot */}
                        <div className={`w-3.5 h-3.5 rounded-full border transition-all shrink-0 ${
                          isSelected ? "bg-cyan-400 border-cyan-400 scale-110" : "border-slate-700"
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation buttons */}
                <div className="flex items-center justify-between gap-4 border-t border-slate-800/60 pt-6">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={activeQuestionIndex === 0}
                    className="px-4 py-2.5 rounded-lg font-semibold text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer text-xs"
                  >
                    Previous Unit
                  </button>

                  <div className="flex items-center gap-3">
                    {activeQuestionIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 rounded-lg font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        Next Item
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishQuiz}
                        disabled={isSubmitting || unansweredCount > 0}
                        className={`px-6 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                          unansweredCount > 0
                            ? "bg-slate-800/40 border border-slate-800 text-slate-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-500/10"
                        }`}
                      >
                        {isSubmitting ? "Grading..." : `Submit Assessment`}
                      </button>
                    )}
                  </div>
                </div>

                {unansweredCount > 0 && (
                  <p className="text-center text-[11px] text-slate-500 mt-4 font-mono">
                    * You have {unansweredCount} unanswered questions remaining before final grading activates.
                  </p>
                )}

              </motion.div>
            )}

            {/* STEP 3: Quiz Scorecard Output */}
            {currentStep === "results" && (
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2.5xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md"
              >
                
                {/* Score Header Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-800/60 pb-8 mb-8">
                  
                  {/* Left Counter Circle */}
                  <div className="md:col-span-4 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-950/60 border-2 border-slate-850 shadow-inner">
                      {/* Interactive circular dash gradient boundary */}
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="rgba(30, 41, 59, 1)"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke={calculateScore() >= 3 ? "#06B6D4" : "#EF4444"}
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray="351.8"
                          strokeDashoffset={351.8 - (351.8 * (calculateScore() / 5))}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      
                      <div className="text-center z-10">
                        <span className="text-4xl font-extrabold text-white font-mono">{calculateScore()}</span>
                        <span className="text-lg text-slate-500 font-mono"> / 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Description Feedback */}
                  <div className="md:col-span-8 space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-cyan-300 text-[10px] font-extrabold uppercase font-mono tracking-wider">
                      <Trophy className="w-3 h-3 text-amber-400" /> Assessment Feedback
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {calculateScore() === 5
                        ? "Flawless Performance!"
                        : calculateScore() >= 3
                        ? "Competency Confirmed"
                        : "Focus Adjustment Mandated"}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
                      You scored **{(calculateScore() / 5) * 100}%** in **{selectedSubject}**. Look over the analytical breakdown below to reinforce key concept definitions.
                    </p>
                  </div>

                </div>

                {/* Question itemized review lists */}
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Detailed Question Breakdown</h4>
                
                <div className="space-y-4 mb-8">
                  {activeQuestions.map((q, qIndex) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correctAnswer;
                    
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-left bg-slate-950/40 shadow-sm ${
                          isCorrect ? "border-emerald-500/25 bg-emerald-950/5" : "border-rose-500/25 bg-rose-950/5"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-100 leading-normal">
                              Q{qIndex + 1}: {q.question}
                            </h5>
                            
                            <p className="text-[11px] sm:text-xs text-slate-400">
                              Your selection:{" "}
                              <span className={`font-semibold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                                {q.options[userAns] || "None selected"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-[11px] sm:text-xs text-slate-400">
                                Correct option:{" "}
                                <span className="font-semibold text-emerald-400">
                                  {q.options[q.correctAnswer]}
                                </span>
                              </p>
                            )}

                            {/* Bulletproof reasoning explanations */}
                            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-2 bg-slate-900/60 p-2 rounded border border-slate-800/40 italic">
                              <span className="font-semibold tracking-wider uppercase text-cyan-500 block not-italic text-[9px] mb-0.5">Explanation</span>
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Restart actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800/60">
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Configure New Quiz
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
