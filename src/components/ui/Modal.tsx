"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/format";

interface Props {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  /** Oculta la X y no cierra al tocar fuera (para momentos que hay que leer). */
  locked?: boolean;
  className?: string;
  /** Al cambiar, el contenido vuelve arriba (útil en modales por pasos). */
  scrollKey?: string | number;
}

const SIZES = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };
const subscribe = () => () => {};
const FOCUSABLE = "a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex='-1'])";

export function Modal({ open, onClose, title, children, size = "md", locked, className, scrollKey }: Props) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [scrollKey]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !locked) close.current?.();
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.focus());
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, locked]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-fade bg-black/70 backdrop-blur-sm" onClick={locked ? undefined : onClose} />
      <div
        ref={panel}
        tabIndex={-1}
        className={cx(
          "glass-strong scroll-thin relative max-h-[92dvh] w-full animate-rise overflow-y-auto rounded-t-3xl outline-none sm:rounded-3xl",
          SIZES[size],
          className,
        )}
      >
        {(title || !locked) && (
          <div className="flex items-center justify-between gap-4 px-6 pt-5 pb-3">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {!locked && (
              <button className="btn btn-quiet btn-icon btn-sm -mr-2" onClick={onClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className={cx("px-6 pb-7", !title && locked && "pt-7")}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
