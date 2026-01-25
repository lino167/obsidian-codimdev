import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Filter,
} from 'lucide-react'
import { toast } from 'sonner'

interface FinanceEntry {
  id: number
  created_at: string
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
}

export default function FinanceManager() {
  const [entries, setEntries] = useState<FinanceEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<FinanceEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>('all')
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
  })

  const fetchEntries = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('finances')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch financial entries')
    } else {
      setEntries(data || [])
      setFilteredEntries(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredEntries(entries)
    } else {
      setFilteredEntries(entries.filter((entry) => entry.type === filterType))
    }
  }, [filterType, entries])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('finances').insert({
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Financial entry created successfully')
      setIsOpen(false)
      setFormData({
        type: 'income',
        amount: '',
        description: '',
        category: '',
      })
      fetchEntries()
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    const { error } = await supabase.from('finances').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete entry')
    } else {
      toast.success('Entry deleted successfully')
      fetchEntries()
    }
  }

  const totalIncome = entries
    .filter((entry) => entry.type === 'income')
    .reduce((sum, entry) => sum + Number(entry.amount), 0)

  const totalExpenses = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((sum, entry) => sum + Number(entry.amount), 0)

  const balance = totalIncome - totalExpenses

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }

  const getTypeColor = (type: string) => {
    return type === 'income'
      ? 'text-emerald-400 bg-emerald-500/10'
      : 'text-red-400 bg-red-500/10'
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">
              Total Income
            </h3>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-emerald-400">
              {formatCurrency(totalIncome)}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">
              Total Expenses
            </h3>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold text-red-400">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-400">Balance</h3>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </div>
          <div className="pt-2">
            <div
              className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {formatCurrency(balance)}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Financial Entries</h2>
        <div className="flex items-center gap-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] bg-neutral-950 border-neutral-800">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Financial Entry</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        type: value as 'income' | 'expense',
                      })
                    }
                  >
                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="bg-neutral-950 border-neutral-800"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="bg-neutral-950 border-neutral-800"
                    placeholder="e.g., Development, Marketing, Services"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-neutral-950 border-neutral-800"
                    placeholder="Enter description..."
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Entry
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Entries Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b [&_tr]:border-neutral-800">
              <tr className="border-b border-neutral-800 transition-colors hover:bg-neutral-900/50">
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Date
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Type
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Amount
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Category
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Description
                </th>
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-neutral-500">
                    Loading entries...
                  </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-neutral-500">
                    No entries found
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-neutral-800 transition-colors hover:bg-neutral-900/20"
                  >
                    <td className="p-4 align-middle text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        {new Date(entry.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(entry.type)}`}
                      >
                        {entry.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="p-4 align-middle font-medium text-neutral-200">
                      <span
                        className={
                          entry.type === 'income'
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }
                      >
                        {formatCurrency(entry.amount)}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-neutral-400">
                      {entry.category}
                    </td>
                    <td className="p-4 align-middle text-neutral-400 max-w-xs truncate">
                      {entry.description || 'No description'}
                    </td>
                    <td className="p-4 align-middle">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/10"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
