import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, DollarSign, LogOut, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import logoHorizontal from '@/assets/logo-horizontal.png';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
  }, [navigate]);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-mono text-sm">AUTHENTICATING...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/projects', label: 'Projetos', icon: FolderKanban },
    { to: '/admin/leads', label: 'Leads', icon: Users },
    { to: '/admin/finances', label: 'Financeiro', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <img
            src={logoHorizontal}
            alt="CODIM DEV"
            className="w-full h-auto"
          />
          <div className="text-white/30 font-mono text-xs mt-3 tracking-widest text-center">
            ADMIN CONSOLE
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-none font-mono text-sm
                transition-all duration-200 relative group
                ${
                  isActive
                    ? 'text-white bg-red-600/10 border-l-2 border-red-600'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent pointer-events-none" />
                  )}

                  <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-red-600' : ''}`} />
                  <span className="relative z-10 tracking-wider">{item.label}</span>

                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600
                                transform scale-y-0 group-hover:scale-y-100
                                transition-transform duration-200 origin-center" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/5 space-y-3">
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-none">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800
                          flex items-center justify-center text-white font-mono text-sm font-bold
                          border-2 border-red-600/30">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-mono text-xs truncate">
                {user?.email || 'Admin'}
              </div>
              <div className="text-white/30 font-mono text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Authenticated
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3
                     text-red-400 hover:text-red-300 hover:bg-red-600/10
                     font-mono text-sm transition-all duration-200
                     border border-red-600/20 hover:border-red-600/40
                     group"
          >
            <LogOut className="w-5 h-5" />
            <span className="tracking-wider">LOGOUT</span>
            <div className="ml-auto w-1 h-4 bg-red-600 transform scale-x-0
                          group-hover:scale-x-100 transition-transform duration-200" />
          </button>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-[#050505]">
        <Outlet />
      </main>
    </div>
  );
}
