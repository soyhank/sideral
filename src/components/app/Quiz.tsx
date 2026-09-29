"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";
import { Progress, Spinner } from "@/components/ui/display";
import { cx } from "@/lib/format";

export interface QuizQuestion {
  id: string;
  topic?: string;
  q: string;
  options: string[];
}

export interface QuizFeedback {
  id: string;
  chosen: number;
  answer: number;
  correct: boolean;
  explain: string;
}

const TOPIC: Record<string, string> = {
  finanzas: "Finanzas",
  contabilidad: "Contabilidad",
  tributos: "Tributos",
  marketing: "Marketing",
  investigacion: "Investigación de mercados",
  estrategia: "Estrategia",
  operaciones: "Operaciones",
  personas: "Personas",
  ventas: "Ventas",
  emprendimiento: "Emprendimiento",
};

export const topicLabel = (t: string | undefined) => (t ? (TOPIC[t] ?? t) : "");

/** Cuestionario de una pregunta por pantalla. Las respuestas se corrigen en el servidor al terminar. */
export function Quiz({ questions, onSubmit }: { questions: QuizQuestion[]; onSubmit: (answers: number[]) => Promise<void> }) {
  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const q = questions[at];
  const chosen = answers[at];
  const last = at === questions.length - 1;

  const next = async () => {
    if (chosen === undefined) return;
    if (!last) return setAt(at + 1);
    setBusy(true);
    await onSubmit(answers);
    setBusy(false);
  };

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <Progress value={(at + (chosen !== undefined ? 1 : 0)) / questions.length} className="flex-1" height={5} />
        <span className="num text-xs text-ink-3">
          {at + 1} de {questions.length}
        </span>
      </div>
      <div key={q.id} className="animate-rise">
        {q.topic && <div className="eyebrow mb-2">{topicLabel(q.topic)}</div>}
        <h3 className="text-lg leading-snug font-medium sm:text-xl">{q.q}</h3>
        <div className="mt-5 grid gap-2.5" role="radiogroup">
          {q.options.map((o, i) => (
            <button
              key={i}
              role="radio"
              aria-checked={chosen === i}
              onClick={() => setAnswers((a) => Object.assign([...a], { [at]: i }))}
              className={cx(
                "flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left text-[15px] transition",
                chosen === i ? "border-white/60 bg-white/12" : "border-line bg-black/20 hover:border-line-2 hover:bg-white/6",
              )}
            >
              <span className={cx("grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition", chosen === i ? "bg-white text-black" : "bg-white/10 text-ink-2")}>
                {"ABCD"[i]}
              </span>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-3">
        <button className="btn btn-quiet" disabled={at === 0 || busy} onClick={() => setAt(at - 1)}>
          Anterior
        </button>
        <button className="btn btn-primary" disabled={chosen === undefined || busy} onClick={next}>
          {busy ? <Spinner /> : null}
          {last ? "Terminar" : "Siguiente"}
          {!busy && <ArrowRight size={17} />}
        </button>
      </div>
    </div>
  );
}

export function QuizReview({ questions, feedback }: { questions: QuizQuestion[]; feedback: QuizFeedback[] }) {
  return (
    <ol className="space-y-3">
      {questions.map((q, n) => {
        const f = feedback.find((x) => x.id === q.id) ?? feedback[n];
        if (!f) return null;
        return (
          <li key={q.id} className="well rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <span className={cx("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full", f.correct ? "bg-good text-black" : "bg-bad/25 text-bad")}>
                {f.correct ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-snug font-medium">{q.q}</p>
                <p className="mt-2 text-[13px] text-ink-2">
                  <span className="text-ink-3">Respuesta correcta: </span>
                  {q.options[f.answer]}
                </p>
                {!f.correct && f.chosen >= 0 && (
                  <p className="mt-0.5 text-[13px] text-ink-3">
                    Marcaste: <span className="line-through">{q.options[f.chosen]}</span>
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-ink-3">{f.explain}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
