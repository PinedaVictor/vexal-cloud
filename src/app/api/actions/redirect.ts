"use server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const redirectUser = async (token: string, userId: string) => {
  const callbackUrl = process.env.CALLBACK_URL;

  if (!callbackUrl || !token || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }
  const redirectUrl = `${callbackUrl}?token=${token}&userId=${userId}`;
  redirect(redirectUrl);
};
