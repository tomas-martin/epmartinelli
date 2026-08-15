import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return json({ error: "No autenticado" }, 401);

    const anonClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authErr } = await anonClient.auth.getUser(token);
    if (authErr || !user) return json({ error: "Sesión inválida" }, 401);

    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    const { data: callerProfile } = await serviceClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (callerProfile?.role !== "owner") {
      return json({ error: "Solo el dueño puede eliminar usuarios" }, 403);
    }

    const { id } = await req.json();
    if (!id) return json({ error: "Falta el id del usuario" }, 400);

    const { data: target } = await serviceClient
      .from("profiles")
      .select("role")
      .eq("id", id)
      .single();

    // No permitir eliminar al dueño ni a uno mismo
    if (!target) return json({ error: "Usuario no encontrado" }, 404);
    if (target.role === "owner") return json({ error: "No se puede eliminar al dueño" }, 400);
    if (id === user.id) return json({ error: "No podés eliminar tu propio usuario" }, 400);

    // Borrar el auth user (el perfil se borra en cascada por la FK)
    const { error } = await serviceClient.auth.admin.deleteUser(id);
    if (error) return json({ error: error.message }, 400);

    return json({ success: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Error interno" }, 500);
  }
});