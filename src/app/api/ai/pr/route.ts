"use server";
import { NextRequest } from "next/server";
import { validateToken } from "../../libs/gcp/firebase-admin";
import { headers } from "next/headers";

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

  return Response.json({ sup: true });
}
