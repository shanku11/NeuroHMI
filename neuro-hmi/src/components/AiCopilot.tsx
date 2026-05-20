"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Command, Loader2 } from "lucide-react";

export function AiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your engineering copilot. I can help you generate HMI screens, configure alerts, or build reusable widget templates. How can I help?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleToggle = (e: CustomEvent) => setIsOpen(e.detail);
    window.addEventListener("toggleAiCopilot", handleToggle as EventListener);
    return () => window.removeEventListener("toggleAiCopilot", handleToggle as EventListener);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response creating a screen
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'ai', 
          text: 'I have generated a new "Cooling System Overview" screen based on standard metadata templates. I\'ve automatically bound the vibration and temperature tags to the widgets. Would you like to preview or deploy this?' 
        }
      ]);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 bottom-0 w-96 glass-panel border-l border-white/10 z-50 flex flex-col bg-black/90 backdrop-blur-xl"
        >
          <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-purple-500/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="font-semibold text-white">AI Configuration</h2>
            </div>
            <button 
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("toggleAiCopilot", { detail: false }));
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-accent/20 border border-accent/30 text-white rounded-tr-sm' 
                    : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-2">
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  <span className="text-sm text-zinc-400">Generating model...</span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="relative flex items-center">
              <Command className="w-4 h-4 absolute left-3 text-zinc-500" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AI to build a screen..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:border-purple-500/50 text-white placeholder:text-zinc-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 p-1.5 bg-purple-500/20 text-purple-400 hover:bg-purple-500/40 rounded-lg disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
