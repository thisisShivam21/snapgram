"use client";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Add, Logout, Search } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Topbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="search-icon" onClick={() => {}} />
      </div>
      <button
        className="create-post-btn"
        onClick={() => router.push("/create-post")}
      >
        <Add />
        <p>Create a post</p>
      </button>

      <div className="flex gap-3">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer items-center md:hidden">
              <Logout sx={{ color: "white", fontSize: "32px" }} />
            </div>
          </SignOutButton>
        </SignedIn>

        <Link href="/">
          <Image
            src="/assets/mithudon2.jpg"
            alt="profile-photo"
            width={50}
            height={50}
            className="rounded-full md:hidden"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
