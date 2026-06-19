/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { TestimonialsData } from "../data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 relative bg-slate-900/10">
      
      {/* Lights backdrops */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" /> Peer Feedback
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white font-sans">
            Fictional Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Reviews</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            See how prospective examiners and students leverage our interactive modules to structure revision hours.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TestimonialsData.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg flex flex-col justify-between text-left backdrop-blur-md hover:border-slate-700/60 transition-colors"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 select-none">
                  {Array.from({ length: test.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-medium">
                  "{test.review}"
                </p>
              </div>

              {/* Profile Details */}
              <div className="mt-6 flex items-center gap-3.5 border-t border-slate-800/80 pt-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-800"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{test.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{test.role}</p>
                  <p className="text-[9px] text-indigo-400 font-mono font-bold">{test.institution}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
