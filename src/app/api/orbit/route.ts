"use server";

import { registerEvent } from "./registerEvent";

/**
 *
 * @param request /
 * @returns JSON: {sup: true}
 * Sample route using nextjs
 */
export async function GET(request: Request) {
  console.log("Hitting server at /api/orbit");
  registerEvent("debug");
  return Response.json({ sup: true });
}
