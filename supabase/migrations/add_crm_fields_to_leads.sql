-- COMM-LINK CRM - Database Migration
-- Upgrade leads table with CRM management fields

-- Add new columns for CRM functionality
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS project_type TEXT,
ADD COLUMN IF NOT EXISTS estimated_budget TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS proposal_link TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.leads.status IS 'Lead status: new, contacted, negotiating, converted, archived';
COMMENT ON COLUMN public.leads.project_type IS 'Project type: landing_page, webapp, ecommerce, mobile_app, other';
COMMENT ON COLUMN public.leads.admin_notes IS 'Private admin notes for internal use';
COMMENT ON COLUMN public.leads.proposal_link IS 'Link to the proposal document sent to client';

-- Security policy for admin updates
DROP POLICY IF EXISTS "Admin can update leads" ON public.leads;
CREATE POLICY "Admin can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true);

-- Create index for faster status filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
