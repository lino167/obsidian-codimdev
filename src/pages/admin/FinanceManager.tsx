import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Finance, Project } from '@/types';
import {
  Wallet, TrendingUp, TrendingDown, Plus, Calendar, DollarSign,
  Building2, Loader2, Filter, ArrowUpRight, ArrowDownLeft, Clock, Target
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type FilterType = 'all' | 'income' | 'expense' | 'pending';

// Simplified type for project dropdown
type ProjectSummary = { id: number; title: string };

const FinanceManager = () => {
  // State Management
  const [finances, setFinances] = useState<Finance[]>([]);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Monthly Goal
  const [monthlyGoal] = useState(15000); // R$ 15.000 - Can be made editable later

  // New Transaction Form
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    type: 'income' as 'income' | 'expense',
    category: '',
    status: 'paid' as 'paid' | 'pending' | 'scheduled',
    due_date: '',
    project_id: null as number | null
  });

  // Fetch Data
  useEffect(() => {
    fetchFinances();
    fetchProjects();
  }, []);

  async function fetchFinances() {
    try {
      const { data, error } = await supabase
        .from('finances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFinances(data || []);
    } catch (error) {
      console.error('Error fetching finances:', error);
      toast.error('Erro ao carregar finanças');
    } finally {
      setLoading(false);
    }
  }

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  // Add Transaction
  async function handleAddTransaction() {
    if (!newTransaction.title || !newTransaction.amount) {
      toast.error('Preencha título e valor');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.from('finances').insert({
        title: newTransaction.title,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        category: newTransaction.category || null,
        status: newTransaction.status,
        due_date: newTransaction.due_date || null,
        project_id: newTransaction.project_id
      });

      if (error) throw error;

      toast.success('✅ Transação adicionada');
      setDialogOpen(false);
      setNewTransaction({
        title: '',
        amount: '',
        type: 'income',
        category: '',
        status: 'paid',
        due_date: '',
        project_id: null
      });
      fetchFinances();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Erro ao adicionar transação');
    } finally {
      setSaving(false);
    }
  }

  // Calculate Totals
  const totalIncome = finances
    .filter(f => f.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpenses = finances
    .filter(f => f.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = totalIncome - totalExpenses;
  const expenseRatio = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100) : 0;
  const goalProgress = (totalIncome / monthlyGoal) * 100;

  // Filtered Transactions
  const filteredFinances = finances.filter(finance => {
    if (filterType === 'all') return true;
    if (filterType === 'pending') return finance.status === 'pending' || finance.status === 'scheduled';
    return finance.type === filterType;
  });

  // Category Badge Color
  function getCategoryColor(category: string | null) {
    const colors: Record<string, string> = {
      project: 'bg-green-500/10 text-green-500 border-green-500/30',
      server: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      software: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      salary: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
      tax: 'bg-red-500/10 text-red-500 border-red-500/30'
    };
    return category ? (colors[category] || 'bg-white/5 text-white/50 border-white/10') : 'bg-white/5 text-white/50 border-white/10';
  }

  if (loading) {
    return (
      <div className="h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-crimson" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-crimson" />
            <div>
              <h1 className="text-xl font-display font-bold tracking-tight">RESOURCE MONITOR</h1>
              <p className="text-xs text-white/50 font-mono">Financial Operations & Allocation Tracking</p>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-crimson hover:bg-red-700 gap-2 border border-white/10">
                <Plus className="w-4 h-4" /> LOG TRANSACTION
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="font-mono text-crimson uppercase tracking-wider">
                  Nova Transação
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Type Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                    className={`p-3 border rounded-sm font-mono text-sm transition-colors ${
                      newTransaction.type === 'income'
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                    RECEITA
                  </button>
                  <button
                    onClick={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                    className={`p-3 border rounded-sm font-mono text-sm transition-colors ${
                      newTransaction.type === 'expense'
                        ? 'bg-crimson/20 border-crimson text-red-400'
                        : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 mx-auto mb-1" />
                    DESPESA
                  </button>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label className="text-xs font-mono text-white/60 uppercase">Descrição *</Label>
                  <Input
                    value={newTransaction.title}
                    onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                    placeholder="Ex: Pagamento Projeto KRAFLO"
                    className="bg-black border-white/20 text-white"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-xs font-mono text-white/60 uppercase">Valor (R$) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    placeholder="0.00"
                    className="bg-black border-white/20 text-white text-2xl font-bold"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-mono text-white/60 uppercase">Categoria</Label>
                    <Select value={newTransaction.category} onValueChange={(val) => setNewTransaction({ ...newTransaction, category: val })}>
                      <SelectTrigger className="bg-black border-white/20">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0A0A] border-white/20">
                        <SelectItem value="project">Projeto</SelectItem>
                        <SelectItem value="server">Servidor</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="salary">Salário</SelectItem>
                        <SelectItem value="tax">Impostos</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-mono text-white/60 uppercase">Status</Label>
                    <Select value={newTransaction.status} onValueChange={(val: any) => setNewTransaction({ ...newTransaction, status: val })}>
                      <SelectTrigger className="bg-black border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0A0A] border-white/20">
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="scheduled">Agendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Due Date & Project */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-mono text-white/60 uppercase">Data</Label>
                    <Input
                      type="date"
                      value={newTransaction.due_date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, due_date: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-mono text-white/60 uppercase">Projeto (Opcional)</Label>
                    <Select value={newTransaction.project_id?.toString()} onValueChange={(val) => setNewTransaction({ ...newTransaction, project_id: val ? parseInt(val) : null })}>
                      <SelectTrigger className="bg-black border-white/20">
                        <SelectValue placeholder="Nenhum" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0A0A] border-white/20">
                        {projects.map(p => (
                          <SelectItem key={p.id} value={p.id.toString()}>{p.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleAddTransaction} disabled={saving} className="w-full bg-crimson">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SALVAR TRANSAÇÃO'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* HUD - Summary Dashboard */}
      <div className="border-b border-white/10 bg-gradient-to-br from-black/40 to-neutral-950 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Net Income */}
          <div className="bg-black/40 border border-white/10 rounded-sm p-4">
            <div className="text-xs text-white/50 font-mono mb-1 uppercase">Saldo Líquido (Mês)</div>
            <div className={`text-3xl font-display font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-white/40 font-mono mt-2">
              Receitas: R$ {totalIncome.toLocaleString('pt-BR')} | Despesas: R$ {totalExpenses.toLocaleString('pt-BR')}
            </div>
          </div>

          {/* Expense Ratio */}
          <div className="bg-black/40 border border-white/10 rounded-sm p-4">
            <div className="text-xs text-white/50 font-mono mb-1 uppercase">Taxa de Despesas</div>
            <div className="text-3xl font-display font-bold text-orange-400">
              {expenseRatio.toFixed(1)}%
            </div>
            <div className="text-xs text-white/40 font-mono mt-2">
              {expenseRatio < 30 ? '✓ Saudável' : expenseRatio < 50 ? '⚠ Moderado' : '⚠️ Alto'}
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="bg-black/40 border border-white/10 rounded-sm p-4">
            <div className="text-xs text-white/50 font-mono mb-1 uppercase flex items-center gap-2">
              <Target className="w-3 h-3" /> Meta Mensal
            </div>
            <div className="text-3xl font-display font-bold text-cyan-400">
              {goalProgress.toFixed(0)}%
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-crimson to-green-500 transition-all duration-500"
                style={{ width: `${Math.min(goalProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4">
        <Filter className="w-4 h-4 text-white/40" />
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            filterType === 'all' ? 'bg-crimson text-white' : 'bg-white/5 text-white/50 hover:text-white'
          }`}
        >
          TODAS
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            filterType === 'income' ? 'bg-green-500 text-white' : 'bg-white/5 text-white/50 hover:text-white'
          }`}
        >
          RECEITAS
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            filterType === 'expense' ? 'bg-red-500 text-white' : 'bg-white/5 text-white/50 hover:text-white'
          }`}
        >
          DESPESAS
        </button>
        <button
          onClick={() => setFilterType('pending')}
          className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            filterType === 'pending' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white/50 hover:text-white'
          }`}
        >
          PENDENTES
        </button>
      </div>

      {/* Transaction Log */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="space-y-2">
          {filteredFinances.length === 0 ? (
            <div className="text-center py-12 text-white/40 font-mono">
              Nenhuma transação encontrada
            </div>
          ) : (
            filteredFinances.map((finance) => {
              const linkedProject = projects.find(p => p.id === finance.project_id);
              return (
                <div
                  key={finance.id}
                  className="bg-black/20 border border-white/10 hover:border-crimson/50 p-4 rounded-sm transition-all hover:bg-white/5 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-sm ${finance.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          {finance.type === 'income' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold">{finance.title}</div>
                          <div className="text-xs text-white/50 font-mono">
                            {format(new Date(finance.created_at), "d 'de' MMMM, HH:mm", { locale: ptBR })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {finance.category && (
                          <span className={`px-2 py-0.5 border rounded-sm font-mono uppercase ${getCategoryColor(finance.category)}`}>
                            {finance.category}
                          </span>
                        )}
                        {finance.status !== 'paid' && (
                          <span className="px-2 py-0.5 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 rounded-sm font-mono uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {finance.status}
                          </span>
                        )}
                        {linkedProject && (
                          <span className="px-2 py-0.5 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-sm font-mono flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {linkedProject.title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-display font-bold ${finance.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {finance.type === 'income' ? '+' : '-'}R$ {Math.abs(Number(finance.amount)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      {finance.due_date && (
                        <div className="text-xs text-white/40 font-mono flex items-center gap-1 justify-end mt-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(finance.due_date), 'dd/MM/yyyy')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceManager;
