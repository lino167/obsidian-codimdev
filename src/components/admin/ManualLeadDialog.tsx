import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Save, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export function ManualLeadDialog({ onLeadAdded }: { onLeadAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'new' as const
  })

  const handleSave = async () => {
    if (!data.name) {
      toast.error('Nome obrigatório')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('leads').insert({
        ...data,
        message: 'Inserido manualmente pelo Admin',
        project_type: null
      })

      if (error) throw error

      toast.success('✅ Lead adicionado ao sistema')
      setOpen(false)
      setData({ name: '', email: '', company: '', phone: '', status: 'new' })
      onLeadAdded() // Atualiza a lista pai
    } catch (error) {
      console.error('Error saving lead:', error)
      toast.error('Erro ao salvar lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-crimson hover:bg-red-700 text-white gap-2 border border-white/10 font-mono text-xs uppercase tracking-wider">
          <Plus className="w-4 h-4" /> NOVO LEAD MANUAL
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0A0A0A] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-mono text-crimson uppercase tracking-wider">
            Adicionar Lead Manualmente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label className="text-xs font-mono text-white/60 uppercase">Nome do Cliente *</Label>
            <Input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="bg-black border-white/20 text-white focus:border-crimson"
              placeholder="Nome completo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-white/60 uppercase">Empresa</Label>
              <Input
                value={data.company}
                onChange={(e) => setData({ ...data, company: e.target.value })}
                className="bg-black border-white/20 text-white focus:border-crimson"
                placeholder="Nome da empresa"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-mono text-white/60 uppercase">Telefone / WhatsApp</Label>
              <Input
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="bg-black border-white/20 text-white focus:border-crimson"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-mono text-white/60 uppercase">Email</Label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-black border-white/20 text-white focus:border-crimson"
              placeholder="email@exemplo.com"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-crimson hover:bg-red-700 font-mono uppercase tracking-wider"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> SALVAR NO BANCO
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
