import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  Search, Radio, UserCheck, ArrowRight, FileText, Mail, Phone,
  Building2, DollarSign, Zap, Archive, ExternalLink, Clock,
  Circle, Loader2, MessageSquare, StickyNote, Send, Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ManualLeadDialog } from '@/components/admin/ManualLeadDialog';

interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string | null;
  ip_address: string | null;
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'archived';
  company: string | null;
  phone: string | null;
  project_type: 'landing_page' | 'webapp' | 'ecommerce' | 'mobile_app' | 'other' | null;
  estimated_budget: string | null;
  admin_notes: string | null;
  proposal_link: string | null;
}

type FilterStatus = 'all' | 'new' | 'contacted' | 'negotiating' | 'converted' | 'archived';
type ActiveTab = 'message' | 'intel' | 'proposal';

const CommLink = () => {
  const navigate = useNavigate();

  // State Management
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [activeTab, setActiveTab] = useState<ActiveTab>('message');

  // Fetch Leads
  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      if (data && data.length > 0) setSelectedLead(data[0]);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  // Update Lead Field
  async function updateLeadField(leadId: number, field: string, value: unknown) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ [field]: value })
        .eq('id', leadId);

      if (error) throw error;

      // Update local state
      setLeads(leads.map(l => l.id === leadId ? { ...l, [field]: value } : l));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, [field]: value });
      }

      toast.success('Updated successfully');
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update');
    }
  }

  // Archive Lead
  async function archiveLead(leadId: number) {
    await updateLeadField(leadId, 'status', 'archived');
  }

  // KILLER FEATURE: Promote Lead to Project
  async function handlePromoteToProject() {
    if (!selectedLead) return;

    // Navigate to ProjectsManager with pre-fill data
    navigate('/admin/projects', {
      state: {
        prefill: {
          title: `Project: ${selectedLead.company || selectedLead.name}`,
          client_name: selectedLead.name,
          short_description: `Initiated from Lead #${selectedLead.id}.\n\nOriginal Request:\n${selectedLead.message || 'No message provided'}`,
          budget: parseFloat(selectedLead.estimated_budget?.replace(/[^0-9.]/g, '') || '0') || null,
        },
        openWizard: true,
        sourceLeadId: selectedLead.id
      }
    });

    // Update lead status to 'converted'
    await updateLeadField(selectedLead.id, 'status', 'converted');

    toast.success('🚀 Lead promoted! Opening project wizard...');
  }

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Status Colors
  function getStatusColor(status: string) {
    const colors = {
      new: { bg: 'bg-crimson/10', text: 'text-crimson', border: 'border-crimson', glow: 'shadow-crimson/50' },
      contacted: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500', glow: 'shadow-cyan-500/50' },
      negotiating: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500', glow: 'shadow-orange-500/50' },
      converted: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500', glow: 'shadow-green-500/50' },
      archived: { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500', glow: '' },
    };
    return colors[status as keyof typeof colors] || colors.new;
  }

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const style = getStatusColor(status);
    return (
      <span className={`${style.bg} ${style.text} text-[10px] font-bold px-2 py-0.5 border ${style.border} font-mono uppercase`}>
        {status}
      </span>
    );
  };

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
        <div className="flex items-center gap-3">
          <Radio className="w-6 h-6 text-crimson" />
          <div>
            <h1 className="text-xl font-display font-bold tracking-tight">COMM-LINK / INTELLIGENCE HUB</h1>
            <p className="text-xs text-white/50 font-mono">Incoming Transmissions & Lead Management</p>
          </div>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT SIDEBAR - Signals Feed (30%) */}
        <div className="w-[30%] border-r border-white/10 flex flex-col bg-black/20">

          {/* Search & Filter */}
          <div className="p-4 border-b border-white/10 space-y-3">
            {/* Manual Lead Button */}
            <ManualLeadDialog onLeadAdded={fetchLeads} />

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Filter Signals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors font-mono"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors font-mono uppercase"
            >
              <option value="all">ALL SIGNALS</option>
              <option value="new">NEW</option>
              <option value="contacted">CONTACTED</option>
              <option value="negotiating">NEGOTIATING</option>
              <option value="converted">CONVERTED</option>
              <option value="archived">ARCHIVED</option>
            </select>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto">
            {filteredLeads.length === 0 ? (
              <div className="p-6 text-center text-white/40 font-mono text-sm">
                No signals detected
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                const isNew = lead.status === 'new';
                const style = getStatusColor(lead.status);

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`
                      p-4 border-b border-white/5 cursor-pointer transition-all
                      hover:bg-white/5 relative
                      ${isSelected ? 'bg-white/10 border-l-4 ' + style.border : 'border-l-4 border-transparent'}
                      ${isNew ? style.glow + ' shadow-lg' : ''}
                    `}
                  >
                    {/* NEW Badge */}
                    {isNew && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[8px] font-bold px-1.5 py-0.5 bg-crimson text-white font-mono animate-pulse">
                          NEW
                        </span>
                      </div>
                    )}

                    {/* Name & Company */}
                    <div className="font-bold text-sm mb-1 pr-12">{lead.name}</div>
                    {lead.company && (
                      <div className="text-xs text-white/60 mb-2 font-mono">{lead.company}</div>
                    )}

                    {/* Message Snippet */}
                    <p className="text-xs text-white/50 line-clamp-1 mb-2">
                      {lead.message || 'No message'}
                    </p>

                    {/* Footer: Status + Time */}
                    <div className="flex items-center justify-between gap-2">
                      <StatusBadge status={lead.status} />
                      <span className="text-[10px] text-white/40 font-mono">
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Decoder (70%) */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {!selectedLead ? (
            <div className="flex-1 flex items-center justify-center text-white/40 font-mono">
              Select a signal to decode
            </div>
          ) : (
            <>
              {/* Top Bar - Contact Info */}
              <div className="border-b border-white/10 bg-black/20 px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-display font-bold mb-1">{selectedLead.name}</h2>
                    {selectedLead.company && (
                      <div className="flex items-center gap-2 text-white/60 mb-3">
                        <Building2 className="w-4 h-4" />
                        <span className="font-mono text-sm">{selectedLead.company}</span>
                      </div>
                    )}

                    {/* Status Dropdown */}
                    <div className="inline-block">
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLeadField(selectedLead.id, 'status', e.target.value)}
                        className={`
                          ${getStatusColor(selectedLead.status).bg}
                          ${getStatusColor(selectedLead.status).text}
                          border ${getStatusColor(selectedLead.status).border}
                          px-3 py-1.5 text-xs font-bold font-mono uppercase rounded-sm
                          focus:outline-none focus:ring-2 focus:ring-crimson/50
                        `}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="negotiating">NEGOTIATING</option>
                        <option value="converted">CONVERTED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`mailto:${selectedLead.email}`)}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-colors rounded-sm"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => archiveLead(selectedLead.id)}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-colors rounded-sm"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-white/10 bg-black/10 px-6">
                <div className="flex gap-6">
                  {(['message', 'intel', 'proposal'] as ActiveTab[]).map((tab) => {
                    const icons = { message: MessageSquare, intel: StickyNote, proposal: FileText };
                    const Icon = icons[tab];
                    const labels = { message: 'MESSAGE LOG', intel: 'INTEL & NOTES', proposal: 'PROPOSAL' };

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                          flex items-center gap-2 px-4 py-3 border-b-2 transition-colors font-mono text-xs uppercase
                          ${activeTab === tab
                            ? 'border-crimson text-white'
                            : 'border-transparent text-white/50 hover:text-white/80'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {labels[tab]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* TAB 1: MESSAGE LOG */}
                {activeTab === 'message' && (
                  <div className="space-y-6">
                    {/* Original Message */}
                    <div>
                      <div className="text-xs text-white/50 font-mono mb-2 flex items-center gap-2">
                        <Circle className="w-2 h-2 fill-current" />
                        INTERCEPTED TRANSMISSION
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-sm p-4 font-mono text-sm">
                        {selectedLead.message || <span className="text-white/40">No message content</span>}
                      </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                          <Mail className="w-3 h-3" />
                          <span className="font-mono">EMAIL</span>
                        </div>
                        <div className="text-sm font-mono">{selectedLead.email}</div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                          <Phone className="w-3 h-3" />
                          <span className="font-mono">PHONE</span>
                        </div>
                        <input
                          type="text"
                          value={selectedLead.phone || ''}
                          onChange={(e) => updateLeadField(selectedLead.id, 'phone', e.target.value)}
                          placeholder="Add phone number"
                          className="w-full bg-transparent text-sm font-mono focus:outline-none"
                        />
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                          <Clock className="w-3 h-3" />
                          <span className="font-mono">RECEIVED</span>
                        </div>
                        <div className="text-sm font-mono">{new Date(selectedLead.created_at).toLocaleString()}</div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                          <Radio className="w-3 h-3" />
                          <span className="font-mono">IP ADDRESS</span>
                        </div>
                        <div className="text-sm font-mono">{selectedLead.ip_address || 'Unknown'}</div>
                      </div>
                    </div>

                    {/* Reply Button */}
                    {selectedLead.phone && (
                      <button
                        onClick={() => window.open(`https://wa.me/${selectedLead.phone?.replace(/\D/g, '')}`)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-sm font-mono text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        REPLY VIA WHATSAPP
                      </button>
                    )}
                  </div>
                )}

                {/* TAB 2: INTEL & NOTES */}
                {activeTab === 'intel' && (
                  <div className="space-y-6">
                    {/* Project Type */}
                    <div>
                      <label className="text-xs text-white/50 font-mono mb-2 block">PROJECT TYPE</label>
                      <select
                        value={selectedLead.project_type || ''}
                        onChange={(e) => updateLeadField(selectedLead.id, 'project_type', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors"
                      >
                        <option value="">Select type...</option>
                        <option value="landing_page">Landing Page</option>
                        <option value="webapp">Web Application</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="mobile_app">Mobile App</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div>
                      <label className="text-xs text-white/50 font-mono mb-2 block flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        ESTIMATED BUDGET
                      </label>
                      <input
                        type="text"
                        value={selectedLead.estimated_budget || ''}
                        onChange={(e) => updateLeadField(selectedLead.id, 'estimated_budget', e.target.value)}
                        placeholder="e.g., R$ 5.000 - R$ 10.000"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors font-mono text-green-400"
                      />
                    </div>

                    {/* Admin Notes */}
                    <div>
                      <label className="text-xs text-white/50 font-mono mb-2 block">ADMIN NOTES (PRIVATE)</label>
                      <textarea
                        value={selectedLead.admin_notes || ''}
                        onChange={(e) => updateLeadField(selectedLead.id, 'admin_notes', e.target.value)}
                        placeholder="Internal notes, observations, strategy..."
                        rows={8}
                        className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors font-mono resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: PROPOSAL */}
                {activeTab === 'proposal' && (
                  <div className="space-y-6">
                    {/* Proposal Link */}
                    <div>
                      <label className="text-xs text-white/50 font-mono mb-2 block">PROPOSAL DOCUMENT LINK</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={selectedLead.proposal_link || ''}
                          onChange={(e) => updateLeadField(selectedLead.id, 'proposal_link', e.target.value)}
                          placeholder="https://..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-crimson transition-colors font-mono"
                        />
                        {selectedLead.proposal_link && (
                          <button
                            onClick={() => window.open(selectedLead.proposal_link!, '_blank')}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-colors rounded-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Proposal Status */}
                    {selectedLead.proposal_link ? (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                          <Circle className="w-2 h-2 fill-current" />
                          Proposal document linked
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                        <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
                          <Circle className="w-2 h-2" />
                          No proposal document yet
                        </div>
                      </div>
                    )}

                    {/* Quick Proposal Template */}
                    <div className="bg-black/40 border border-white/10 rounded-sm p-4">
                      <div className="text-xs text-white/50 font-mono mb-3">QUICK TEMPLATE</div>
                      <div className="space-y-2 text-sm font-mono text-white/60">
                        <div>• Project Scope: {selectedLead.project_type || 'TBD'}</div>
                        <div>• Timeline: 4-6 weeks</div>
                        <div>• Investment: {selectedLead.estimated_budget || 'TBD'}</div>
                        <div>• Deliverables: Full source code, hosting setup, documentation</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* KILLER FEATURE: Conversion Footer */}
              {selectedLead.status !== 'converted' && selectedLead.status !== 'archived' && (
                <div className="border-t-2 border-crimson/30 bg-gradient-to-br from-crimson/10 via-black/40 to-green-500/10 p-6">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-4">
                      <div className="text-xs text-white/50 font-mono mb-1">READY FOR DEPLOYMENT?</div>
                      <div className="text-sm text-white/80">Convert this lead into an active project with one click</div>
                    </div>

                    <button
                      onClick={handlePromoteToProject}
                      className="
                        w-full bg-gradient-to-r from-crimson to-green-500 hover:from-crimson/80 hover:to-green-400
                        text-white font-display font-bold text-lg py-4 rounded-sm
                        flex items-center justify-center gap-3
                        transition-all duration-300 transform hover:scale-[1.02]
                        shadow-lg shadow-crimson/30 hover:shadow-xl hover:shadow-crimson/50
                        border border-white/20
                      "
                    >
                      <Zap className="w-6 h-6" />
                      PROMOTE TO ACTIVE PROJECT
                      <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="text-center mt-3 text-xs text-white/40 font-mono">
                      This will transfer all data to the Project Wizard
                    </div>
                  </div>
                </div>
              )}

              {/* Converted/Archived Notice */}
              {(selectedLead.status === 'converted' || selectedLead.status === 'archived') && (
                <div className={`
                  border-t border-white/10 p-6 text-center
                  ${selectedLead.status === 'converted' ? 'bg-green-500/10' : 'bg-gray-500/10'}
                `}>
                  <div className={`text-sm font-mono ${selectedLead.status === 'converted' ? 'text-green-400' : 'text-gray-400'}`}>
                    {selectedLead.status === 'converted'
                      ? '✅ This lead has been converted to a project'
                      : '📦 This lead has been archived'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommLink;
