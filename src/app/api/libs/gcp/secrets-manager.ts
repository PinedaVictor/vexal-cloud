"use server";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { API_ENV } from "../../env";

// TODO: FIXME: This will be needed for UI. For now keep
// let client: SecretManagerServiceClient;
// const initSecretManager = () => {
//   if (!client) {
//     try {
//       client = new SecretManagerServiceClient({
//         credentials: {
//           projectId: API_ENV.GCP_PROJECT_ID,
//           private_key: API_ENV.SECRETS_MAN_PRIVATE_KEY.replace(/\\n/g, "\n"),
//           client_email: API_ENV.SECRETS_MAN_EMAIL,
//         },
//       });
//     } catch (error) {
//       console.error("error initiating secrets manager:", error);
//     }
//   }
//   return client;
// };

// export const getSecret = async (uid: string, sdk: string) => {
//   const client = initSecretManager();
//   try {
//     const secretVersion = await client.accessSecretVersion({
//       name: `projects/${API_ENV.GCP_PROJECT_ID}/secrets/${uid}_${sdk}/versions/latest`,
//     });
//     return secretVersion[0].payload?.data?.toString();
//   } catch (error) {
//     console.error(error);
//     return "secret not found";
//   }
// };
