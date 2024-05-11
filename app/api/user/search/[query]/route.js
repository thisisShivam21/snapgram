import User from "@/lib/models/User"
import { connectToDB } from "@/lib/mongodb/mongoose"

export const GET = async (req, { params }) => {
    const { query } = params

    try {
        await connectToDB()

        const searchedUsers = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { firstName: { $regex: query, $options: "i" } },
                { lastName: { $regex: query, $options: "i" } },
            ]
        }).populate("posts savedPosts likedPosts followers following").exec()

        return new Response(JSON.stringify(searchedUsers), { status: 200 })

    } catch (error) {
        console.log("Error occured in GET() :: api/user/search/[query]/route.js", error)
        return new Response("Failed to get Users by search.", { status: 500 })
    }
}