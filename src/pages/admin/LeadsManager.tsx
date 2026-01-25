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
  Mail,
  User,
  Calendar,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Phone,
} from 'lucide-react'
import { toast } from 'sonner'

interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  message: string | null
  status: 'new' | 'contacted' | 'converted' | 'lost'
}

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'new' as 'new' | 'contacted' | 'converted' | 'lost',
  })

  const fetchLeads = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch leads')
    } else {
      setLeads(data || [])
      setFilteredLeads(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter)
    }

    setFilteredLeads(filtered)
  }, [searchTerm, statusFilter, leads])

  const handleStatusChange = async (
    id: string,
    newStatus: 'new' | 'contacted' | 'converted' | 'lost',
  ) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update lead status')
    } else {
      toast.success('Lead status updated')
      fetchLeads()
    }
  }

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      message: lead.message || '',
      status: lead.status,
    })
    setIsEditModalOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead) return

    const { error } = await supabase
      .from('leads')
      .update({
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        message: editForm.message,
        status: editForm.status,
      })
      .eq('id', selectedLead.id)

    if (error) {
      toast.error('Failed to update lead')
    } else {
      toast.success('Lead updated successfully')
      setIsEditModalOpen(false)
      setSelectedLead(null)
      fetchLeads()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return

    const { error } = await supabase.from('leads').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete lead')
    } else {
      toast.success('Lead deleted successfully')
      fetchLeads()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400'
      case 'contacted':
        return 'bg-amber-500/10 text-amber-400'
      case 'converted':
        return 'bg-emerald-500/10 text-emerald-400'
      case 'lost':
        return 'bg-red-500/10 text-red-400'
      default:
        return 'bg-neutral-500/10 text-neutral-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Leads Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-950 border-neutral-800"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-neutral-950 border-neutral-800">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
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
                <th className="h-12 px-4 align-middle font-medium text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-neutral-500">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-neutral-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-800 transition-colors hover:bg-neutral-900/20"
                  >
                    <td className="p-4 align-middle font-medium text-neutral-200">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-neutral-500" />
                        {lead.name}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-500" />
                        {lead.email}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Select
                        value={lead.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            lead.id,
                            value as 'new' | 'contacted' | 'converted' | 'lost',
                          )
                        }
                      >
                        <SelectTrigger className="w-[100px] bg-neutral-950 border-neutral-800 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 align-middle text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/10"
                          onClick={() => {
                            setSelectedLead(lead)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/10"
                          onClick={() => handleEdit(lead)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/10"
                          onClick={() => handleDelete(lead.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-400">
                    Name
                  </label>
                  <p className="text-neutral-100">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400">
                    Status
                  </label>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-400">
                  Email
                </label>
                <p className="text-neutral-100">{selectedLead.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-400">
                  Phone
                </label>
                <p className="text-neutral-100">{selectedLead.phone || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-400">
                  Message
                </label>
                <p className="text-neutral-100 whitespace-pre-wrap">
                  {selectedLead.message || 'No message provided'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-400">
                    Created
                  </label>
                  <p className="text-neutral-100 text-sm">
                    {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>
                {'contacted_at' in selectedLead &&
                  selectedLead.contacted_at && (
                    <div>
                      <label className="text-sm font-medium text-neutral-400">
                        Last Contacted
                      </label>
                      <p className="text-neutral-100 text-sm">
                        {new Date(
                          selectedLead.contacted_at as string,
                        ).toLocaleString()}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                required
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="bg-neutral-950 border-neutral-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="bg-neutral-950 border-neutral-800"
                  placeholder="+55..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={editForm.message}
                onChange={(e) =>
                  setEditForm({ ...editForm, message: e.target.value })
                }
                className="bg-neutral-950 border-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm({
                    ...editForm,
                    status: value as 'new' | 'contacted' | 'converted' | 'lost',
                  })
                }
              >
                <SelectTrigger className="bg-neutral-950 border-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="border-neutral-800"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update Lead
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
