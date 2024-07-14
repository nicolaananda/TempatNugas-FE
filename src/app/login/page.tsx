import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { google } from "../utils/arctic";

export default function page() {
  async function handleLoginWithGogole() {
    "use server";

    const state = generateState();
    const code = generateCodeVerifier();

    cookies().set("code", code);

    const url = await google.createAuthorizationURL(state, code, {
      scopes: ["email", "profile"],
    });
    redirect(url.href);
  }
  return (
    <main className="flex justify-center">
      <form className="pt-2" action={handleLoginWithGogole}>
        <button className=" border-2 border-black p-2 rounded">
          Login with google
        </button>
      </form>
    </main>
  );
}
