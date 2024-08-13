"use client";
import { Suspense } from "react";
import { Loading } from "@/components/icons/Loading";
import { JiraOAuthFlow } from "@/components/atomic/organisms/JiraOAuthFlow";

// Sample URL [HOST]/jira/callback?state=[STATE]&code=[CODE]
export default function JiraCallback() {
  return (
    <Suspense fallback={<Loading />}>
      <JiraOAuthFlow />
    </Suspense>
  );
}
