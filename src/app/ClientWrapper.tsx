"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function ClientWrapper({ children} : Readonly<{children: React.ReactNode;}>) {
  useAuthRedirect();

  return <>{children}</>;
}