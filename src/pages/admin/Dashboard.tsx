import { useEffect, useState } from 'react';
import {
  DollarSign,
  Users,
  FolderKanban,
  TrendingUp,
  Activity,
  Eye,
  Calendar,
  Mail,
  User
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

interface Stats {
  revenue: number;
  leads: number;
  projects: number;
  conversionRate: number;
}

interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  status: string;
}

interface ChartData {
  month: string;
  leads: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    revenue: 0,
    leads: 0,
    projects: 0,
    conversionRate: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Buscar leads ativos (new ou contacted)
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .in('status', ['new', 'contacted']);

      // Buscar projetos em progresso
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'dev');

      // Buscar receita total (income)
      const { data: finances } = await supabase
        .from('finances')
        .select('amount')
        .eq('type', 'income');

      const totalRevenue = finances?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

      // Buscar últimos 5 leads
      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Buscar dados para o gráfico (últimos 6 meses)
      const chartDataPromises = Array.from({ length: 6 }, (_, i) => {
        const monthDate = subMonths(new Date(), 5 - i);
        const start = startOfMonth(monthDate);
        const end = endOfMonth(monthDate);

        return supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', start.toISOString())
          .lte('created_at', end.toISOString());
      });

      const chartResults = await Promise.all(chartDataPromises);

      const chartDataArray = chartResults.map((result, index) => {
        const monthDate = subMonths(new Date(), 5 - index);
        return {
          month: format(monthDate, 'MMM'),
          leads: result.count || 0,
        };
      });

      // Calcular conversion rate (mockado por enquanto)
      const conversionRate = leadsCount ? ((projectsCount || 0) / leadsCount) * 100 : 0;

      setStats({
        revenue: totalRevenue,
        leads: leadsCount || 0,
        projects: projectsCount || 0,
        conversionRate: Math.round(conversionRate * 10) / 10,
      });
      setRecentLeads(leads || []);
      setChartData(chartDataArray);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const kpiCards = [
    {
      label: 'Total Revenue (Mensal)',
      value: `R$ ${stats.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'from-green-600 to-green-800',
      textColor: 'text-green-400',
      borderColor: 'border-green-600/30',
    },
    {
      label: 'Active Leads',
      value: stats.leads,
      icon: Users,
      color: 'from-blue-600 to-blue-800',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-600/30',
    },
    {
      label: 'System Load (Projetos)',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-purple-600 to-purple-800',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-600/30',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'from-red-600 to-red-800',
      textColor: 'text-red-400',
      borderColor: 'border-red-600/30',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-mono text-sm">LOADING DASHBOARD...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-mono font-bold text-white tracking-wider">
            SYSTEM OVERVIEW
          </h1>
        </div>
        <p className="text-white/50 font-mono text-sm tracking-wide">
          Real-time analytics and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <div
            key={index}
            className={`bg-black border ${card.borderColor} p-6
                       hover:border-opacity-60 transition-all duration-300
                       group relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5
                          group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <card.icon className={`w-8 h-8 ${card.textColor}`} />
                <Activity className="w-5 h-5 text-white/10" />
              </div>

              <div className="space-y-2">
                <div className="text-white/50 font-mono text-xs uppercase tracking-widest">
                  {card.label}
                </div>
                <div className={`text-3xl font-mono font-bold ${card.textColor} tracking-tight`}>
                  {card.value}
                </div>
              </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
          </div>
        ))}
      </div>

      {/* Charts & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-black border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-mono font-bold text-white tracking-wider">
              LEAD TREND (6 MONTHS)
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis
                dataKey="month"
                stroke="#ffffff50"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
              />
              <YAxis
                stroke="#ffffff50"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #ffffff20',
                  borderRadius: 0,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                }}
                labelStyle={{ color: '#ffffff80' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLeads)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Incoming Signals (Latest Leads) */}
        <div className="bg-black border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-mono font-bold text-white tracking-wider">
              INCOMING SIGNALS
            </h2>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="text-white/30 font-mono text-sm text-center py-8">
                No leads yet
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white/5 border border-white/10 p-4
                           hover:border-green-600/30 hover:bg-green-600/5
                           transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/30" />
                      <div className="font-mono text-sm text-white font-bold truncate">
                        {lead.name}
                      </div>
                    </div>
                    <div className={`px-2 py-0.5 text-xs font-mono ${
                      lead.status === 'new' ? 'bg-yellow-600/20 text-yellow-400' :
                      lead.status === 'contacted' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-green-600/20 text-green-400'
                    }`}>
                      {lead.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-3 h-3 text-white/30" />
                    <div className="font-mono text-xs text-white/50 truncate">
                      {lead.email}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/30 font-mono text-xs">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(lead.created_at), 'dd/MM/yy HH:mm')}
                    </div>

                    <button className="flex items-center gap-1 text-xs font-mono text-blue-400
                                     hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
