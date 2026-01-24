import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Wallet,
  Award,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        navigate('/admin/login')
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FolderKanban, label: 'Projetos', path: '/admin/projects' },
    { icon: Users, label: 'Leads', path: '/admin/leads' },
    { icon: Wallet, label: 'Financeiro', path: '/admin/finances' },
    { icon: Award, label: 'Certificados', path: '/admin/certificates' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900/50 border-r border-neutral-800 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          !isSidebarOpen && '-translate-x-full md:hidden',
        )}
      >
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-500 tracking-tighter">
            CODIM<span className="text-neutral-400">.CMD</span>
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200',
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-neutral-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-neutral-800 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-bold">Menu</span>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
