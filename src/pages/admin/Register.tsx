import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Lock, UserPlus } from 'lucide-react'
import AuthScaffold from '@/components/admin/AuthScaffold'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [operatorName, setOperatorName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [shake, setShake] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const allowlist = useMemo(() => {
    const raw =
      (import.meta.env.VITE_ADMIN_EMAIL_ALLOWLIST as string | undefined) ?? ''
    return raw
      .split(',')
      .map((v) => v.trim().toLowerCase())
      .filter((v) => v.length > 0)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  const canSubmit = useMemo(() => {
    return (
      operatorName.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length >= 6 &&
      confirmPassword.length > 0
    )
  }, [operatorName, email, password, confirmPassword])

  const triggerFailure = (message: string) => {
    setError(message)
    setSuccess('')
    setShake(true)
    setGlitch(true)
    window.setTimeout(() => setShake(false), 520)
    window.setTimeout(() => setGlitch(false), 620)
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setLoading(false)
      triggerFailure('KEY MISMATCH')
      return
    }

    try {
      if (allowlist.length > 0 && !allowlist.includes(email.toLowerCase())) {
        setLoading(false)
        triggerFailure('ACCESS RESTRICTED // CONTACT ADMIN')
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            operator_name: operatorName,
          },
        },
      })

      if (signUpError) {
        triggerFailure('PROTOCOL REJECTED')
        return
      }

      if (data.session) {
        navigate('/admin')
        return
      }

      setSuccess('PROTOCOL INITIALIZED // VERIFY SYSTEM ID')
    } catch {
      triggerFailure('SYSTEM ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthScaffold>
      <motion.div
        animate={
          shake
            ? {
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        className="relative"
      >
        <div className="relative backdrop-blur-xl bg-[#1A1A1A]/35 border border-white/10 rounded-none p-8 shadow-2xl noise-overlay overflow-hidden">
          {glitch ? (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1, 0] }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-[#BA0C10]/10 mix-blend-screen clip-glitch-1" />
              <div className="absolute inset-0 bg-[#BA0C10]/10 mix-blend-screen clip-glitch-2" />
            </motion.div>
          ) : null}

          <div className="absolute right-3 top-3 border border-[#BA0C10]/40 bg-black/50 px-3 py-1 font-mono text-[10px] tracking-[0.3em] text-[#BA0C10]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BA0C10] status-pulse" />
              SYSTEM STATUS: RECORDING
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-[#BA0C10]/30">
            <UserPlus className="w-6 h-6 text-[#BA0C10]" />
            <div className="text-center">
              <div className="text-white font-mono text-sm tracking-[0.22em]">
                NEW OPERATOR ONBOARDING
              </div>
              <div className="text-white/45 font-mono text-[11px] tracking-[0.18em] mt-1">
                CODIM COMMAND CENTER
              </div>
            </div>
            <Lock className="w-6 h-6 text-[#BA0C10]" />
          </div>

          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-[#BA0C10]/10 border border-[#BA0C10]/60 rounded-none"
            >
              <div className="flex items-center gap-3 text-[#BA0C10] font-mono text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span className="tracking-[0.18em]">{error}</span>
              </div>
            </motion.div>
          ) : null}

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-none"
            >
              <div className="flex items-center gap-3 text-emerald-300 font-mono text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 status-pulse" />
                <span className="tracking-[0.18em]">{success}</span>
              </div>
            </motion.div>
          ) : null}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-white/70 font-mono text-xs tracking-[0.22em] mb-2">
                › OPERATOR_NAME
              </label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                placeholder="> Enter callsign..."
                required
                className="w-full bg-transparent text-white font-sans px-1 py-3 border-0 border-b-2 border-white/20 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300 placeholder:text-white/25"
              />
            </div>

            <div>
              <label className="block text-white/70 font-mono text-xs tracking-[0.22em] mb-2">
                › SYSTEM_ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="> Enter ID..."
                required
                className="w-full bg-transparent text-white font-sans px-1 py-3 border-0 border-b-2 border-white/20 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300 placeholder:text-white/25"
              />
            </div>

            <div>
              <label className="block text-white/70 font-mono text-xs tracking-[0.22em] mb-2">
                › ACCESS_KEY
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="> Enter access key..."
                required
                className="w-full bg-transparent text-white font-sans px-1 py-3 border-0 border-b-2 border-white/20 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300 placeholder:text-white/25"
              />
            </div>

            <div>
              <label className="block text-white/70 font-mono text-xs tracking-[0.22em] mb-2">
                › CONFIRM_KEY
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="> Re-enter key..."
                required
                className="w-full bg-transparent text-white font-sans px-1 py-3 border-0 border-b-2 border-white/20 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300 placeholder:text-white/25"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full bg-[#BA0C10] hover:bg-[#9A0A0D] text-white font-mono text-sm tracking-[0.22em] py-4 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-red-800 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    INITIALIZING...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    INITIALIZE PROTOCOL
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center font-mono text-xs text-white/35">
              <Link
                to="/admin/login"
                className="tracking-[0.16em] text-white/55 hover:text-white transition-colors"
              >
                Already have credentials? Return to Gate.
              </Link>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent mt-0.5" />
      </motion.div>
    </AuthScaffold>
  )
}
