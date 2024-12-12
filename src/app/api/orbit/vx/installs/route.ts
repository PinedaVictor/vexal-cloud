"use server";

import { registerEvent } from "../../registerEvent";

/**
 *
 * @param request /
 * @returns JSON: {sup: true}
 * Sample route using nextjs
 */
export async function GET(request: Request) {
  console.log("Hitting server at /api/orbit/vx/installs");
  //   https://api.vexal.io/api/orbit/vx/installs
  registerEvent("installs");
  return Response.json({ sup: true });
}
