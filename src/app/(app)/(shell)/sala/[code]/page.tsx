import type { Metadata } from "next";
import { Lobby } from "@/components/app/Lobby";

export const metadata: Metadata = { title: "Sala" };

export default async function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <Lobby code={code.toUpperCase()} />;
}
