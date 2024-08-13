"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authorize } from "@/app/api/actions/jiraOAuth";
import { redirectUser } from "@/app/api/actions/redirect";
import { Loading } from "@/components/icons/Loading";

// Sample URL [HOST]/jira/callback?state=[STATE]&code=[CODE]
export default function JiraCallback() {
  const searchParams = useSearchParams();
  const jiraState = searchParams.get("state");
  const jiraCode = searchParams.get("code");
  const [oauthToken, setOAuthToken] = useState<{
    access_token: string;
    token_type: string;
  }>();

  const getOAuthData = async (state: string, code: string) => {
    try {
      const token = await authorize(state, code);
      setOAuthToken(token);
    } catch (error) {
      console.error("error authorizing vexal into jira");
    }
  };

  useEffect(() => {
    if (jiraCode !== null && jiraState !== null) {
      getOAuthData(jiraState, jiraCode);
    }
  }, [jiraCode, jiraState]);

  useEffect(() => {
    if (oauthToken) {
      redirectUser(oauthToken.access_token, "Jira-user");
    }
  }, [oauthToken]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Authenticating</p>
          <Loading />
        </div>
      </div>
    </>
  );
}
