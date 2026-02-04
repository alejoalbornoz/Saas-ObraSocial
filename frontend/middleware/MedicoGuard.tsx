"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function MedicoGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !hasRole("MEDICO"))) {
      router.replace("/");
    }
  }, [loading, user, hasRole, router]);

  if (loading) return null;
  if (!user || !hasRole("MEDICO")) return null;

  return <>{children}</>;
}
