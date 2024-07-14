import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || " ");
    return <>{children}</>;
  } catch (error) {
    // console.log(error);
    redirect("/login");
  }

  return <>{children}</>;
}
