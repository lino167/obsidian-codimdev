import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, FolderKanban, DollarSign, ArrowUpRight } from 'lucide-react'

interface Lead {
  id: number
  created_at: string
  name: string
  email: string
  message: string | null
  status: 'new' | 'contacted' | 'closed'
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    projects: 0,
    income: 0,
  })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })

      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'deployed')

      const { data: finances } = await supabase
        .from('finances')
        .select('amount')
        .eq('type', 'income')

      const totalIncome =
        finances?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0

      setStats({
        leads: leadsCount || 0,
        projects: projectsCount || 0,
        income: totalIncome,
      })

      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (leads) setRecentLeads(leads)
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Leads Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">
              Total Leads
            </h3>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-neutral-100">
              {stats.leads}
            </div>
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span>+19% from last month</span>
            </p>
          </div>
        </div>

        {/* Active Projects Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">
              Active Projects
            </h3>
            <FolderKanban className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-neutral-100">
              {stats.projects}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              4 currently in development
            </p>
          </div>
        </div>

        {/* Monthly Revenue Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">
              Monthly Revenue
            </h3>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-neutral-100">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(stats.income)}
            </div>
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span>+20.1% from last month</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h3 className="font-semibold text-neutral-100">Recent Leads</h3>
        </div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b [&_tr]:border-neutral-800">
              <tr className="border-b border-neutral-800 transition-colors hover:bg-neutral-900/50">
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Name
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Email
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Status
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-neutral-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-800 transition-colors hover:bg-neutral-900/20"
                  >
                    <td className="p-4 align-middle font-medium text-neutral-200">
                      {lead.name}
                    </td>
                    <td className="p-4 align-middle text-neutral-400">
                      {lead.email}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.status === 'new'
                            ? 'bg-blue-500/10 text-blue-400'
                            : lead.status === 'contacted'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-neutral-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
