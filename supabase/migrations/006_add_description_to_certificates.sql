-- Adicionar campo de descrição na tabela de certificados
ALTER TABLE public.certificates
ADD COLUMN IF NOT EXISTS description TEXT;

COMMENT ON COLUMN public.certificates.description IS 'Descrição detalhada do certificado ou curso';
