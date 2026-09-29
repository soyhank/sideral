"use client";

import { supabase } from "@/lib/supabase/client";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** Llama a una acción del servidor con la sesión actual. Reintenta una vez si la red falla. */
export async function act<T = unknown>(action: string, body: Record<string, unknown> = {}): Promise<T> {
  const { data } = await supabase().auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new ApiError("Tu sesión venció. Vuelve a ingresar.", 401);
  const send = () =>
    fetch("/api/act", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action, ...body }),
    });
  let res: Response;
  try {
    res = await send();
  } catch {
    await new Promise((r) => setTimeout(r, 600));
    try {
      res = await send();
    } catch {
      throw new ApiError("Sin conexión. Revisa tu internet e inténtalo otra vez.", 0);
    }
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(json?.error ?? "Algo falló. Inténtalo otra vez.", res.status);
  return json as T;
}
