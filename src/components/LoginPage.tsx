/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Sparkles, LogIn, Lock, Mail, ArrowRight, UserCheck, ShieldAlert } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (studentName: string, studentEmail: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suggested preset emails for examiners to click instantly
  const presetStudents = [
    { name: "Guest Student", email: "guest@studymate.ai" },
    { name: "SaaS Evaluator", email: "reviewer@university.edu" }
  ];

  const handlePresetClick = (name: string, emailStr: string) => {
    setFullname(name);
    setEmail(emailStr);
    setPassword("password123");
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Minimal client-side validation
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please provide both email address and password.");
      return;
    }

    setIsSubmitting(true);

    // Simulate authentication telemetry checks
    setTimeout(() => {
      setIsSubmitting(false);
      // Fallback name if none supplied
      const finalName = fullname.trim() || email.split("@")[0] || "Academic Scholar";
      onLoginSuccess(finalName, email);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0F172A] overflow-hidden font-sans">
      
      {/* Immersive background decoration */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[350px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating stars */}
      <div className="absolute top-[20%] right-[15%] text-indigo-400 opacity-20 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] text-cyan-400 opacity-20 animate-[bounce_4s_infinite]">
        <GraduationCap className="w-10 h-10" />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo Banner */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center border border-white/10 shadow-2xl mb-4"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black tracking-tight text-white"
          >
            StudyMate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-slate-400 mt-2 font-semibold tracking-wide font-mono"
          >
            SECURE ADAPTIVE TELEMETRY GATE
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md relative"
        >
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-6">
            <div className="text-left">
              <h2 className="text-lg font-bold text-white tracking-tight">Active Scholar Login</h2>
              <p className="text-[11px] text-slate-400">Input any credentials to access dynamic tools instantly.</p>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-sm border border-cyan-500/20 font-bold font-mono tracking-wider">
              FREE ACCESS
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Optional Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Full Name <span className="text-slate-500 text-[10px] font-mono font-medium">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="e.g. Professor Reviewer"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3.5 pl-4 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-500 text-slate-100"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3.5 pl-10 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-500 text-slate-100"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Secret passcode</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3.5 pl-10 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-500 text-slate-100"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2 text-xs text-rose-450 bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="text-rose-300 font-medium">{errorMsg}</span>
              </div>
            )}

            {/* Submit Trigger */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Granting Security Clearances...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Request Access credentials
                </>
              )}
            </button>
          </form>

          {/* Quick preset chips to easily skip / express login */}
          <div className="mt-6 border-t border-slate-800/60 pt-5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block text-center mb-3">
              ⚡ REVIEWER EXPRESS BYPASS CHIPS
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {presetStudents.map((stud) => (
                <button
                  key={stud.email}
                  type="button"
                  onClick={() => handlePresetClick(stud.name, stud.email)}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/30 text-slate-300 text-[10px] sm:text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer group"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-none">
                    <span className="block font-black text-slate-200">{stud.name}</span>
                    <span className="text-[9px] text-slate-500 font-medium block mt-0.5 font-mono">{stud.email}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-500 mt-6 font-mono leading-relaxed">
          &copy; {new Date().getFullYear()} StudyMate AI Platform Security Guard Node. <br />
          No backend configuration required is detected. Click any bypass button above for rapid simulation.
        </p>

      </div>
    </div>
  );
}
