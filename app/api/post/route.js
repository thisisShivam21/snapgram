import Post from "@/lib/models/Post"
import { connectToDB } from "@/lib/mongodb/mongoose"

export const GET = async (req) => {
    try {
        await connectToDB()

        const feedPosts = await Post.find().populate("creator likes").exec()

        return new Response(JSON.stringify(feedPosts), { status: 200 })
    } catch (error) {
        console.log("Error occured in GET() :: api/route.js", error)
        return new Response("Failed to fetch all Feed Posts.", { status: 500 })
    }
}