"use client"

import { Bookmark, BookmarkBorder, BorderColor, Favorite, FavoriteBorder } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const PostCard = ({post, creator, loggedInUser}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
  return (
    <div className='w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2'>
      <div className='flex justify-between'>
        <Link href={`/profile/${creator._id}/posts`}>
            <div className='flex gap-3 items-center'>
                <Image 
                loader={() => creator?.profilePhoto}
                src={creator.profilePhoto}
                alt='profile-photo'
                width={50}
                height={50}
                className='rounded-full'
                />
                <div className='flex flex-col gap-1'>
                    <p className='text-small-semibold text-light-1'>{creator.firstName} {creator.lastName}</p>
                    <p className='text-subtle-medium text-light-3'>@{creator.username}</p>
                </div>
            </div>
        </Link>

        {loggedInUser?.id === creator?.clerkId && (
            <Link href={`/edit-post/${post._id}`}>
                <BorderColor sx={{ color: "white", cursor: "pointer" }} />
            </Link>
        )}
      </div>

      <p className='text-body-normal text-light-1 max-sm:text-small-normal'>{post.caption}</p>
      <Image 
        loader={() => post?.postPhoto}
        src={post.postPhoto}
        alt='profile-photo'
        width={200}
        height={150}
        className='rounded-lg w-full'
      />
      <p className='text-base-semibold text-purple-1 max-sm:text-small-normal'>{post.tag}</p>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
            {!isLiked ? (
                <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} />
            ) : (
                <Favorite sx={{ color: "red", cursor: "pointer" }}  />
            )}
            <p className='text-light-1'>{post.likes.length}</p>
        </div>

        {loggedInUser.id !== creator.clerkId && (
            (isSaved ? (
                <Bookmark sx={{ color: "purple", cursor: "pointer" }} />
            ) : (
                <BookmarkBorder sx={{ color: "white", cursor: "pointer" }} />
            ))
        )}
      </div>
    </div>
  )
}

export default PostCard
