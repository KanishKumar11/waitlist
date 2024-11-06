"use server";

import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Email from "@/models/Email";
import Wishlist from "@/models/Wishlist";

export async function submitWishlist(wishlistData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in to submit a wishlist");
    }
    await connectDb();

    const newWishlistData = {
      projectName: wishlistData.name,
      heading: {
        text: wishlistData.heading.text,
        fontSize: wishlistData.heading.fontSize,
        isBold: wishlistData.heading.isBold,
        isItalic: wishlistData.heading.isItalic,
        color: wishlistData.heading.color,
      },
      subheading: {
        text: wishlistData.subheading.text,
        fontSize: wishlistData.subheading.fontSize,
        isBold: wishlistData.subheading.isBold,
        isItalic: wishlistData.subheading.isItalic,
        color: wishlistData.subheading.color,
      },
      button: {
        text: wishlistData.button.text,
        fontSize: wishlistData.button.fontSize,
        isBold: wishlistData.button.isBold,
        isItalic: wishlistData.button.isItalic,
        textColor: wishlistData.button.textColor,
        backgroundColor: wishlistData.button.backgroundColor,
      },
      user: session.user.id,
    };

    const newWishlist = new Wishlist(newWishlistData);
    await newWishlist.save();

    return { success: true, id: newWishlist._id };
  } catch (error) {
    console.error("Error submitting wishlist:", error);
    return { success: false, error: error.message };
  }
}
export async function saveEmail(wishlistId, email) {
  try {
    await connectDb();
    const newEmail = new Email({
      wishlistId,
      email,
    });
    await newEmail.save();
    return { success: true };
  } catch (error) {
    console.error("Error saving email:", error);
    return { success: false, error: error.message };
  }
}
export async function updateWishlist(wishlistId, wishlistData) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in to update a wishlist");
    }
    await connectDb();

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { _id: wishlistId, user: session.user.id },
      {
        name: wishlistData.name,
        heading: wishlistData.heading,
        subheading: wishlistData.subheading,
        button: wishlistData.button,
      },
      { new: true }
    );

    if (!updatedWishlist) {
      throw new Error(
        "Wishlist not found or you don't have permission to update it"
      );
    }

    return { success: true, id: updatedWishlist._id };
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return { success: false, error: error.message };
  }
}
