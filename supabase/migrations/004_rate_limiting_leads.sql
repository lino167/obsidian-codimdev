-- Rate Limiting Protection Against Spam (Security Fix: H-1)
-- Prevents lead submission flood attacks by limiting to 5 submissions per IP per hour
-- Applied: 2026-01-28

-- 1. Create Rate Limiting Tracking Table
CREATE TABLE IF NOT EXISTS public.lead_rate_limit (
  ip_address TEXT PRIMARY KEY,
  submission_count INT DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for security best practices
ALTER TABLE public.lead_rate_limit ENABLE ROW LEVEL SECURITY;

-- Policy: Allow system-level access (trigger needs this)
CREATE POLICY "System can track rate limits" ON public.lead_rate_limit
  USING (true)
  WITH CHECK (true);

-- 2. Rate Limit Check Function (Trigger Function)
CREATE OR REPLACE FUNCTION check_lead_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow manual admin insertions (no IP)
  IF NEW.ip_address IS NULL THEN
    RETURN NEW;
  END IF;

  -- Check if IP exceeded 5 submissions in last hour
  IF EXISTS (
    SELECT 1 FROM public.lead_rate_limit
    WHERE ip_address = NEW.ip_address
    AND submission_count >= 5
    AND window_start > NOW() - INTERVAL '1 hour'
  ) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;

  -- Update or Insert counter
  INSERT INTO public.lead_rate_limit (ip_address)
  VALUES (NEW.ip_address)
  ON CONFLICT (ip_address) DO UPDATE
  SET submission_count = lead_rate_limit.submission_count + 1,
      window_start = CASE
        WHEN lead_rate_limit.window_start < NOW() - INTERVAL '1 hour'
        THEN NOW() -- Reset window after 1 hour
        ELSE lead_rate_limit.window_start
      END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Apply Trigger to Leads Table
DROP TRIGGER IF EXISTS enforce_lead_rate_limit ON public.leads;

CREATE TRIGGER enforce_lead_rate_limit
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION check_lead_rate_limit();

-- Documentation
COMMENT ON TABLE public.lead_rate_limit IS 'Rate limiting table: tracks IP submission frequency to prevent spam attacks';
COMMENT ON FUNCTION check_lead_rate_limit IS 'Enforces max 5 lead submissions per IP per hour';
