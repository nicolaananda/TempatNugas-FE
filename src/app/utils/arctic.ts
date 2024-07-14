import { Google } from "arctic";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

// console.log({ clientId, clientSecret, redirectUri });

if (!clientId || !clientSecret || !redirectUri) {
  throw new Error("Missing environment variables for Google OAuth");
}

export const google = new Google(clientId, clientSecret, redirectUri);
