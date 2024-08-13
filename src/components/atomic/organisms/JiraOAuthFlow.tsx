"use client";
import { type FC } from "react";
import { useEffect, useState } from "react";
import { Loading } from "@/components/icons/Loading";
import { useSearchParams } from "next/navigation";
import { authorize } from "@/app/api/actions/jiraOAuth";
import { redirectUser } from "@/app/api/actions/redirect";

export const JiraOAuthFlow: FC = () => {
  const searchParams = useSearchParams();
  const jiraState = searchParams.get("state");
  const jiraCode = searchParams.get("code");
  const [oauthToken, setOAuthToken] = useState<{
    access_token: string;
    token_type: string;
  }>();

  const getOAuthData = async (state: string, code: string) => {
    try {
      const oauthData = await authorize(state, code);
      setOAuthToken({
        access_token: oauthData.access_token,
        token_type: oauthData.token_type,
      });
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
      console.log("Access");
      redirectUser(oauthToken.access_token, "Jira-user");
    }
  }, [oauthToken]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p>Authenticating</p>
        <Loading />
      </div>
    </div>
  );
};
