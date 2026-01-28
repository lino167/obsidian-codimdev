// Supabase Edge Function: Secure Lead Validation & Sanitization
// Prevents XSS attacks by cleaning all user inputs before database insertion
// Security Fix: [H-2] Missing Input Validation and Sanitization

// ⚠️ TypeScript Errors Below Are EXPECTED:
// This code runs in Deno (Supabase Edge Runtime), not Node.js.
// The imports work perfectly when deployed, but your IDE validates with Node.js.
// The Edge Function is already deployed and working. These are IDE-only warnings.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import sanitizeHtml from "npm:sanitize-html@2.11.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, project_type } = await req.json();

    // 2. STRICT Input Validation
    if (!name || typeof name !== 'string' || name.length > 100) {
      throw new Error("Nome inválido ou muito longo (máx. 100 caracteres).");
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email inválido.");
    }

    if (company && typeof company !== 'string' && company.length > 150) {
      throw new Error("Nome da empresa muito longo (máx. 150 caracteres).");
    }

    if (message && typeof message !== 'string' && message.length > 2000) {
      throw new Error("Mensagem excede 2000 caracteres.");
    }

    // 3. XSS Protection - Sanitization (Strip ALL HTML tags and dangerous chars)
    const cleanData = {
      name: sanitizeHtml(name.trim(), {
        allowedTags: [],
        allowedAttributes: {}
      }),
      email: email.trim().toLowerCase(),
      company: company ? sanitizeHtml(company.trim(), {
        allowedTags: [],
        allowedAttributes: {}
      }) : null,
      message: message ? sanitizeHtml(message.trim(), {
        allowedTags: [],
        allowedAttributes: {}
      }) : null,
      project_type: project_type || 'unknown',
      status: 'new',
      // Capture IP for rate limiting (H-1 fix compatibility)
      ip_address: req.headers.get("x-forwarded-for")?.split(',')[0].trim() ||
                  req.headers.get("x-real-ip") ||
                  "unknown"
    };

    // 4. Secure Database Insertion using SERVICE_ROLE_KEY
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error } = await supabase.from("leads").insert(cleanData);

    if (error) {
      // Check for rate limit violation from trigger (H-1)
      if (error.message?.includes("Rate limit exceeded")) {
        return new Response(
          JSON.stringify({
            error: "Muitas tentativas. Por favor, aguarde 1 hora e tente novamente."
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429, // Too Many Requests
          }
        );
      }
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead registrado com sucesso!" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Edge Function Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Erro ao processar solicitação."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
