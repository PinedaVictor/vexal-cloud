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
  try {
    const data = await registerEvent("debug");
    console.log("Data:", data);
    return Response.json({ sup: data?.status });
  } catch (error) {
    console.error("error registering event:", error);
  }
  return Response.json({ sup: true });
}
