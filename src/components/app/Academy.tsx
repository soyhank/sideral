"use client";

import { Gamepad2, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { topicLabel } from "@/components/app/Quiz";
import { Empty, PageHeader } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import type { Concept } from "@/content/types";
import { TRIVIA_TOPICS } from "@/content/types";
import { cx } from "@/lib/format";

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function Academy({ concepts }: { concepts: Concept[] }) {
  const [area, setArea] = useState<string>("todas");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Concept | null>(null);
  const list = useMemo(() => {
    const q = fold(query.trim());
    return concepts.filter((c) => (area === "todas" || c.area === area) && (!q || fold(`${c.title} ${c.summary}`).includes(q)));
  }, [concepts, area, query]);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Teoría breve" title="Academia" text="Setenta conceptos de negocios explicados en corto, con un ejemplo de la región y su uso dentro del simulador. Consúltalos mientras juegas." />

      <div className="relative mb-4">
        <Search size={17} className="absolute top-1/2 left-4 -translate-y-1/2 text-ink-3" />
        <input className="field !pl-11" placeholder="Buscar un concepto: FODA, IGV, punto de equilibrio" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Buscar concepto" />
      </div>
      <div className="scroll-none -mx-4 mb-6 flex gap-1.5 overflow-x-auto px-4">
        {["todas", ...TRIVIA_TOPICS].map((t) => (
          <button key={t} onClick={() => setArea(t)} aria-pressed={area === t} className={cx("chip !h-8 shrink-0 !px-3 transition", area === t && "chip-white")}>
            {t === "todas" ? "Todas las áreas" : topicLabel(t)}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Empty title="Sin resultados" text="Prueba con otra palabra o cambia de área." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <button key={c.id} onClick={() => setOpen(c)} className="panel panel-hover rounded-3xl p-5 text-left">
              <div className="eyebrow">{topicLabel(c.area)}</div>
              <h3 className="mt-2 text-[15px] leading-snug font-semibold">{c.title}</h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-3">{c.summary}</p>
            </button>
          ))}
        </div>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title={open ? topicLabel(open.area) : ""} size="md">
        {open && (
          <article>
            <h2 className="display text-4xl leading-tight">{open.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed font-medium text-ink">{open.summary}</p>
            <div className="mt-4 space-y-3">
              {open.body.split(/\n\n+/).map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-2 uppercase">
                <MapPin size={14} />
                Ejemplo
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{open.example}</p>
            </div>
            <div className="mt-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-2 uppercase">
                <Gamepad2 size={14} />
                En el simulador
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{open.inGame}</p>
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
}
