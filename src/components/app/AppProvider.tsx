"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import { ToastProvider } from "@/components/ui/Toast";
import { act } from "@/lib/api";
import type { Profile } from "@/lib/game/types";
import { supabase } from "@/lib/supabase/client";

interface AppState {
  userId: string | null;
  email: string | null;
  profile: Profile | null;
  loading: boolean;
  /** Vuelve a leer el perfil (por ejemplo, después de ganar experiencia). */
  refresh: () => Promise<void>;
  /** Actualiza el perfil en pantalla de inmediato, antes de que responda el servidor. */
  patch: (p: Partial<Profile>) => void;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AppState>({
  userId: null,
  email: null,
  profile: null,
  loading: true,
  refresh: async () => {},
  patch: () => {},
  signOut: async () => {},
});

export const useApp = () => useContext(Ctx);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase().from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

function Inner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: mutateAll } = useSWRConfig();
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const ensured = useRef(false);

  useEffect(() => {
    let alive = true;
    supabase()
      .auth.getSession()
      .then(({ data }) => {
        if (!alive) return;
        setUserId(data.session?.user.id ?? null);
        setEmail(data.session?.user.email ?? null);
        setReady(true);
      });
    const { data: sub } = supabase().auth.onAuthStateChange((event, session) => {
      setUserId(session?.user.id ?? null);
      setEmail(session?.user.email ?? null);
      setReady(true);
      if (event === "SIGNED_OUT") mutateAll(() => true, undefined, { revalidate: false });
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [mutateAll]);

  useEffect(() => {
    if (ready && !userId) router.replace(`/login?volver=${encodeURIComponent(pathname)}`);
  }, [ready, userId, router, pathname]);

  const { data: profile, mutate, isLoading } = useSWR(userId ? ["profile", userId] : null, () => fetchProfile(userId!), {
    revalidateOnFocus: true,
    dedupingInterval: 4000,
  });

  // Si la cuenta existe pero el perfil no, se crea una sola vez.
  useEffect(() => {
    if (!userId || isLoading || profile !== null || ensured.current) return;
    ensured.current = true;
    act("profile.ensure", {})
      .then(() => mutate())
      .catch(() => {});
  }, [userId, profile, isLoading, mutate]);

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);
  const patch = useCallback(
    (p: Partial<Profile>) => {
      mutate((current) => (current ? { ...current, ...p } : current), { revalidate: false });
    },
    [mutate],
  );
  const signOut = useCallback(async () => {
    await supabase().auth.signOut();
    router.replace("/");
  }, [router]);

  const value = useMemo<AppState>(
    () => ({ userId, email, profile: profile ?? null, loading: !ready || (Boolean(userId) && profile === undefined), refresh, patch, signOut }),
    [userId, email, profile, ready, refresh, patch, signOut],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: true, errorRetryCount: 2, keepPreviousData: true }}>
      <ToastProvider>
        <Inner>{children}</Inner>
      </ToastProvider>
    </SWRConfig>
  );
}
