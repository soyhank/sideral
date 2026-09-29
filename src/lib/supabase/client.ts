"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Cliente del navegador. Lee con las reglas de seguridad por fila del esquema sideral. */
export function supabase(): SupabaseClient {
  if (!client) {
    client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
      db: { schema: "sideral" },
    }) as unknown as SupabaseClient;
  }
  return client;
}
