import { useEffect, useState, useCallback } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Radio,
  CircleDollarSign,
  Award,
  Settings2,
  LogOut,
  User
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    } catch (error) {
      console.error('Session check error:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, checkSession]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#BA0C10] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-mono text-sm tracking-wider">AUTHENTICATING...</p>
        </div>
      </div>
    );
  }

  // All navigation links
  const navItems = [
    { to: '/admin', label: 'OVERVIEW', icon: LayoutDashboard, end: true },
    { to: '/admin/projects', label: 'PROJECTS DB', icon: FolderKanban, end: false },
    { to: '/admin/leads', label: 'COMM-LINK / CRM', icon: Radio, end: false },
    { to: '/admin/finances', label: 'FINANCE', icon: CircleDollarSign, end: false },
    { to: '/admin/certificates', label: 'CERTIFICATES', icon: Award, end: false },
    { to: '/admin/settings', label: 'SYSTEM CONFIG', icon: Settings2, end: false },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar - Fixed w-64 */}
      <aside className="w-64 bg-[#050505] border-r border-white/5 flex flex-col fixed h-screen">
        {/* Header: Logo + Badge */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-mono font-bold text-white tracking-tighter">
              CODIM.DEV
            </h1>
            <div className="px-2 py-1 bg-[#BA0C10]/10 border border-[#BA0C10]/30 text-[#BA0C10] font-mono text-xs tracking-wider">
              ADMIN v1.0
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#BA0C10] via-[#BA0C10]/50 to-transparent" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-mono text-sm
                transition-all duration-200 relative group
                ${
                  isActive
                    ? 'text-white bg-[#BA0C10]/10 border-l-4 border-[#BA0C10]'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Background Glow for Active State */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BA0C10]/20 to-transparent pointer-events-none" />
                  )}

                  <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-[#BA0C10]' : ''}`} />
                  <span className="relative z-10 tracking-wider">{item.label}</span>

                  {/* Hover Right Border */}
                  {!isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#BA0C10]
                                  transform scale-y-0 group-hover:scale-y-100
                                  transition-transform duration-200 origin-center" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer: User Avatar + Email + Logout */}
        <div className="p-4 border-t border-white/5 space-y-3">
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BA0C10] to-[#BA0C10]/60
                          flex items-center justify-center text-white font-mono text-sm font-bold
                          border-2 border-[#BA0C10]/30">
              <User className="w-5 h-5" />
            </div>

            {/* Email */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-mono text-xs truncate">
                {user?.email || 'operator@codim.dev'}
              </div>
              <div className="text-white/30 font-mono text-xs">
                Authenticated
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3
                     text-[#BA0C10] hover:text-white hover:bg-[#BA0C10]/10
                     font-mono text-sm transition-all duration-200
                     border border-[#BA0C10]/20 hover:border-[#BA0C10]/40
                     group"
          >
            <LogOut className="w-5 h-5" />
            <span className="tracking-wider">LOGOUT</span>
            <div className="ml-auto w-1 h-4 bg-[#BA0C10] transform scale-x-0
                          group-hover:scale-x-100 transition-transform duration-200" />
          </button>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent" />
      </aside>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 ml-64 min-h-screen bg-[#050505]">
        <Outlet />
      </main>
    </div>
  );
}
