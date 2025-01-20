import { auth } from "@/server/auth";
import Link from "next/link";
import Avatar from "./avatar";

async function Header() {
  const session = await auth();

  return (
    <header className="bg-gradient-to-b from-[#15162c] to-[#2e026d] text-white">
      <div className="container mx-auto flex items-center justify-between py-6">
        <Link href="/" className="font-semibold">
          <h1>BookFinder</h1>
        </Link>
        <nav className="md:justify-self-end">
          {session?.user?.email ? (
            <Avatar image={session.user.image ?? "/assets/dummy-avatar.jpg"} />
          ) : (
            <div className="group relative inline-block rounded-lg bg-gradient-to-r from-[#15162c] to-[#2e026d] px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2e026d] focus:ring-offset-2">
              <Link
                href="/sign-in"
                className="flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
