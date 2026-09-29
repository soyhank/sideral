import type { Metadata } from "next";
import { Academy } from "@/components/app/Academy";
import { CONCEPTS } from "@/content";

export const metadata: Metadata = { title: "Academia" };

export default function AcademyPage() {
  return <Academy concepts={CONCEPTS} />;
}
