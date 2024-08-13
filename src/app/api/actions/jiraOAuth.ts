"use server";
import { NextResponse } from "next/server";

export const authorize = async (jiraState: string, authCode: string) => {
  const jiraClientId = process.env.JIRA_OAUTH_CLIENT_ID;
  const jiraClientSecret = process.env.JIRA_OAUTH_CLIENT_SECRET;
  if (!jiraState || !authCode) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://auth.atlassian.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: jiraClientId,
        client_secret: jiraClientSecret,
        code: authCode,
        redirect_uri: "https://api.vexal.io/jira/callback",
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
