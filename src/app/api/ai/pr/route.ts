"use server";
import { NextRequest } from "next/server";
import { validateToken } from "../../libs/gcp/firebase-admin";
import { headers } from "next/headers";
import { getSecret } from "../../libs/gcp/secrets-manager";
import { generateResponse } from "../../libs/openai/openai";

/**
 *
 * @param request /ai/pr
 * @returns JSON: {sup: true}
 * Sample route using nextjs
 */
export async function GET(request: NextRequest) {
  console.log("Hitting server at /api/ai/pr");
  const user = await validateToken(headers().get("authorization"));
  if (!user) {
    return Response.json({ sup: false });
  }
  console.log("The user:", user);
  const openaiSecret = await getSecret(user.uid, "openai");
  if (!openaiSecret) {
    return Response.json({
      error:
        "Unable to find your api key. Make sure you have enabled and added your openai key",
    });
  }
  const reposonse = await generateResponse(openaiSecret, ``);
  return Response.json({ sup: true });
}
