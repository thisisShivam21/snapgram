import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    const allUsers = await User.find()
      .populate("posts savedPosts likedPosts followers following")
      .exec();
    
    return new Response(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (error) {
    console.log("Error occured in GET() :: api/user/route.js", error)
    return new Response("Failed to get All Users.", { status: 500 })
}
};
