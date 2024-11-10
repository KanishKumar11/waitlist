"use client";
import React, { useCallback, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

async function fetchAnalytics(wishlistId, page = 0) {
  const response = await fetch(
    `/api/wishlist/${wishlistId}/analytics?page=${page}&limit=${ITEMS_PER_PAGE}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function WishlistAnalytics({ params }) {
  const [wishlistId, setWishlistId] = useState(params.id);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["wishlistAnalytics", wishlistId],
    queryFn: ({ pageParam = 0 }) => fetchAnalytics(wishlistId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.emails.length < ITEMS_PER_PAGE) return undefined;
      return pages.length;
    },
  });

  const observer = useRef();
  const lastEmailElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  const totalSignups = data?.pages[0]?.totalSignups ?? 0;
  const signupsToday = data?.pages[0]?.signupsToday ?? 0;

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-6">
      <h1 className="text-3xl font-bold">Wishlist Analytics</h1>
      <Link href={`/dashboard/wishlist/${wishlistId}/edit`}>
        <button className="bg-gray-300 rounded-md px-5 py-2 w-max">Back</button>
      </Link>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalSignups}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Signups Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{signupsToday}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Email Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Signup Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.emails.map((email, index) => (
                    <TableRow
                      key={index}
                      ref={
                        i === data.pages.length - 1 &&
                        index === page.emails.length - 1
                          ? lastEmailElementRef
                          : null
                      }
                    >
                      <TableCell>{email.address}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(email.signupDate), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          {isFetchingNextPage && (
            <div className="text-center mt-4">Loading more...</div>
          )}
          {!hasNextPage && (
            <div className="text-center mt-4">No more emails to load</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
