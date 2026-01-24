import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Terminal, Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20">
            <Terminal className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-100">CODIM COMMAND</h1>
          <p className="text-neutral-500 text-sm">System Access Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-300">
              Command ID (Email)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@codim.dev"
              className="bg-neutral-950 border-neutral-800 focus:border-blue-500 text-neutral-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-300">
              Security Key (Password)
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-neutral-950 border-neutral-800 focus:border-blue-500 text-neutral-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  )
}
