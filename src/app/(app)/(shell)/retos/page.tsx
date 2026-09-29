"use client";

import { ArrowRight, Brain, Calculator, Check, Dumbbell, Flame, Grid2x2, Lightbulb, Scale, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useApp } from "@/components/app/AppProvider";
import { Quiz, QuizReview, topicLabel, type QuizFeedback, type QuizQuestion } from "@/components/app/Quiz";
import { Segmented } from "@/components/ui/controls";
import { Empty, PageHeader, Spinner } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { TRIVIA_TOPICS } from "@/content/types";
import type { PublicDilemma } from "@/engine/types";
import { celebrate } from "@/components/game/Reveal";
import { VERDICT } from "@/components/game/Cards";
import { act, ApiError } from "@/lib/api";
import { cx } from "@/lib/format";
import type { AchievementDef } from "@/lib/gamification";

type Kind = "trivia" | "dilema" | "foda" | "calculo" | "entrenar";
type FodaKind = "F" | "O" | "D" | "A";

interface Done<T> {
  score: number;
  data: { answers: unknown; feedback: T; xp: number };
}

interface DailyData {
  day: string;
  completed: number;
  trivia: { done: Done<{ items: QuizFeedback[]; total: number }> | null; questions: QuizQuestion[] };
  dilema: {
    done: Done<{ choice: string; verdict: string; outcome: string; lesson: string; concept: string; best: { id: string; label: string }; options: { id: string; verdict: string }[] }> | null;
    dilemma: PublicDilemma;
  };
  foda: {
    done: Done<{ items: { key: number; chosen: FodaKind | null; kind: FodaKind; correct: boolean; why: string }[]; total: number }> | null;
    case: { id: string; company: string; industry: string; context: string; items: { key: number; text: string }[] };
  };
  calculo: { done: Done<{ items: QuizFeedback[]; total: number }> | null; problems: QuizQuestion[] };
}

interface SubmitResult {
  score: number;
  xp: number;
  feedback: unknown;
  levelUp: boolean;
  streak: number;
  achievements: AchievementDef[];
}

const TABS: { id: Kind; label: string; icon: typeof Brain; text: string }[] = [
  { id: "trivia", label: "Trivia", icon: Brain, text: "Cinco preguntas de negocios. 10 XP por acierto y 20 más si no fallas ninguna." },
  { id: "dilema", label: "Dilema", icon: Scale, text: "Una situación real de gestión. Decide y descubre qué pasó. Hasta 30 XP." },
  { id: "foda", label: "FODA", icon: Grid2x2, text: "Clasifica ocho afirmaciones de una empresa. 5 XP por acierto y 15 más si aciertas todas." },
  { id: "calculo", label: "Cálculo", icon: Calculator, text: "Tres problemas con números: equilibrio, IGV, márgenes. 12 XP por acierto." },
  { id: "entrenar", label: "Entrenar", icon: Dumbbell, text: "Practica por tema, sin límite. Suma experiencia las primeras cuatro veces del día." },
];

const FODA_LABEL: Record<FodaKind, string> = { F: "Fortaleza", O: "Oportunidad", D: "Debilidad", A: "Amenaza" };

function ResultHeader({ score, total, xp, again }: { score: number; total: number; xp: number; again?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl bg-white/6 p-4 ring-1 ring-white/12">
      <div className="num display text-5xl">
        {score}
        <span className="text-2xl text-ink-3"> / {total}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{score === total ? "Todo correcto" : score >= total / 2 ? "Bien hecho" : "A repasar"}</div>
        <div className="text-xs text-ink-3">{again ?? "Mañana hay un reto nuevo."}</div>
      </div>
      {xp > 0 && <span className="chip chip-white num">+{xp} XP</span>}
    </div>
  );
}

function Badges({ list }: { list: AchievementDef[] }) {
  if (!list.length) return null;
  return (
    <div className="mb-4 space-y-2">
      {list.map((a) => (
        <div key={a.key} className="flex animate-pop items-center gap-3.5 rounded-2xl bg-gradient-to-r from-white/14 to-white/4 p-3.5 ring-1 ring-white/25">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black">
            <Icon name={a.icon} size={18} />
          </span>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em] text-ink-3 uppercase">Insignia nueva</div>
            <div className="text-sm font-semibold">{a.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Challenges() {
  const params = useSearchParams();
  const { userId, refresh, profile } = useApp();
  const { toast } = useToast();
  const { mutate: mutateAll } = useSWRConfig();
  const [tab, setTab] = useState<Kind>("trivia");
  const { data, error, mutate } = useSWR(userId ? ["daily", userId] : null, () => act<DailyData>("daily.get"), { revalidateOnFocus: false });
  const [badges, setBadges] = useState<AchievementDef[]>([]);

  useEffect(() => {
    const r = params.get("reto") as Kind | null;
    if (r && TABS.some((t) => t.id === r)) setTab(r);
  }, [params]);

  const submit = async (kind: Exclude<Kind, "entrenar">, answers: unknown) => {
    try {
      const res = await act<SubmitResult>("daily.submit", { kind, answers });
      setBadges(res.achievements);
      if (res.levelUp || res.achievements.length) celebrate(res.levelUp);
      await mutate();
      refresh();
      mutateAll((k) => Array.isArray(k) && k[0] === "daily-done");
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo registrar tu respuesta.", "error");
      await mutate();
    }
  };

  const doneCount = data ? [data.trivia.done, data.dilema.done, data.foda.done, data.calculo.done].filter(Boolean).length : 0;
  const isDone = (k: Kind) => (data && k !== "entrenar" ? Boolean(data[k].done) : false);
  const info = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Cinco minutos al día"
        title="Retos del día"
        text="Cuatro retos cortos que cambian cada día y son los mismos para todos. Mantienen tu racha y afinan tu criterio."
        action={
          <div className="flex gap-2">
            <span className="chip num">
              <Flame size={13} className={(profile?.streak ?? 0) > 0 ? "text-amber" : ""} />
              {profile?.streak ?? 0} {(profile?.streak ?? 0) === 1 ? "día" : "días"}
            </span>
            <span className="chip num">{doneCount} de 4 hoy</span>
          </div>
        }
      />

      <div className="scroll-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setBadges([]);
            }}
            aria-pressed={tab === t.id}
            className={cx("panel flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium transition", tab === t.id ? "!border-white/55 !bg-white/12" : "text-ink-2")}
          >
            <t.icon size={16} />
            {t.label}
            {isDone(t.id) && (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-good text-black">
                <Check size={10} strokeWidth={3.5} />
              </span>
            )}
          </button>
        ))}
      </div>

      <section className="glass rounded-3xl p-5 sm:p-7">
        <p className="mb-5 text-sm leading-relaxed text-ink-3">{info.text}</p>
        <Badges list={badges} />
        {error ? (
          <Empty title="No pudimos cargar los retos" text="Revisa tu conexión e inténtalo otra vez." action={<button className="btn btn-primary" onClick={() => mutate()}>Reintentar</button>} />
        ) : !data && tab !== "entrenar" ? (
          <div className="grid place-items-center py-16 text-ink-3">
            <Spinner size={24} />
          </div>
        ) : (
          <>
            {tab === "trivia" && data && (data.trivia.done ? (
              <>
                <ResultHeader score={data.trivia.done.score} total={5} xp={data.trivia.done.data.xp} />
                <QuizReview questions={data.trivia.questions} feedback={data.trivia.done.data.feedback.items} />
              </>
            ) : (
              <Quiz questions={data.trivia.questions} onSubmit={(a) => submit("trivia", a)} />
            ))}

            {tab === "calculo" && data && (data.calculo.done ? (
              <>
                <ResultHeader score={data.calculo.done.score} total={3} xp={data.calculo.done.data.xp} />
                <QuizReview questions={data.calculo.problems} feedback={data.calculo.done.data.feedback.items} />
              </>
            ) : (
              <Quiz questions={data.calculo.problems} onSubmit={(a) => submit("calculo", a)} />
            ))}

            {tab === "dilema" && data && <DilemmaChallenge data={data.dilema} onSubmit={(a) => submit("dilema", a)} />}
            {tab === "foda" && data && <FodaChallenge data={data.foda} onSubmit={(a) => submit("foda", a)} />}
            {tab === "entrenar" && <Training onXp={refresh} />}
          </>
        )}
      </section>
    </div>
  );
}

function DilemmaChallenge({ data, onSubmit }: { data: DailyData["dilema"]; onSubmit: (choice: string) => Promise<void> }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const done = data.done?.data.feedback ?? null;
  const d = data.dilemma;
  return (
    <div>
      <div className="eyebrow mb-2">Concepto: {d.concept}</div>
      <h3 className="display text-3xl leading-tight">{d.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{d.situation}</p>
      <div className="mt-5 grid gap-2.5" role="radiogroup">
        {d.options.map((o) => {
          const verdict = done?.options.find((x) => x.id === o.id)?.verdict;
          const picked = done ? done.choice === o.id : choice === o.id;
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={picked}
              disabled={!!done}
              onClick={() => setChoice(o.id)}
              className={cx(
                "flex items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition disabled:cursor-default",
                picked ? "border-white/60 bg-white/12" : "border-line bg-black/20",
                !done && !picked && "hover:border-line-2 hover:bg-white/6",
              )}
            >
              <span className={cx("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold uppercase", picked ? "bg-white text-black" : "bg-white/10 text-ink-2")}>{o.id}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{o.label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-3">{o.detail}</span>
              </span>
              {verdict && <span className={cx("chip shrink-0", VERDICT[verdict].chip)}>{VERDICT[verdict].label.replace("Decisión ", "").replace(" decisión", "")}</span>}
            </button>
          );
        })}
      </div>
      {done ? (
        <div className="mt-5 animate-rise space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cx("chip", VERDICT[done.verdict].chip)}>{VERDICT[done.verdict].label}</span>
            <span className="chip chip-white num">+{data.done!.data.xp} XP</span>
          </div>
          <p className="text-sm leading-relaxed text-ink-2">{done.outcome}</p>
          <div className="flex gap-2.5 rounded-2xl bg-white/4 px-3.5 py-3 text-[13px] leading-relaxed text-ink-2 ring-1 ring-white/8">
            <Lightbulb size={16} className="mt-px shrink-0 text-warn" />
            <span>
              {done.lesson}
              {done.verdict !== "optima" && done.best.id !== done.choice && <> La mejor salida era: {done.best.label}.</>}
            </span>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-primary mt-6 w-full sm:w-auto"
          disabled={!choice || busy}
          onClick={async () => {
            setBusy(true);
            await onSubmit(choice!);
            setBusy(false);
          }}
        >
          {busy ? <Spinner /> : null}
          Decidir
          {!busy && <ArrowRight size={17} />}
        </button>
      )}
    </div>
  );
}

function FodaChallenge({ data, onSubmit }: { data: DailyData["foda"]; onSubmit: (a: Record<string, FodaKind>) => Promise<void> }) {
  const [answers, setAnswers] = useState<Record<string, FodaKind>>({});
  const [busy, setBusy] = useState(false);
  const done = data.done?.data.feedback ?? null;
  const c = data.case;
  const filled = Object.keys(answers).length;
  return (
    <div>
      <div className="eyebrow mb-2">Caso</div>
      <h3 className="display text-3xl leading-tight">{c.company}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.context}</p>
      {done && <div className="mt-5"><ResultHeader score={data.done!.score} total={8} xp={data.done!.data.xp} /></div>}
      {!done && (
        <p className="mt-4 rounded-2xl bg-white/4 px-3.5 py-3 text-xs leading-relaxed text-ink-3 ring-1 ring-white/8">
          Pregúntate dos cosas: ¿depende de la empresa o viene de afuera? ¿La favorece o la perjudica? Lo interno es fortaleza o debilidad; lo externo, oportunidad o amenaza.
        </p>
      )}
      <ol className="mt-5 space-y-3">
        {c.items.map((item, n) => {
          const f = done?.items.find((x) => x.key === item.key);
          const value = f ? f.chosen : answers[String(item.key)];
          return (
            <li key={item.key} className="well rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="num mt-0.5 text-xs text-ink-4">{n + 1}</span>
                <p className="min-w-0 flex-1 text-sm leading-snug">{item.text}</p>
                {f && (
                  <span className={cx("grid h-6 w-6 shrink-0 place-items-center rounded-full", f.correct ? "bg-good text-black" : "bg-bad/25 text-bad")}>
                    {f.correct ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5" role="radiogroup" aria-label={`Afirmación ${n + 1}`}>
                {(["F", "O", "D", "A"] as FodaKind[]).map((k) => (
                  <button
                    key={k}
                    role="radio"
                    aria-checked={value === k}
                    disabled={!!done}
                    onClick={() => setAnswers((a) => ({ ...a, [String(item.key)]: k }))}
                    className={cx(
                      "h-9 rounded-xl text-xs font-medium transition disabled:cursor-default",
                      f && f.kind === k ? "bg-good/20 text-[#8eeaa6] ring-1 ring-good/40" : value === k ? "bg-white text-black" : "bg-white/6 text-ink-2 ring-1 ring-white/8",
                      !done && value !== k && "hover:bg-white/12",
                    )}
                  >
                    <span className="sm:hidden">{k}</span>
                    <span className="hidden sm:inline">{FODA_LABEL[k]}</span>
                  </button>
                ))}
              </div>
              {f && <p className="mt-2.5 text-xs leading-relaxed text-ink-3">{FODA_LABEL[f.kind]}. {f.why}</p>}
            </li>
          );
        })}
      </ol>
      {!done && (
        <button
          className="btn btn-primary mt-6 w-full sm:w-auto"
          disabled={filled < c.items.length || busy}
          onClick={async () => {
            setBusy(true);
            await onSubmit(answers);
            setBusy(false);
          }}
        >
          {busy ? <Spinner /> : null}
          {filled < c.items.length ? `Faltan ${c.items.length - filled}` : "Revisar mis respuestas"}
        </button>
      )}
    </div>
  );
}

function Training({ onXp }: { onXp: () => void }) {
  const { toast } = useToast();
  const [topic, setTopic] = useState<string>("todos");
  const [level, setLevel] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [result, setResult] = useState<{ score: number; total: number; xp: number; items: QuizFeedback[]; left: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const start = async () => {
    setBusy(true);
    setResult(null);
    try {
      const res = await act<{ questions: QuizQuestion[] }>("training.get", { topic: topic === "todos" ? "" : topic, level });
      setQuestions(res.questions);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo preparar la práctica.", "error");
    }
    setBusy(false);
  };

  if (questions && !result)
    return (
      <Quiz
        questions={questions}
        onSubmit={async (answers) => {
          try {
            const res = await act<{ score: number; total: number; xp: number; items: QuizFeedback[]; left: number }>("training.check", {
              answers: questions.map((q, i) => ({ id: q.id, chosen: answers[i] })),
            });
            setResult(res);
            if (res.xp > 0) onXp();
          } catch (e) {
            toast(e instanceof ApiError ? e.message : "No se pudo corregir.", "error");
          }
        }}
      />
    );

  return (
    <div>
      {result && questions && (
        <div className="mb-7">
          <ResultHeader
            score={result.score}
            total={result.total}
            xp={result.xp}
            again={result.left > 0 ? `Te quedan ${result.left} prácticas con experiencia hoy.` : "Ya usaste las prácticas con experiencia de hoy. Puedes seguir practicando."}
          />
          <QuizReview questions={questions} feedback={result.items} />
          <div className="hairline my-7" />
        </div>
      )}
      <div className="space-y-5">
        <div>
          <div className="mb-2 text-sm font-medium">Tema</div>
          <div className="flex flex-wrap gap-1.5">
            {["todos", ...TRIVIA_TOPICS].map((t) => (
              <button key={t} onClick={() => setTopic(t)} aria-pressed={topic === t} className={cx("chip !h-8 !px-3 transition", topic === t && "chip-white")}>
                {t === "todos" ? "Todos" : topicLabel(t)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Nivel</div>
          <Segmented
            value={level}
            onChange={setLevel}
            options={[
              { value: 1, label: "Básico" },
              { value: 2, label: "Hasta intermedio" },
              { value: 0, label: "Todos" },
            ]}
          />
        </div>
        <button className="btn btn-primary" onClick={start} disabled={busy}>
          {busy ? <Spinner /> : <Dumbbell size={17} />}
          {result ? "Otra ronda de 8 preguntas" : "Empezar 8 preguntas"}
        </button>
      </div>
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <Suspense fallback={null}>
      <Challenges />
    </Suspense>
  );
}
