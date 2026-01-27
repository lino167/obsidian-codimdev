import { Settings2, User, Bell, Shield, Database, Palette } from 'lucide-react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings2 className="w-8 h-8 text-[#BA0C10]" />
          <h1 className="text-3xl font-mono font-bold text-white tracking-tight">
            SYSTEM CONFIG
          </h1>
        </div>
        <p className="text-white/50 font-mono text-sm tracking-wider">
          Configure system preferences and user settings
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="bg-[#0A0A0A] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-[#BA0C10]" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              USER PROFILE
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Operator Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-transparent text-white font-sans px-4 py-3 border border-white/10 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="operator@codim.dev"
                className="w-full bg-transparent text-white font-sans px-4 py-3 border border-white/10 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300"
                disabled
              />
              <p className="text-white/30 font-mono text-xs mt-2">Email cannot be changed</p>
            </div>

            <button className="px-6 py-3 bg-[#BA0C10] hover:bg-[#BA0C10]/80 text-white font-mono text-sm tracking-wider transition-all duration-300">
              UPDATE PROFILE
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#0A0A0A] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              NOTIFICATIONS
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-[#BA0C10]" defaultChecked />
              <div>
                <div className="text-white font-sans text-sm">New Lead Alerts</div>
                <div className="text-white/30 font-mono text-xs">Get notified when new leads arrive</div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-[#BA0C10]" defaultChecked />
              <div>
                <div className="text-white font-sans text-sm">Project Updates</div>
                <div className="text-white/30 font-mono text-xs">Project status changes</div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-[#BA0C10]" />
              <div>
                <div className="text-white font-sans text-sm">Finance Alerts</div>
                <div className="text-white/30 font-mono text-xs">Payment and invoice notifications</div>
              </div>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#0A0A0A] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#00FF94]" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              SECURITY
            </h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-white/10 hover:border-[#BA0C10]/30 hover:bg-[#BA0C10]/5 text-white font-sans text-sm transition-all duration-300">
              Change Password
            </button>

            <button className="w-full text-left px-4 py-3 border border-white/10 hover:border-[#BA0C10]/30 hover:bg-[#BA0C10]/5 text-white font-sans text-sm transition-all duration-300">
              Enable Two-Factor Authentication
            </button>

            <button className="w-full text-left px-4 py-3 border border-white/10 hover:border-[#BA0C10]/30 hover:bg-[#BA0C10]/5 text-white font-sans text-sm transition-all duration-300">
              View Active Sessions
            </button>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-[#0A0A0A] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              PREFERENCES
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Theme
              </label>
              <select className="w-full bg-transparent text-white font-sans px-4 py-3 border border-white/10 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300">
                <option value="dark" className="bg-black">Dark Mode (Industrial)</option>
                <option value="light" className="bg-black">Light Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Language
              </label>
              <select className="w-full bg-transparent text-white font-sans px-4 py-3 border border-white/10 focus:border-[#BA0C10] focus:outline-none transition-colors duration-300">
                <option value="pt" className="bg-black">Português (BR)</option>
                <option value="en" className="bg-black">English (US)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              DATABASE INFO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-white/10">
              <div className="text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Supabase Project
              </div>
              <div className="text-white font-mono text-sm">
                CodimDev's Project
              </div>
            </div>

            <div className="p-4 border border-white/10">
              <div className="text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Database Status
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
                <div className="text-[#00FF94] font-mono text-sm">ONLINE</div>
              </div>
            </div>

            <div className="p-4 border border-white/10">
              <div className="text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                Region
              </div>
              <div className="text-white font-mono text-sm">
                us-east-2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
