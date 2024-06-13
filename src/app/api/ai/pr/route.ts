"use server";
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "../../libs/gcp/firebase-admin";
import { headers } from "next/headers";
import { getSecret } from "../../libs/gcp/secrets-manager";
import { generateResponse } from "../../libs/openai/openai";
import { API_ENV } from "../../env";

// TODO: Verify and test. As of the 06/12/24 this functionality is not needed
// in this server. Integrated in the Go App

/**
 *
 * @param request /ai/pr
 * @returns JSON: {sup: true}
 * Sample route using nextjs
 */
export async function GET(request: NextRequest) {
  console.log("Hitting server at /api/ai/pr");
  console.log("ai/pr:", headers().get("authorization"));
  const user = await validateToken(headers().get("authorization"));
  if (!user) {
    console.log("No valid user found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  console.log("The user:", user);
  const openaiSecret = await getSecret(user.uid, "openai");
  if (!openaiSecret) {
    return NextResponse.json(
      {
        error:
          "Unable to find your api key. Make sure you have enabled and added your openai key",
      },
      { status: 400 }
    );
  }
  const content = headers().get("content");
  const prTemplate = headers().get("template");
  if (prTemplate) {
    const msg = await generateResponse(
      openaiSecret,
      `${API_ENV.PR_WITH_TEMPLATE} ${content}`
    );
    return Response.json(msg);
  }
  const msg = await generateResponse(openaiSecret, `${API_ENV.PR} ${content}`);
  return Response.json({ data: msg });
}
