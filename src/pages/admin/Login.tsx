import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Terminal, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('ACCESS DENIED');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else if (data.session) {
        // Login bem-sucedido
        navigate('/admin');
      }
    } catch (err) {
      setError('SYSTEM ERROR');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent animate-pulse"
           style={{ backgroundSize: '100% 4px' }} />

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-600/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-600/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-600/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-600/20" />

      {/* Login Card */}
      <motion.div
        animate={shake ? {
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 }
        } : {}}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-none p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-red-600/30">
            <Shield className="w-8 h-8 text-red-600" />
            <div className="text-center">
              <div className="flex items-center gap-2 text-red-600 font-mono text-sm tracking-widest">
                <Lock className="w-4 h-4" />
                <span>RESTRICTED AREA</span>
              </div>
              <div className="text-white/50 font-mono text-xs tracking-wider mt-1">
                // AUTH REQUIRED
              </div>
            </div>
            <Terminal className="w-8 h-8 text-red-600" />
          </div>

          {/* System Status */}
          <div className="mb-6 font-mono text-xs text-green-400/70 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-green-400">●</span>
              <span>SYSTEM: ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">●</span>
              <span>SECURITY: MAXIMUM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">●</span>
              <span>AWAITING CREDENTIALS...</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-600/10 border border-red-600/50 rounded-none"
            >
              <div className="flex items-center gap-3 text-red-400 font-mono text-sm">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span className="tracking-wider">{error}</span>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-white/70 font-mono text-xs tracking-widest mb-2">
                › USER_ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codimdev.com"
                required
                className="w-full bg-black/50 text-white font-mono px-4 py-3
                         border-0 border-b-2 border-white/20
                         focus:border-red-600 focus:outline-none
                         transition-colors duration-300
                         placeholder:text-white/30"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white/70 font-mono text-xs tracking-widest mb-2">
                › ACCESS_KEY
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●●●●●●●"
                required
                className="w-full bg-black/50 text-white font-mono px-4 py-3
                         border-0 border-b-2 border-white/20
                         focus:border-red-600 focus:outline-none
                         transition-colors duration-300
                         placeholder:text-white/30"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#BA0C10] hover:bg-[#9A0A0D]
                       text-white font-mono text-sm tracking-widest
                       py-4 px-6
                       transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       border border-red-800
                       relative overflow-hidden group"
            >
              {/* Button Scan Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                            translate-x-[-100%] group-hover:translate-x-[100%]
                            transition-transform duration-1000" />

              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    AUTHENTICATE IDENTITY
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center font-mono text-xs text-white/30 space-y-1">
              <div>UNAUTHORIZED ACCESS WILL BE LOGGED</div>
              <div className="text-red-400/50">ALL ACTIVITY IS MONITORED</div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-0.5" />
      </motion.div>

      {/* Ambient Light Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
