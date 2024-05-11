import User from "@/lib/models/User"
import { connectToDB } from "@/lib/mongodb/mongoose"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const user = await User.findOne({ clerkId: params.id }).populate("followers following").exec()

        return new Response(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        console.log("Error occurred in User/[id] ", error)
        return new Response("Failed to get user.", { status: 500 })
    }
}