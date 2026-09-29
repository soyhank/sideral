import "server-only";

import type { Concept, Dilemma, FodaCase, News, TriviaQ } from "./types";
import comercial from "./dilemmas/comercial";
import cumplimiento from "./dilemmas/cumplimiento";
import industriasA from "./dilemmas/industrias-a";
import industriasB from "./dilemmas/industrias-b";
import operaciones from "./dilemmas/operaciones";
import personasFinanzas from "./dilemmas/personas-finanzas";
import entorno from "./news/entorno";
import bancoA from "./trivia/banco-a";
import bancoB from "./trivia/banco-b";
import academia from "./concepts/academia";
import casos from "./foda/casos";

/** Biblioteca completa. Solo se carga en el servidor para no enviar las respuestas al navegador. */
export const DILEMMAS: Dilemma[] = [...cumplimiento, ...personasFinanzas, ...comercial, ...operaciones, ...industriasA, ...industriasB];
export const NEWS: News[] = entorno;
export const TRIVIA: TriviaQ[] = [...bancoA, ...bancoB];
export const CONCEPTS: Concept[] = academia;
export const FODA: FodaCase[] = casos;

export const DILEMMA_BY_ID = new Map(DILEMMAS.map((d) => [d.id, d]));
export const TRIVIA_BY_ID = new Map(TRIVIA.map((t) => [t.id, t]));
