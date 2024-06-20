"use client";
import { vexalFirebaseApp } from "@/app/firebase";
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const auth = getAuth(vexalFirebaseApp);
  return (
    <main className=" bg-slate-100 h-screen">
      <div>Dashboard page</div>
    </main>
  );
}
