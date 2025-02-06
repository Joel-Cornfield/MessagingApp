import SignupForm from "@/components/authForm/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <SignupForm />;
}