import { connectDb } from "@/lib/connectDb";
import Wishlist from "@/models/Wishlist";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[3];
  try {
    await connectDb();
    const wishlist = await Wishlist.findById(id);

    if (!wishlist) {
      return new Response(JSON.stringify({ error: "Wishlist not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(wishlist);
    return new Response(JSON.stringify(wishlist), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
