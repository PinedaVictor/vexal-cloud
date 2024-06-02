"use server";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { NextRequest } from "next/server";
import { API_ENV } from "../../env";
// import { getFirebaseAdmin, validateToken } from "../firebase-admin/config";
import { validateToken } from "./firebase-admin";
import { headers } from "next/headers";

let client: SecretManagerServiceClient;
const initSecretManager = () => {
  if (!client) {
    try {
      client = new SecretManagerServiceClient({
        credentials: {
          projectId: API_ENV.GCP_PROJECT_ID,
          private_key: API_ENV.SECRETS_MAN_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: API_ENV.SECRETS_MAN_EMAIL,
        },
      });
    } catch (error) {
      console.error("error initiating secrets manager:", error);
    }
  }
  return client;
};

export interface VxReq extends NextRequest {
  user?: DecodedIdToken;
}

export const getSecret = async (sdk: string) => {
  const client = initSecretManager();
  // const validToken = await validateToken("THE Token");
  // console.log("TOK:", validToken);
  // const app = await getFirebaseAdmin();
  // const auth = await getAuth(app);
  // console.log("Auth in getSecret:", auth.verifyIdToken());
  const authorization = headers().get("authorization");
  console.log("Authori:", authorization);
  if (!authorization) {
    return Response.json({ sup: false });
  }
  const u = await validateToken(authorization);
  if (!u) {
    return;
  }
  try {
    const secretVersion = await client.accessSecretVersion({
      name: `projects/${API_ENV.GCP_PROJECT_ID}/secrets/${u.uid}_${sdk}/versions/latest`,
    });
    console.log("The secret:", secretVersion[0].payload?.data?.toString());
    return secretVersion[0].payload?.data?.toString();
  } catch (error) {
    console.error(error);
    // return 'secret not found';
  }
};

export const writeSecret = async () => {
  // initSecretManager();
  // getSecret();
  //   const r = {
  //     parent: "emailplusSID",
  //     secretId: "OPENAI_API_KEY",
  //     secret: "THE SECRET VALUE",
  //   };
  //   const secretCreate = await client.createSecret({
  //     parent: "",
  //     secret: { labels: { sdk: "openai" }, name: "THE KEY NAME??" },
  //     secretId: "",
  //   });
  //   console.log("Secret create:", secretCreate);
};