/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import { generateDynamicSummary } from "../data";
import { parseSimpleMarkdown } from "../utils";

export default function NotesSummarizer() {
  const [inputText, setInputText] = useState("");
  const [summaryOutput, setSummaryOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Predefined Sample to help users test instantly
  const sampleNote = `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving. Machine Learning is a vital subset of AI that focuses on building systems that learn from data inputs. Deep Learning, another layer down, maps layered structures modeled directly after structural natural cerebral systems (known as Neural Networks). Database management systems and robust networks form the primary pipeline for transporting training records safely at scale.`;

  const handleLoadSample = () => {
    setInputText(sampleNote);
    setErrorMsg("");
  };

  const handleSummarize = () => {
    if (!inputText || inputText.trim().length < 15) {
      setErrorMsg("⚠️ Please provide a detailed paragraph of notes (at least 15 characters) so StudyMate AI can build a robust cognitive outline.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);

    // Simulate high-tech Deep Learning compilation pipeline
    setTimeout(() => {
      const summary = generateDynamicSummary(inputText);
      setSummaryOutput(summary);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryOutput.replace(/[#*`]/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="summarizer" className="py-20 relative overflow-hidden bg-slate-950/20">
      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Core Module
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white">
            AI Notes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Summarizer</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Input textbook chapters, class recordings, or notes, and allow our text-mapping algorithms to synthesize high-yield summaries instantly.
          </p>
        </div>

        {/* Workspace Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Input Study Material
                </label>
                <button
                  onClick={handleLoadSample}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-400/5 border border-cyan-400/20 hover:border-cyan-400/40 px-2.5 py-1 rounded-lg transition-all active:scale-[0.97] cursor-pointer"
                >
                  Load Sample Code/Theory
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value.trim().length >= 15) setErrorMsg("");
                }}
                placeholder="Paste your heavy course notes here (minimum 15 characters)..."
                className="w-full h-64 p-4 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-slate-100 placeholder-slate-500 text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500 resize-none font-sans font-medium transition-colors"
              />

              {errorMsg && (
                <div className="mt-3 flex items-start gap-2 text-xs text-rose-400 bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 border-t border-slate-800/60 pt-4">
                <span className="text-xs text-slate-500 font-mono">
                  Character count: {inputText.length}
                </span>
                <button
                  onClick={handleSummarize}
                  disabled={isLoading}
                  id="btn-summarize-notes"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shrink-0 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-indigo-500/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      Summarize Notes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Outputs Panel (Glassmorphism card) */}
          <div className="lg:col-span-6 relative">
            <div className={`p-5 rounded-2xl md:min-h-75.5 relative overflow-hidden transition-all duration-300 ${
              summaryOutput 
                ? "bg-gradient-to-b from-indigo-950/30 to-purple-950/20 border-indigo-500/30" 
                : "bg-slate-900/40 border-slate-800/80"
            } border shadow-xl backdrop-blur-md`}>
              
              {/* Dynamic Overlay Loader during processing */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative w-16 h-16 mb-4">
                      {/* Floating spinning ring */}
                      <div className="absolute inset-0 border-3 border-indigo-500/10 rounded-full" />
                      <div className="absolute inset-0 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <Sparkles className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-wide">Processing Text Integrity...</h4>
                    <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed font-mono">
                      Extracting linguistic entities, filtering common syntax nodes, and structuring summary bulletins.
                    </p>
                    
                    {/* Visual Loading bar */}
                    <div className="w-48 h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Outputs Content Container */}
              <div className="flex flex-col h-full">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4 shrink-0">
                  <span className="text-xs font-extrabold text-cyan-400 tracking-wider uppercase font-mono">
                    AI Summary Worksheet
                  </span>
                  {summaryOutput && (
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-semibold px-2 py-1 rounded bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Summary
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto max-h-[350px] pr-2">
                  {summaryOutput ? (
                    <div 
                      className="prose prose-invert text-slate-300 font-sans leading-relaxed selection:bg-indigo-500/30 select-text"
                      dangerouslySetInnerHTML={{ __html: parseSimpleMarkdown(summaryOutput) }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16 text-slate-500">
                      <BookOpen className="w-12 h-12 text-slate-700 mb-3 animate-[bounce_3s_infinite]" />
                      <p className="text-sm font-semibold max-w-xs">No active outline has been compiled yet.</p>
                      <p className="text-xs text-slate-600 mt-1 max-w-xs">Type or load sample material to execute summarizer engine calculations.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
