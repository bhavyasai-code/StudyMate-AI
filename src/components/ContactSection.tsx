/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API contact register callback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset after success
      setName("");
      setEmail("");
      setMessage("");
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-900/10">
      
      {/* Background gradients */}
      <div className="absolute top-[40%] left-[-15%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" /> Support Channel
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white font-sans">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Have questions for the Generative AI internship project defense review? Shoot us a message or configure custom telemetry outputs directly.
          </p>
        </div>

        {/* Contact Form and Context Details card */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Context descriptions & details */}
          <div className="md:col-span-5 p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between text-left">
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4.5 h-5 text-cyan-400" /> Internship Review Node
              </h3>
              
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                  This website project is prepared explicitly for the **Generative AI Engineering Review Panel**. It leverages client-centric Single Page design flows compiled with Vite.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                  Submit notifications will trigger inline notification telemetry. All communications are logged to local console buffers for review.
                </p>
              </div>
            </div>

            {/* Quick Contact Links / Badges */}
            <div className="pt-6 border-t border-slate-800/60 mt-6 space-y-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-300 font-medium">
                <Mail className="w-4.5 h-4.5 text-cyan-400" />
                <span>support@studymate.ai</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-slate-455">System operational telemetry status: Verified</span>
              </div>
            </div>
          </div>

          {/* Right panel: Form inputs */}
          <div className="md:col-span-7 p-6 rounded-2.5xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md text-left">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-950 border border-slate-805 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full bg-slate-950 border border-slate-805 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Detailed Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us recommendations, score queries, or general structural evaluations..."
                  className="w-full bg-slate-950 border border-slate-805 focus:border-indigo-500 text-xs sm:text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                id="btn-contact-submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Transmitting message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-200" />
                    Transmit Message
                  </>
                )}
              </button>

              {/* Success alert message container */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 mt-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-left">
                      <span className="font-bold block text-white text-xs">Message Sent Successfully!</span>
                      <span className="text-[11px] leading-normal font-medium text-slate-400">Mock transmission completed. Review details printed inside academic local state logs.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
