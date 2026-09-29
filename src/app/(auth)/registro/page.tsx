import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/app/AuthForm";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="skeleton h-[560px] !rounded-[2rem]" />}>
      <AuthForm mode="registro" />
    </Suspense>
  );
}
