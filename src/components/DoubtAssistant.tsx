/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Sparkles, User, Database, RefreshCw, Layers } from "lucide-react";
import { ChatbotPresets, CustomResponseKeywords } from "../data";
import { parseSimpleMarkdown } from "../utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function DoubtAssistant() {
  const sampleQuestions = [
    "What is Machine Learning?",
    "Explain Normalization.",
    "What is a Neural Network?",
    "Difference between SQL and NoSQL?",
    "What is Python used for?"
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "🤖 **Welcome to StudyMate AI Doubt Assistance!** I'm your virtual computer science tutor.\n\nClick any of the sample prompts below, or type your custom queries in the transmission bar. Let's tackle complex architectural problems together!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    // 1. Add User message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Compute AI response dynamics
    setTimeout(() => {
      let responseText = "";

      // Check presets first
      const matchedPreset = ChatbotPresets.find(p => p.question.toLowerCase() === queryText.toLowerCase());
      
      if (matchedPreset) {
        responseText = matchedPreset.response;
      } else {
        // Keyword searching
        const lowerText = queryText.toLowerCase();
        const matchedKeywords = CustomResponseKeywords.find(item => 
          item.keywords.some(kw => lowerText.includes(kw))
        );

        if (matchedKeywords) {
          responseText = matchedKeywords.response;
        } else {
          // Smart fallback
          responseText = `🤔 **I've received your query regarding "${queryText}."**\n\nWhile I am running in offline local model simulation mode, I recognize this is associated with advanced engineering structures.\n\n*   **Recommended Action:** Visit other modules in StudyMate AI such as the **Smart Quiz Generator** or **Notes Summarizer** to explore matching patterns.\n*   *Next Steps:* Consult standard textbook definitions or double-check typing queries for standard keywords (e.g. "DBMS", "ML", "SQL", "Python", "networks") to retrieve detailed study guides immediately!`;
        }
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "🤖 Chat history cleared. Ready to solve new computer science doubts! Feel free to ask or click standard presets.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <section id="doubt" className="py-20 relative bg-slate-950/20">
      
      {/* Light highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[380px] h-[380px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Dialogue Agent
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white">
            AI Doubt <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Assistant</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Eliminate academic blockers instantly. Interact with our simulated Generative AI tutoring interface loaded with multi-domain troubleshooting guidelines.
          </p>
        </div>

        {/* Chat Terminal Core */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Preset Prompts Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md h-full flex flex-col justify-between">
              
              <div>
                <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" /> High-Yield Prompts
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mb-4 font-medium leading-relaxed">
                  Click any of these high-frequency exam questions to instantly trigger a formatted guide from our dialogue agent:
                </p>

                {/* Vertical preset chip buttons */}
                <div className="space-y-2.5">
                  {sampleQuestions.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSendQuery(question)}
                      className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 text-xs text-slate-300 hover:text-white font-semibold transition-all active:scale-[0.98] select-none block leading-snug cursor-pointer group"
                    >
                      <span className="text-indigo-400 group-hover:text-cyan-300 mr-1.5 font-mono">▸</span>
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset logs bottom bar */}
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono font-medium">Telemetry status: Online</span>
                <button
                  onClick={clearChat}
                  className="text-[10px] font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Clear Dialogue
                </button>
              </div>

            </div>
          </div>

          {/* Chat Bubble Interface Panel */}
          <div className="lg:col-span-8 flex flex-col h-[520px] rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md overflow-hidden">
            
            {/* Header section indicator */}
            <div className="px-5 py-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center border border-white/10 shadow-md">
                    <Sparkles className="w-4.5 h-4.5 text-white" />
                  </div>
                  {/* Glowing online status dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-none">GPT-Mate Tutor Core</h4>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">Responsive local feedback modeling</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20 font-bold font-mono tracking-wider">
                AI ACTIVE
              </span>
            </div>

            {/* Bubble contents scrolling window */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4.5 bg-slate-900/10">
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 max-w-[85%] ${isBot ? "self-start mr-auto text-left" : "self-end ml-auto flex-row-reverse text-right"}`}
                    >
                      {/* Avatar container */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border select-none ${
                        isBot 
                          ? "bg-slate-950 border-slate-800 text-cyan-400" 
                          : "bg-indigo-600 border-indigo-400 text-white"
                      }`}>
                        {isBot ? <Sparkles className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4" />}
                      </div>

                      {/* Msg text block */}
                      <div className="space-y-1">
                        <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-sans font-medium shadow-md leading-relaxed select-text ${
                          isBot 
                            ? "bg-slate-950/80 border border-slate-850 text-slate-300 rounded-tl-xs" 
                            : "bg-indigo-600 border border-indigo-500 text-white rounded-tr-xs"
                        }`}>
                          {isBot ? (
                            <div 
                              className="prose prose-invert chatbot-bubble text-slate-300"
                              dangerouslySetInnerHTML={{ __html: parseSimpleMarkdown(msg.text) }}
                            />
                          ) : (
                            <p>{msg.text}</p>
                          )}
                        </div>
                        {/* Message absolute timing stamp */}
                        <span className="text-[10px] text-slate-500 font-mono block px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing simulation bubble */}
              {isTyping && (
                <div className="flex gap-3 max-w-[80%] self-start mr-auto text-left">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center shrink-0 select-none">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-850 text-slate-400 text-xs flex items-center gap-1.5 select-none rounded-tl-xs">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Input submission container */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(inputText);
              }}
              className="p-3.5 bg-slate-950/30 border-t border-slate-800/80 flex items-center gap-2.5 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about SQL joining, Dijkstra algorithm, LLM architectures..."
                className="flex-1 bg-slate-950 border border-slate-805 focus:border-cyan-400 text-xs sm:text-sm font-medium p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-cyan-400 transition-colors text-slate-250 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                id="btn-send-message"
                className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl shadow-md border border-white/5 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
