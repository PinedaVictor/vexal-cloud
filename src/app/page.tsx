"use client";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { vexalFirebaseApp } from "./firebase";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";

export default function Home(props: { children: ReactNode }) {
  const router = useRouter();
  const auth = getAuth(vexalFirebaseApp);
  const uiConfig = {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      // List of OAuth providers supported.
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  };
  useEffect(() => {
    let ui: firebaseui.auth.AuthUI | null;
    // Check if an AuthUI instance already exists
    if (!firebaseui.auth.AuthUI.getInstance()) {
      ui = new firebaseui.auth.AuthUI(auth);
    } else {
      ui = firebaseui.auth.AuthUI.getInstance();
    }

    if (ui == null) {
      return;
    }
    ui.start("#firebaseui-auth-container", uiConfig);
    // Handle redirect on FirebaseUI user change event
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard" || "/"); // Redirect to signInSuccessUrl or fallback to '/'
      }
    });

    return () => {
      unregisterAuthObserver(); // Clean up Firebase auth observer
      ui!.reset(); // Reset FirebaseUI instance
    };
  }, []);
  return (
    <body>
      <div className=" bg-slate-100 flex justify-center items-center min-h-screen">
        <div>Hello from Vexal</div>
        <div>
          <div id="firebaseui-auth-container" />
        </div>
      </div>
    </body>
  );
}
