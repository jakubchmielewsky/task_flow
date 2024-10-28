"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function Home() {
  useRequireAuth();

  return (
    <></>
  );
}
