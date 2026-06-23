/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowUp, 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Calendar, 
  MessageSquare, 
  Award,
  LogOut,
  User
} from "lucide-react";

// Import Custom Modular Components
import LoginPage from "./components/LoginPage";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import NotesSummarizer from "./components/NotesSummarizer";
import QuizGenerator from "./components/QuizGenerator";
import FlashcardsSection from "./components/FlashcardsSection";
import StudyPlanner from "./components/StudyPlanner";
import DoubtAssistant from "./components/DoubtAssistant";
import DashboardSection from "./components/DashboardSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Auth local storage state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem("studyMateUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (nameStr: string, emailStr: string) => {
    const userObj = { name: nameStr, email: emailStr };
    localStorage.setItem("studyMateUser", JSON.stringify(userObj));
    setCurrentUser(userObj);
  };

  const handleLogout = () => {
    localStorage.removeItem("studyMateUser");
    setCurrentUser(null);
  };

  // Handle loading screen on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events (timeline bars, back to top buttons)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      setScrollProgress(scrolled);

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Predefined navigation coordinates for students/examiners
  const navLinks = [
    { label: "Features", target: "about", icon: <Layers className="w-3.5 h-3.5" /> },
    { label: "Summarizer", target: "summarizer", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: "Quiz Test", target: "quiz", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { label: "Flashcards", target: "flashcards", icon: <Layers className="w-3.5 h-3.5" /> },
    { label: "Planner", target: "planner", icon: <Calendar className="w-3.5 h-3.5" /> },
    { label: "Doubt Bot", target: "doubt", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { label: "Dashboard", target: "dashboard", icon: <Award className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`min-h-screen text-slate-100 font-sans transition-colors duration-300 select-none antialiased ${
      isDarkMode 
        ? "bg-[#0F172A] text-slate-100 dark" 
        : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* 1. Loading Screen Animation overlay */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-20 h-20 mb-6">
              {/* Outer spinning elements */}
              <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-cyan-400 rounded-full animate-spin" />
              <GraduationCap className="w-10 h-10 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
              StudyMate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
            </h1>
            <p className="text-slate-400 text-xs mt-2 max-w-sm font-semibold tracking-wide font-mono">
              Loading active diagnostic parameters, flashcard sets, and summaries...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Scroll Progress Indicator */}
      {currentUser && (
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      {/* Conditionally render login page or main dashboard flow */}
      {!currentUser ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* 3. Sticky Navbar */}
          <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b backdrop-blur-md ${
            isDarkMode 
              ? "bg-[#0F172A]/85 border-slate-800/80" 
              : "bg-white/85 border-slate-200"
          }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Title */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 font-bold cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center border border-white/10 shadow-md group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight">
              StudyMate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">AI</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] ${
                  isDarkMode 
                    ? "text-slate-300 hover:text-white hover:bg-slate-800/40" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Tools: theme toggle & contact btn & hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Student Profile chip */}
            {currentUser && (
              <div 
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isDarkMode 
                    ? "bg-slate-950 border-slate-800 text-cyan-300" 
                    : "bg-slate-100 border-slate-200 text-indigo-700"
                }`}
                title={`Logged in as ${currentUser.name} (${currentUser.email})`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[120px] truncate">{currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-1 p-0.5 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                  title="Sign out from system node"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-800 text-yellow-400 hover:border-slate-700" 
                  : "bg-slate-100 border-slate-200 text-indigo-600 hover:border-slate-300"
              }`}
              title={isDarkMode ? "Toggle Light mode" : "Toggle Dark mode"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Quick Contact Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:inline-block px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-650 text-white shadow-md active:scale-95 transition-all text-center cursor-pointer"
            >
              Feedback Panel
            </button>

            {/* Mobile menu hamburger toggle button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`p-2.5 rounded-xl border xl:hidden transition-all cursor-pointer ${
                isDarkMode 
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" 
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>

        {/* 4. Mobile Menu Box Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`xl:hidden border-t overflow-hidden ${
                isDarkMode ? "bg-slate-950/95 border-slate-850/80" : "bg-white/95 border-slate-200"
              }`}
            >
              <div className="px-4 py-4 space-y-2 max-w-sm mx-auto">
                {navLinks.map((link) => (
                  <button
                    key={link.target}
                    onClick={() => scrollToSection(link.target)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                      isDarkMode 
                        ? "text-slate-350 hover:bg-slate-900 hover:text-white" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </button>
                ))}
                
                {currentUser && (
                  <div className={`p-3.5 rounded-xl border flex flex-col gap-2.5 ${
                    isDarkMode ? "bg-slate-950 border-slate-900" : "bg-slate-100 border-slate-200"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                      <div className="text-left text-xs leading-tight">
                        <span className={`font-black block ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {currentUser.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium font-mono">{currentUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-lg border border-rose-500/10 hover:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Get Sign-Out Clearances
                    </button>
                  </div>
                )}

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md text-center cursor-pointer block"
                >
                  Contact Support / Panel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 5. Main content section wrapper */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* HERO */}
        <HeroSection 
          onGetStarted={() => scrollToSection("summarizer")}
          onExploreFeatures={() => scrollToSection("about")}
        />

        {/* ABOUT */}
        <AboutSection />

        {/* NOTES SUMMARIZER */}
        <NotesSummarizer />

        {/* QUIZ GENERATOR */}
        <QuizGenerator />

        {/* FLASHCARDS */}
        <FlashcardsSection />

        {/* PLANNER */}
        <StudyPlanner />

        {/* BOT DOUBT ASSISTANT */}
        <DoubtAssistant />

        {/* DASHBOARD GAINS */}
        <DashboardSection />

        {/* TESTIMONIALS */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CONTACT GREET */}
        <ContactSection />

      </main>

      {/* 6. Professional Footer element */}
      <footer className={`border-t py-12 text-left relative z-20 ${
        isDarkMode 
          ? "bg-slate-950 border-slate-900" 
          : "bg-slate-100 border-slate-200"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-slate-800/20">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5 font-bold">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <span className="text-base font-black tracking-tight text-white dark:text-white">
                  StudyMate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Cognitive software structures compiled with spacing mechanisms and recall algorithms. Designed to empower computer science students preparing for engineering assessments.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Telemetry Modules</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {navLinks.slice(0, 6).map((link) => (
                  <button
                    key={link.target}
                    onClick={() => scrollToSection(link.target)}
                    className="text-left text-slate-500 hover:text-cyan-400 transition-colors py-1 cursor-pointer font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource details */}
            <div className="md:col-span-3 space-y-3 text-left">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Academic Status</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Project compiled in association with **Vite 6** and **Tailwind 4** frameworks, tailored for standard browser diagnostic inspect views.
              </p>
              <div className="flex items-center gap-2 select-none">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] text-slate-500 font-mono">Mock services cached locally.</span>
              </div>
            </div>

          </div>

          {/* Social icons, copyrights, and branding policies */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-slate-600 font-medium">
              &copy; {new Date().getFullYear()} StudyMate AI. All rights reserved. Prepared for GenAI Internship Review Defense.
            </span>
            
            {/* Social SVGs */}
            <div className="flex items-center gap-4.5 text-slate-600 select-none">
              <a href="#hero" className="hover:text-indigo-400 transition-colors" title="Social Node Hub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.6830 3.842-2.339 4.687-4.566 4.935a2.44 2.44 0 011.62-.234c.05.006.1.007.15.007.433 0 .8-.252.923-.627.013-.265.18-.574.68-.482C19.135 20.17 22 14.42 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#hero" className="hover:text-indigo-400 transition-colors" title="Social Node Link">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* 7. Back To Top Floating Action Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Scroll back to top"
            className={`fixed bottom-6 left-6 z-40 p-3 rounded-xl border shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer ${
              isDarkMode 
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700" 
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>
        </>
      )}

    </div>
  );
}
