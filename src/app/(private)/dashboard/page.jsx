"use client";
import { Plus } from "lucide-react";
import React from "react";
import { MdCopyAll } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Function to fetch wishlists from the API
async function fetchWishlists() {
  const response = await fetch("/api/wishlist");
  if (!response.ok) {
    throw new Error("Failed to fetch wishlists");
  }
  return response.json();
}

export default function DashboardPage() {
  const {
    data: wishlists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: fetchWishlists,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-[#F2F2F2] flex h-full min-h-[80vh] max-w-7xl  mx-auto">
      <div className="bg-white h-auto lg:block hidden p-5">
        <Link href="/dashboard/wishlist/new">
          <button className="bg-pred hover:bg-red-600 transition-all ease-in-out text-white text-xl flex flex-col items-center justify-center rounded-xl p-5 px-8">
            <Plus />
            Add
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-5 gap-5 max-w-2xl  mx-auto">
        <h1 className="font-medium lg:text-6xl text-2xl text-center text-balance ">
          Craft Waitlist like a F****ing pro{" "}
        </h1>
        <p className="text-center text-balance lg:text-base text-sm">
          A simple, one-step tool to instantly create a waitlist.
        </p>
        <Link href="/dashboard/wishlist/new" className="lg:hidden block">
          <button className="bg-pred hover:bg-red-600 transition-all ease-in-out text-white text-xl flex flex-row gap-3 items-center justify-center rounded-xl p-5 px-8">
            Add
            <Plus />
          </button>
        </Link>
        <div className="flex flex-col gap-5">
          <h2 className="font-medium lg:text-4xl text-2xl">Your Waitlist</h2>
          {wishlists &&
            wishlists.map((item) => (
              <WaitlistCard data={item} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
}

function WaitlistCard({ data }) {
  console.log(data);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/w/${data._id}`
    );
    toast.success("Link copied to clipboard!");
  };

  const shareWishlist = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.name,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/w/${data._id}`,
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch(console.error);
    } else {
      copyToClipboard();
    }
  };

  return (
    <Link href={`/dashboard/wishlist/${data._id}/edit`}>
      <div className="flex bg-white min-w-[280px] lg:w-[500px] items-center justify-between rounded-xl p-5">
        <div className="flex flex-col  font-medium">
          <h3 className="text-xl">{data.projectName}</h3>
          <p className="text-pred text-sm">{data.users} joined</p>
        </div>
        <div className="flex flex-col text-xl items-center justify-between h-full">
          <MdCopyAll className="cursor-pointer" onClick={copyToClipboard} />
          <FaShareNodes className="cursor-pointer" onClick={shareWishlist} />
        </div>
      </div>
    </Link>
  );
}
