"use client";
import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Add, Logout, Person, Search } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

const Topbar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex justify-between items-center mt-6">
      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="search-icon"
          onClick={() => router.push(`/search/posts/${search}`)}
        />
      </div>
      <button
        className="create-post-btn"
        onClick={() => router.push("/create-post")}
      >
        <Add />
        <p>Create a post</p>
      </button>

      <div className="flex gap-4 md:hidden">
        <Link 
        href={`/profile/${user._id}/posts`}
        >
          <Person sx={{ fontSize: "35px", color: "white" }} />
        </Link>

        <UserButton appearance={{ baseTheme: dark }} />
      </div>
    </div>
  );
};

export default Topbar;
