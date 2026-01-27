import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  Cpu,
  Activity,
  TrendingUp,
  TrendingDown,
  Database,
  Zap,
  Server,
  Plus,
  FileText,
  Send,
  Wrench,
  BarChart3,
  Circle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { format } from 'date-fns';

// Mock data for Mission Control
const mockFinancialData = [
  { month: 'Aug', income: 18500, expenses: 12200 },
  { month: 'Sep', income: 22100, expenses: 14500 },
  { month: 'Oct', income: 19800, expenses: 13100 },
  { month: 'Nov', income: 25600, expenses: 15800 },
  { month: 'Dec', income: 28200, expenses: 16400 },
  { month: 'Jan', income: 32850, expenses: 17450 },
];

const mockLeadSources = [
  { source: 'LinkedIn', count: 24 },
  { source: 'Site', count: 18 },
  { source: 'Referral', count: 12 },
];

const mockActivityLog = [
  { id: 1, type: 'auth', message: 'User logged in', timestamp: new Date().toISOString() },
  { id: 2, type: 'project', message: 'Project Updated: KRAFLO', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 3, type: 'finance', message: 'Invoice Sent: #INV-2026-001', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 4, type: 'lead', message: 'New Lead: Carlos Mendes', timestamp: new Date(Date.now() - 10800000).toISOString() },
  { id: 5, type: 'system', message: 'Database Backup Completed', timestamp: new Date(Date.now() - 86400000).toISOString() },
];

interface Stats {
  revenue: number;
  revenueTarget: number;
  leads: number;
  hotLeads: number;
  warmLeads: number;
  projects: number;
  daysToDeadline: number;
  efficiency: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    revenue: 15400,
    revenueTarget: 18000,
    leads: 8,
    hotLeads: 3,
    warmLeads: 5,
    projects: 3,
    daysToDeadline: 2,
    efficiency: 94,
  });
  const [loading, setLoading] = useState(true);
  const [cpuLoad] = useState(67); // Fake CPU load
  const [dbStorage] = useState(42); // Fake DB storage %
  const [apiStatus] = useState('ONLINE');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .in('status', ['new', 'contacted']);

      const { count: hotLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'dev');

      const { data: finances } = await supabase
        .from('finances')
        .select('amount')
        .eq('type', 'income');

      const totalRevenue = finances?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 15400;

      setStats((prev) => ({
        ...prev,
        revenue: totalRevenue,
        leads: leadsCount || 8,
        hotLeads: hotLeadsCount || 3,
        warmLeads: (leadsCount || 8) - (hotLeadsCount || 3),
        projects: projectsCount || 3,
      }));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const targetPercentage = Math.round((stats.revenue / stats.revenueTarget) * 100);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#BA0C10] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-mono text-sm tracking-wider">INITIALIZING MISSION CONTROL...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="w-10 h-10 text-[#00FFFF] animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF94] rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight">
              MISSION CONTROL
            </h1>
            <p className="text-white/40 font-mono text-xs tracking-widest">
              REAL-TIME OPERATIONAL DASHBOARD // {format(new Date(), 'HH:mm:ss')}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* TOP ROW: 4 Major KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Monthly Revenue */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-[#00FFFF]/20 p-4 relative overflow-hidden group hover:border-[#00FFFF]/50 transition-all duration-300"
          >
            {/* Glitch effect border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-7 h-7 text-[#00FF94]" />
              {targetPercentage >= 100 ? (
                <TrendingUp className="w-5 h-5 text-[#00FF94]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            <div className="text-white/50 font-sans text-xs uppercase tracking-wider mb-1">
              Monthly Revenue
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight mb-2">
              R$ {stats.revenue.toLocaleString('pt-BR')}
            </div>

            {/* Subtext */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 font-mono">
                vs Target: <span className={targetPercentage >= 100 ? 'text-[#00FF94]' : 'text-yellow-500'}>{targetPercentage}%</span>
              </span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${targetPercentage >= 100 ? 'bg-[#00FF94]' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min(targetPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Pipeline */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-[#BA0C10]/20 p-4 relative overflow-hidden group hover:border-[#BA0C10]/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-3">
              <Users className="w-7 h-7 text-[#BA0C10]" />
              <div className="flex gap-1">
                <Circle className="w-3 h-3 text-[#BA0C10] fill-[#BA0C10]" />
                <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            <div className="text-white/50 font-sans text-xs uppercase tracking-wider mb-1">
              Active Pipeline
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight mb-2">
              {stats.leads} Leads
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#BA0C10] font-mono">{stats.hotLeads} Hot</span>
              <span className="text-yellow-500 font-mono">{stats.warmLeads} Warm</span>
            </div>
          </motion.div>

          {/* Project Load */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-blue-500/20 p-4 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-3">
              <Cpu className="w-7 h-7 text-blue-500" />
              <BarChart3 className="w-5 h-5 text-blue-500/50" />
            </div>

            <div className="text-white/50 font-sans text-xs uppercase tracking-wider mb-1">
              Project Load
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight mb-2">
              {stats.projects} Active
            </div>

            <div className="text-xs text-white/40 font-mono">
              Next Deadline: <span className="text-[#BA0C10]">{stats.daysToDeadline} Days</span>
            </div>
          </motion.div>

          {/* Efficiency Rate */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-[#00FF94]/20 p-4 relative overflow-hidden group hover:border-[#00FF94]/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#BA0C10] to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-3">
              <Activity className="w-7 h-7 text-[#00FF94]" />
              <div className="text-[#00FF94] font-mono text-sm">OPTIMAL</div>
            </div>

            <div className="text-white/50 font-sans text-xs uppercase tracking-wider mb-1">
              Efficiency Rate
            </div>
            <div className="text-3xl font-mono font-bold text-[#00FF94] tracking-tight mb-2">
              {stats.efficiency}%
            </div>

            <div className="text-xs text-white/40 font-mono">
              Hours Billed vs Available
            </div>
          </motion.div>
        </div>

        {/* MIDDLE ROW: Analytics (2:1 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Financial Trajectory - Large Chart */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#BA0C10] via-[#00FFFF] to-[#BA0C10] opacity-30" />

            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-6 h-6 text-[#00FFFF]" />
              <h2 className="text-lg font-mono font-bold text-white tracking-wider">
                FINANCIAL TRAJECTORY (6 MONTHS)
              </h2>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockFinancialData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00FF94" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BA0C10" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#BA0C10" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis
                  dataKey="month"
                  stroke="#ffffff30"
                  tick={{ fill: '#ffffff50', fontFamily: 'JetBrains Mono', fontSize: 10 }}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <YAxis
                  stroke="#ffffff30"
                  tick={{ fill: '#ffffff50', fontFamily: 'JetBrains Mono', fontSize: 10 }}
                  axisLine={{ stroke: '#ffffff10' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid rgba(0,255,255,0.2)',
                    borderRadius: 0,
                    fontFamily: 'JetBrains Mono',
                    fontSize: 11,
                  }}
                  labelStyle={{ color: '#ffffff80' }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#00FF94"
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#BA0C10"
                  strokeWidth={2}
                  fill="url(#expensesGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Lead Sources - Small Chart */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-white/10 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#00FFFF] to-transparent opacity-30" />

            <div className="flex items-center gap-3 mb-5">
              <Users className="w-6 h-6 text-[#00FFFF]" />
              <h2 className="text-base font-mono font-bold text-white tracking-wider">
                LEAD SOURCES
              </h2>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockLeadSources}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis
                  dataKey="source"
                  stroke="#ffffff30"
                  tick={{ fill: '#ffffff50', fontFamily: 'JetBrains Mono', fontSize: 10 }}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <YAxis
                  stroke="#ffffff30"
                  tick={{ fill: '#ffffff50', fontFamily: 'JetBrains Mono', fontSize: 10 }}
                  axisLine={{ stroke: '#ffffff10' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid rgba(0,255,255,0.2)',
                    borderRadius: 0,
                    fontFamily: 'JetBrains Mono',
                    fontSize: 11,
                  }}
                  cursor={{ fill: 'rgba(0,255,255,0.1)' }}
                />
                <Bar dataKey="count" fill="#00FFFF" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* BOTTOM ROW: Operational Lists (1:1:1 Split) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* System Health */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-white/10 p-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <Server className="w-6 h-6 text-[#00FF94]" />
              <h2 className="text-base font-mono font-bold text-white tracking-wider">
                SYSTEM HEALTH
              </h2>
            </div>

            <div className="space-y-4">
              {/* CPU Load */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 font-mono text-xs">CPU LOAD</span>
                  <span className="text-[#00FFFF] font-mono text-sm font-bold">{cpuLoad}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FFFF] to-blue-500"
                    style={{ width: `${cpuLoad}%` }}
                  />
                </div>
              </div>

              {/* Database Storage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 font-mono text-xs flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    DB STORAGE
                  </span>
                  <span className="text-[#00FF94] font-mono text-sm font-bold">{dbStorage}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FF94] to-green-600"
                    style={{ width: `${dbStorage}%` }}
                  />
                </div>
              </div>

              {/* API Status */}
              <div className="flex items-center justify-between p-3 bg-white/5 border border-[#00FF94]/20">
                <span className="text-white/50 font-mono text-xs flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  API STATUS
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
                  <span className="text-[#00FF94] font-mono text-sm font-bold">{apiStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-white/10 p-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <Activity className="w-6 h-6 text-[#BA0C10]" />
              <h2 className="text-base font-mono font-bold text-white tracking-wider">
                RECENT ACTIVITY
              </h2>
            </div>

            <div className="space-y-2">
              {mockActivityLog.map((log) => (
                <div
                  key={log.id}
                  className="border-l-2 border-white/10 pl-3 py-2 hover:border-[#00FFFF] transition-colors duration-200"
                >
                  <div className="text-white/70 font-sans text-xs leading-tight mb-1">
                    {log.message}
                  </div>
                  <div className="text-white/30 font-mono text-xs">
                    {format(new Date(log.timestamp), 'HH:mm:ss')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0A0A0A] border border-white/10 p-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <Zap className="w-6 h-6 text-[#00FFFF]" />
              <h2 className="text-base font-mono font-bold text-white tracking-wider">
                QUICK ACTIONS
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-gradient-to-br from-[#00FFFF]/10 to-transparent border border-[#00FFFF]/30 hover:border-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all duration-300 group">
                <Plus className="w-6 h-6 text-[#00FFFF] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white/70 font-mono text-xs text-center">NEW PROJECT</div>
              </button>

              <button className="p-4 bg-gradient-to-br from-[#BA0C10]/10 to-transparent border border-[#BA0C10]/30 hover:border-[#BA0C10] hover:bg-[#BA0C10]/20 transition-all duration-300 group">
                <Users className="w-6 h-6 text-[#BA0C10] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white/70 font-mono text-xs text-center">ADD LEAD</div>
              </button>

              <button className="p-4 bg-gradient-to-br from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 hover:border-[#00FF94] hover:bg-[#00FF94]/20 transition-all duration-300 group">
                <Send className="w-6 h-6 text-[#00FF94] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white/70 font-mono text-xs text-center">SEND QUOTE</div>
              </button>

              <button className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/20 transition-all duration-300 group">
                <Wrench className="w-6 h-6 text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-white/70 font-mono text-xs text-center">MAINTENANCE</div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
