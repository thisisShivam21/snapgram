"use client";
import Loader from "@/components/Loader";
import PostCard from "@/components/cards/PostCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPost = () => {
  const { query } = useParams();
const {user , isLoaded  } = useUser()
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const getSearchedPosts = async () => {
    const response = await fetch(`/api/post/search/${query}`);
    const data = await response.json();
    setSearchedPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedPosts();
  }, [query]);



  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className={`tab bg-purple-1`} href={`/search/posts/${query}`}>
          Posts
        </Link>
        <Link className={`tab bg-dark-2`} href={`/search/people/${query}`}>
          People
        </Link>
      </div>

      {searchedPosts.map((post) => (
        <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user}/>
      ))}
    </div>
  );
};

export default SearchPost;
