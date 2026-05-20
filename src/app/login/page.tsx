"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate login
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 p-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/50 shadow-[0_0_30px_rgba(14,165,233,0.3)] mb-6">
            <Zap className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold tracking-wide text-white glow-text mb-2">
            NEURO<span className="text-accent font-light">HMI</span>
          </h1>
          <p className="text-zinc-400 text-sm">Next-Generation Industrial Control</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 block">Operator Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@demo.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 block">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent text-black font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] mt-2"
          >
            Authenticate
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>Secure Industrial Authentication Portal</p>
          <p className="mt-1 opacity-50">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
}
