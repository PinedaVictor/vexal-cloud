"use client";
import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { vexalFirebaseApp } from "@/app/firebase";
import { redirectUser } from "@/app/api/actions/redirect";
import { Loading } from "@/components/icons/Loading";

export default function SignInCLI() {
  const [loading, setLoading] = useState(true);
  const auth = getAuth(vexalFirebaseApp);

  useEffect(() => {
    const SignInOAuth2 = async () => {
      const provider = new GoogleAuthProvider();
      try {
        signInWithPopup(auth, provider);
      } catch (error) {
        console.log("Error redirecting user:", error);
      }
    };

    // Listen for the redirect result
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        setLoading(false);
        redirectUser(token, user.uid);
      } else {
        // No user signed in, continue authentication flow
        SignInOAuth2();
      }
    });
    return () => {
      unregisterAuthObserver();
    };
  }, [auth]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          {loading ? <p>Authenticating</p> : <p>Redirecting</p>}
          <Loading />
        </div>
      </div>
    </>
  );
}
