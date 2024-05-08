import User from "@/lib/models/User";
import { connectToDB } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,
          firstName: first_name,
          lastName: last_name,
          profilePhoto: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },

      { upsert: true, new: true } // if user doesn't exist , create new one
    );

    await user.save();

    return user;
  } catch (error) {
    console.log("Error in CreateOrUpdateUser() ",error);
  }
};

export const deleteUser = async (id) => {
    try {
      await connectToDB();
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error(error);
    }
  };
