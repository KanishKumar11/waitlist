import { connectDb } from "@/lib/connectDb";
import Wishlist from "@/models/Wishlist";
import { auth } from "@/auth";
import Email from "@/models/Email";

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectDb();

    const wishlists = await Wishlist.find({ user: session.user.id }).lean();

    // For each wishlist, count the number of users
    const wishlistsWithUserCount = await Promise.all(
      wishlists.map(async (wishlist) => {
        const userCount = await Email.countDocuments({
          wishlistId: wishlist._id,
        });
        return {
          ...wishlist,
          users: userCount,
        };
      })
    );

    return new Response(JSON.stringify(wishlistsWithUserCount), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
