import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SocialButtons from "./social-buttons";

const SignIn = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-700">
          Sign In
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Choose a provider to sign in with your account.
        </p>

        <SocialButtons />
      </div>
    </div>
  );
};

export default SignIn;
