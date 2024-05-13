import Post from "@/lib/models/Post";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { writeFile } from "fs/promises";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate("creator likes")
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log("Error occured in GET() :: api/post/[id]/route.js", error);
    return new Response("Failed to get post by id.", { status: 500 });
  }
};

export const POST = async (req,  { params }) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();
  try {
    await connectToDB();
    // get the data from req
    const data = await req.formData();

    let postPhoto = data.get("postPhoto");

    if (typeof postPhoto !== "string") {
      const bytes = await postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const postPhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        postPhoto.name
      );

      await writeFile(postPhotoPath, buffer);

      postPhoto = `/uploads/${postPhoto.name}`;
    }

    const post = await Post.findByIdAndUpdate(
      params.id,
      {
        $set: {
          caption: data.get("caption"),
          tag: data.get("tag"),
          postPhoto: postPhoto,
        },
      },
      { new: true, useFindAndModify: false }
    );

    await post.save();

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log("Error occured in api/post/[id] :: POST() ", error);
    return new Response("Failed to update a post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  

}