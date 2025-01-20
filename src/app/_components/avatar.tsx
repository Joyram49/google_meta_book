"use client";

import { User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AvatarProps = {
  image: string;
};

const Avatar = ({ image }: AvatarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#15162c] bg-[#2e026d] focus:outline-none focus:ring focus:ring-gray-500"
      >
        {/* Image or Fallback Icon */}
        <Image
          src={image}
          alt="User Avatar"
          width={40}
          height={40}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <UserIcon className="h-6 w-6 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded border border-gray-300 bg-white shadow-lg">
          <ul className="py-1">
            <li>
              <button
                onClick={() => signOut()}
                className="flex w-full justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </li>
            <li>
              <Link
                href="/saved-books"
                className="flex w-full justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Books
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
