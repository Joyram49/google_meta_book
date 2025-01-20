"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SocialButtons = () => {
  return (
    <>
      <button
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        onClick={async () => await signIn("google", { redirectTo: "/" })}
      >
        <Image src="/assets/google.png" alt="Google" width={20} height={20} />
        Sign in with Google
      </button>
      {/* GitHub Sign-In Button */}
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        onClick={async () => await signIn("github", { redirectTo: "/" })}
      >
        <Image src="/assets/github.png" alt="GitHub" width={20} height={20} />
        Sign in with GitHub
      </button>
    </>
  );
};

export default SocialButtons;
