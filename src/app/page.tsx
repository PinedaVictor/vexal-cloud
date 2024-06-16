"use client";
import type { ReactNode } from "react";
import { vexalFirebaseApp } from "./firebase";
import { getAuth } from "firebase/auth";

export default function Home(props: { children: ReactNode }) {
  const auth = getAuth(vexalFirebaseApp);
  return (
    <main className=" bg-slate-100 h-screen">
      <div>User Dashboard</div>
    </main>
  );
}
