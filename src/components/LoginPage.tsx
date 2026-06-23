/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  User 
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (studentName: string, studentEmail: string) => void;
}

interface Account {
  name: string;
  email: string;
  password: string;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Seed default databases in localStorage
  useEffect(() => {
    try {
      const existing = localStorage.getItem("studyMateAccounts");
      if (!existing) {
        const defaultAccounts: Account[] = [
          { name: "Guest Student", email: "guest@studymate.ai", password: "password123" },
          { name: "SaaS Evaluator", email: "reviewer@university.edu", password: "password123" }
        ];
        localStorage.setItem("studyMateAccounts", JSON.stringify(defaultAccounts));
      }
    } catch (e) {
      console.warn("Storage access failed: Cannot seed logins database", e);
    }
  }, []);

  const getAccounts = (): Account[] => {
    try {
      const saved = localStorage.getItem("studyMateAccounts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveAccounts = (accounts: Account[]) => {
    try {
      localStorage.setItem("studyMateAccounts", JSON.stringify(accounts));
    } catch (e) {
      console.error("Failed to write to accounts database", e);
    }
  };

  const presetStudents = [
    { name: "Guest Student", email: "guest@studymate.ai" },
    { name: "SaaS Evaluator", email: "reviewer@university.edu" }
  ];

  const handlePresetClick = (name: string, emailStr: string) => {
    setErrorMsg("");
    setSuccessMsg("");
    setFullname(name);
    setEmail(emailStr);
    setPassword("password123");
    setMode("signin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const normalizedEmail = email.trim().toLowerCase();
    const finalPassword = password.trim();
    const finalName = fullname.trim();

    if (!normalizedEmail || !finalPassword) {
      setErrorMsg("Please provide both email address and password.");
      return;
    }

    if (mode === "signup" && !finalName) {
      setErrorMsg("Please enter your full name to register.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const accounts = getAccounts();

      if (mode === "signup") {
        // Sign Up Flow
        const existingUser = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
        if (existingUser) {
          setErrorMsg("An account with this email already exists. Please Sign In.");
          return;
        }

        const newAccount: Account = {
          name: finalName,
          email: normalizedEmail,
          password: finalPassword,
        };

        const updated = [...accounts, newAccount];
        saveAccounts(updated);

        setSuccessMsg(`Welcome, ${finalName}! Your account has been registered successfully.`);
        
        // Auto sign them in after a brief pause
        setTimeout(() => {
          onLoginSuccess(finalName, normalizedEmail);
        }, 1500);

      } else {
        // Sign In Flow
        const matched = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
        if (!matched) {
          setErrorMsg("Account does not exist. Please sign up above first!");
          return;
        }

        if (matched.password !== finalPassword) {
          setErrorMsg("Password mismatch! Please check your credentials and try again.");
          return;
        }

        // Success
        onLoginSuccess(matched.name, matched.email);
      }
    }, 1200);
  };

  const handleModeSwitch = (newMode: "signin" | "signup") => {
    setErrorMsg("");
    setSuccessMsg("");
    // Keep email or fields if convenient, clear error contexts
    setMode(newMode);
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

        {/* Dynamic Mode Switch Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4 max-w-full relative">
          <button
            onClick={() => handleModeSwitch("signin")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === "signin" 
                ? "bg-slate-900 border border-slate-800 text-white shadow-lg" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In Account
          </button>
          <button
            onClick={() => handleModeSwitch("signup")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === "signup" 
                ? "bg-slate-900 border border-slate-800 text-white shadow-lg" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register / Sign Up
          </button>
        </div>

        {/* Login/Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md relative"
        >
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-6">
            <div className="text-left">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {mode === "signin" ? "Academic Sign In" : "Register Credentials"}
              </h2>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {mode === "signin" 
                  ? "Enter your email and passcode to verify credentials." 
                  : "Sign up to register a persistent mock session account."
                }
              </p>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-sm border border-cyan-500/20 font-bold font-mono tracking-wider shrink-0 self-start">
              {mode === "signin" ? "SIGN IN" : "SIGN UP"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Show Full Name field in Sign Up Mode */}
            <AnimatePresence initial={false}>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: "1rem" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required={mode === "signup"}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="e.g. Professor Reviewer"
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3.5 pl-4 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-500 text-slate-100"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Email Address</label>
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Secret password</label>
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

            {/* Error Message Box */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="flex items-start gap-2.5 text-xs text-rose-455 bg-rose-950/20 border border-rose-900/30 p-3 rounded-xl mt-2"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span className="text-rose-300 font-medium leading-normal text-left">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message Box */}
            <AnimatePresence>
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="flex items-start gap-2.5 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl mt-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium leading-normal text-left">{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  {mode === "signin" ? "Authorizing node..." : "Registering Account..."}
                </>
              ) : (
                <>
                  {mode === "signin" ? <LogIn className="w-4 h-4 text-cyan-200" /> : <UserPlus className="w-4 h-4 text-cyan-200" />}
                  {mode === "signin" ? "Request Access credentials" : "Create Account & Sign In"}
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
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
                  <div className="text-left leading-none">
                    <span className="block font-black text-slate-200">{stud.name}</span>
                    <span className="text-[9px] text-slate-500 font-medium block mt-0.5 font-mono">{stud.email}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Assistant Info / Mode Switch advice */}
          <div className="mt-5 text-center">
            {mode === "signin" ? (
              <span className="text-xs text-slate-400 font-medium">
                Don't have an account?{" "}
                <button
                  onClick={() => handleModeSwitch("signup")}
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
                >
                  Sign Up / Register Now
                </button>
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Already registered?{" "}
                <button
                  onClick={() => handleModeSwitch("signin")}
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
                >
                  Sign In to Account
                </button>
              </span>
            )}
          </div>

        </motion.div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-500 mt-6 font-mono leading-relaxed">
          &copy; {new Date().getFullYear()} StudyMate AI Platform Security Guard Node. <br />
          Accounts persist securely in client context local storage.
        </p>

      </div>
    </div>
  );
}
