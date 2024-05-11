"use client"

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Posting = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: post });

  const router = useRouter()

  const handlePublish = async (data) => {
    // console.log(data)
    try {
        const postForm = new FormData()

        postForm.append("creatorId", data.creatorId)
        postForm.append("caption", data.caption)
        postForm.append("tag", data.tag)

        if(typeof data.postData !== "string") {
          postForm.append("postPhoto", data.postPhoto[0])
        } else {
          postForm.append("postPhoto", data.postPhoto)
        }

        const response = await fetch(apiEndpoint, {
            method: "POST",
            body: postForm,
        })

        if(response.ok) {
            router.push(`/profile/${data.creatorId}`)
        }
    } catch (error) {
        console.log("Error occured in handlePublish() :: Posting() ", error.message);
    }
  }

  return (
    <form 
    onSubmit={handleSubmit(handlePublish)}
    className="flex flex-col gap-7 pb-24 ">
      <label
        className="flex gap-4 items-center text-light-1 cursor-pointer"
        htmlFor="photo"
      >
        {watch("postPhoto") ? (
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto")}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg "
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg "
            />
          )
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: "100px", color: "white" }}
          />
        )}

        <p>Upload a photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value.length === 0) ||
              value === "undefined"
            ) {
              return "A photo is required!";
            }
            return true;
          },
        })}
        type="file"
        style={{ display: "none" }}
        id="photo"
      />
      {errors.postPhoto && (
        <p className="text-red-500">{errors.postPhoto.message}</p>
      )}
      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required.",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          id="caption"
          type="text"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input"
        />
        {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        />

        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-slate-900 text-light-1"
      >
        Publish
      </button>
    </form>
  );
};

export default Posting;
