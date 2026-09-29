import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null = null;

/** Cliente con la clave secreta. Solo se usa en el servidor y salta las reglas por fila. */
export function adminClient(): SupabaseClient {
  if (!admin) {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
      db: { schema: "sideral" },
      auth: { persistSession: false, autoRefreshToken: false },
    }) as unknown as SupabaseClient;
  }
  return admin;
}

/** Identifica a la persona a partir del encabezado Authorization de la petición. */
export async function userFromRequest(req: Request): Promise<string | null> {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  const { data, error } = await adminClient().auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  if (data.claims.role !== "authenticated") return null;
  return data.claims.sub as string;
}
