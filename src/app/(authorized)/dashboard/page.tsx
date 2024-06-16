"use client";
import type { ReactNode } from "react";
import { vexalFirebaseApp } from "@/app/firebase";
import { getAuth, signOut } from "firebase/auth";

export default function Dashboard(props: { children: ReactNode }) {
  const auth = getAuth(vexalFirebaseApp);
  return (
    <main className=" bg-slate-100 h-screen">
      <div>Dashboard page</div>
    </main>
  );
}
