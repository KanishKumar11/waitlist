import { connectDb } from "@/lib/connectDb";
import Email from "@/models/Email";
import { auth } from "@/auth";

export async function GET(request) {
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { searchParams } = new URL(request.url);
  const url = new URL(request.url);
  const id = url.pathname.split("/")[3];
  console.log(id);
  console.log("======");
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    await connectDb();

    const totalSignups = await Email.countDocuments({ wishlistId: id });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const signupsToday = await Email.countDocuments({
      wishlistId: id,
      createdAt: { $gte: today },
    });

    const emails = await Email.find({ wishlistId: id })
      .sort("-createdAt")
      .skip(page * limit)
      .limit(limit)
      .select("email createdAt -_id")
      .lean();

    const formattedEmails = emails.map((email) => ({
      address: email.email,
      signupDate: email.createdAt,
    }));
    console.log("/////////////////////////");
    console.log(emails);

    return new Response(
      JSON.stringify({
        totalSignups,
        signupsToday,
        emails: formattedEmails,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
