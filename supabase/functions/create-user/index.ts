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

    // Verificar la identidad y el rol del usuario que llama
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
      return json({ error: "Solo el dueño puede crear usuarios" }, 403);
    }

    const { username, display_name, password, role } = await req.json();

    if (!username || !display_name || !password) {
      return json({ error: "Faltan datos: username, display_name y password" }, 400);
    }

    if (role !== "admin" && role !== "employee") {
      return json({ error: "El rol debe ser 'admin' o 'employee'" }, 400);
    }

    const email = `${username.toLowerCase()}@epmartinelli.local`;

    // Verificar que el username no esté en uso
    const { data: existing } = await serviceClient
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existing) {
      return json({ error: "El nombre de usuario ya está en uso" }, 409);
    }

    // Crear el usuario de auth con los metadatos que usa el trigger handle_new_user
    const { data, error } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username, display_name, role },
    });

    if (error) return json({ error: error.message }, 400);

    return json({ success: true, id: data.user.id });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Error interno" }, 500);
  }
});