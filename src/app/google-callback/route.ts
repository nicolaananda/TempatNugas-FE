import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { google } from "../utils/arctic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") as string;
  const codeFormCookies = cookies().get("code")?.value as string;

  const tokens = await google.validateAuthorizationCode(code, codeFormCookies);

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const user = await res.json();

  //   console.log(user);

  const payload = {
    id: "id123",
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || " ", {});
  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/dashboard");
}
