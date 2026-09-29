"use client";

import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/format";

type Kind = "ok" | "error" | "info";
interface Item {
  id: number;
  kind: Kind;
  text: string;
}

const subscribe = () => () => {};

const Ctx = createContext<{ toast: (text: string, kind?: Kind) => void }>({ toast: () => {} });

export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const counter = useRef(0);
  const toast = useCallback((text: string, kind: Kind = "ok") => {
    const id = ++counter.current;
    setItems((list) => [...list.slice(-2), { id, kind, text }]);
    setTimeout(() => setItems((list) => list.filter((i) => i.id !== id)), kind === "error" ? 6000 : 3600);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);
  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[200] flex flex-col items-center gap-2 px-4 lg:bottom-8" aria-live="polite">
            {items.map((i) => (
              <div
                key={i.id}
                role={i.kind === "error" ? "alert" : "status"}
                className={cx(
                  "glass-strong pointer-events-auto flex max-w-md animate-rise items-center gap-3 rounded-2xl px-4 py-3 text-sm",
                  i.kind === "error" && "!border-bad/40",
                )}
              >
                {i.kind === "ok" && <CircleCheck size={18} className="shrink-0 text-good" />}
                {i.kind === "error" && <CircleAlert size={18} className="shrink-0 text-bad" />}
                {i.kind === "info" && <Info size={18} className="shrink-0 text-info" />}
                <span>{i.text}</span>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </Ctx.Provider>
  );
}
