import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/app/AuthForm";

export const metadata: Metadata = { title: "Ingresar" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="skeleton h-[420px] !rounded-[2rem]" />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
