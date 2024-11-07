"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { saveEmail } from "@/actions/wishlist";
import { motion } from "framer-motion"; // Install framer-motion if not already installed
import Link from "next/link";

export default function EmbeddedWishlist({ params }) {
  const [wishlist, setWishlist] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/wishlist/${params.id}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data))
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [params.id]);

  if (!wishlist) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const result = await saveEmail(params.id, email);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      // Handle error (you might want to show an error message to the user)
      console.error("Failed to save email:", result.error);
    }
  };

  return (
    <div className="flex items-center justify-center py-5">
      <BackgroundGradient className="rounded-[20px] p-4 bg-white dark:bg-zinc-900">
        <div className="gap-2 rounded-md w-max mx-auto p-10 flex flex-col">
          {!isSubmitted ? (
            <>
              <h2
                style={{
                  fontSize: `${wishlist.heading.fontSize || 32}px`,
                  color: wishlist.heading.color,
                  fontWeight: wishlist.heading.isBold ? "bold" : "normal",
                  fontStyle: wishlist.heading.isItalic ? "italic" : "normal",
                }}
              >
                {wishlist.heading.text}
              </h2>
              <p
                style={{
                  fontSize: `${wishlist.subheading.fontSize || 16}px`,
                  color: wishlist.subheading.color,
                  fontWeight: wishlist.subheading.isBold ? "bold" : "normal",
                  fontStyle: wishlist.subheading.isItalic ? "italic" : "normal",
                }}
              >
                {wishlist.subheading.text}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  style={{ margin: "10px 0", padding: "5px" }}
                />
                <button
                  className="rounded-xl"
                  type="submit"
                  style={{
                    fontSize: `${wishlist.button.fontSize || 16}px`,
                    color: wishlist.button.textColor,
                    backgroundColor: wishlist.button.backgroundColor,
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontWeight: wishlist.button.isBold ? "bold" : "normal",
                    fontStyle: wishlist.button.isItalic ? "italic" : "normal",
                  }}
                >
                  {wishlist.button.text}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p>You&#39;ve been added to our waitlist.</p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mt-4"
              >
                🎉
              </motion.div>
            </motion.div>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Powered by{" "}
            <Link href="/">
              <span className="text-red-500">poster.xyz</span>
            </Link>
          </p>
        </div>
      </BackgroundGradient>
    </div>
  );
}
