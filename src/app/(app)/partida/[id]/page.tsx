import type { Metadata } from "next";
import { GameScreen } from "@/components/game/GameScreen";

export const metadata: Metadata = { title: "Partida" };

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GameScreen gameId={id} />;
}
