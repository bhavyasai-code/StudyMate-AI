/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQsData } from "../data";

export default function FAQSection() {
  // Track open state of accordion questions (key: faqId, value: boolean)
  const [openFAQs, setOpenFAQs] = useState<Record<string, boolean>>({
    "faq-1": true // First open by default for neat visual balance
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq" className="py-20 relative bg-slate-950/20">
      
      {/* Background radial effects */}
      <div className="absolute top-[30%] right-[-10%] w-72 h-72 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> General Queries
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white font-sans">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Questions</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Quickly understand the architectural mechanics, local storage integrity, and spacing designs empowering our study aids.
          </p>
        </div>

        {/* Accordions Core Container */}
        <div className="max-w-3xl mx-auto space-y-3.5 mt-8">
          {FAQsData.map((faq) => {
            const isOpen = !!openFAQs[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-750 transition-all overflow-hidden"
              >
                {/* Accordion clickable header bar */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left transition-colors hover:bg-slate-900/20 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight leading-normal">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 text-cyan-400" : ""
                  }`} />
                </button>

                {/* Animated content drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-400 border-t border-slate-800/45 text-xs sm:text-sm leading-relaxed text-left selection:bg-indigo-500/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
