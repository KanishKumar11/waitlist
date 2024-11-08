"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { Bold, Code, Italic } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateWishlist } from "@/actions/wishlist";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Copy, Share } from "lucide-react";
import Link from "next/link";

export default function WishlistEditor({ params }) {
  const [wishlistId, setWishlistId] = useState(params.id);
  console.log(wishlistId);

  const [selectedElement, setSelectedElement] = useState("heading");
  const [name, setName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [elements, setElements] = useState({
    heading: {
      text: "",
      fontSize: 24,
      isBold: false,
      isItalic: false,
      color: "#000000",
    },
    subheading: {
      text: "",
      fontSize: 18,
      isBold: false,
      isItalic: false,
      color: "#555555",
    },
    button: {
      text: "",
      fontSize: 16,
      isBold: false,
      isItalic: false,
      textColor: "#272727",
      backgroundColor: "#f5c542",
    },
  });

  useEffect(() => {
    // Fetch the existing wishlist data
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/${wishlistId}`);
        const data = await response.json();
        setName(data.projectName);
        setElements(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist data");
      }
    };

    fetchWishlist();
  }, [wishlistId]);
  if (!wishlistId) {
    return <div>Wishlist not found</div>;
  }
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const shareWishlist = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out my wishlist!",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/w/${wishlistId}`,
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch(console.error);
    } else {
      copyToClipboard(
        `${process.env.NEXT_PUBLIC_BASE_URL}/w/${wishlistId}`,
        "Share link copied to clipboard!"
      );
    }
  };

  const handlePropertyChange = (property, value) => {
    setElements((prevElements) => ({
      ...prevElements,
      [selectedElement]: {
        ...prevElements[selectedElement],
        [property]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const result = await updateWishlist(wishlistId, { ...elements, name });
    if (result.success) {
      setShowDialog(true);
      toast.success("Wishlist updated successfully!");
    } else {
      toast.error("Unable to update wishlist, try again later!");
      console.error(result.error);
    }
  };

  return (
    <>
      {wishlistId ? (
        <div className="max-w-7xl min-h-[80vh] mx-auto p-5 bg-gradient-to-b from-white to-gray-100 flex flex-col gap-5">
          <div>
            {" "}
            <Link href="/dashboard">
              <button className="bg-gray-300 rounded-md px-5 py-2 w-max">
                Back
              </button>
            </Link>{" "}
            <Link href={`/dashboard/wishlist/${wishlistId}/analytics`}>
              <button className="bg-gray-300 rounded-md px-5 py-2 w-max">
                Analytics
              </button>
            </Link>
          </div>
          {/* Wishlist Name Section */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between md:flex-row flex-col gap-5">
              <div className="flex-grow mr-4">
                <Label htmlFor="wishlist-name">Wishlist Name</Label>
                <Input
                  id="wishlist-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => shareWishlist()}
                  title="Share Wishlist"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-wishlist-id="${wishlistId}"></script>`,
                      "Embed code copied to clipboard!"
                    )
                  }
                  title="Copy Embed Code"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Embed
                </Button>
              </div>
            </div>
          </div>
          <h1 className="text-2xl text-center">Edit your wishlist</h1>
          {/* Sidebar for Editing Text and Button Properties */}
          <div className="flex gap-10 md:flex-row flex-col">
            {/* Sidebar */}
            <div className="w-[200px] flex flex-col gap-3 bg-white rounded-xl p-5 h-auto">
              <div className="text-lg font-semibold">Properties</div>

              {/* Text Input for Editing Text */}
              <div>
                <Label>Edit Text</Label>
                <Input
                  value={selectedElement ? elements[selectedElement].text : ""}
                  onChange={(e) => handlePropertyChange("text", e.target.value)}
                />
              </div>

              {/* Font Size and Toggle for Bold/Italic */}
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={
                    selectedElement ? elements[selectedElement].fontSize : ""
                  }
                  onChange={(e) =>
                    handlePropertyChange("fontSize", e.target.value)
                  }
                  className="w-[70px]"
                />
                <ToggleGroup
                  variant="outline"
                  type="multiple"
                  className="flex gap-2"
                  value={[
                    elements[selectedElement]?.isBold ? "bold" : null,
                    elements[selectedElement]?.isItalic ? "italic" : null,
                  ].filter(Boolean)}
                  onValueChange={(value) => {
                    handlePropertyChange("isBold", value.includes("bold"));
                    handlePropertyChange("isItalic", value.includes("italic"));
                  }}
                >
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Font Color */}
              <div className="mt-5">
                <Label>Font Color</Label>
                <Input
                  type="color"
                  value={
                    selectedElement === "button"
                      ? elements.button.textColor
                      : elements[selectedElement]?.color || "#000000"
                  }
                  onChange={(e) => {
                    if (selectedElement === "button") {
                      handlePropertyChange("textColor", e.target.value);
                    } else {
                      handlePropertyChange("color", e.target.value);
                    }
                  }}
                />
              </div>

              {/* Button Background Color (for Button Only) */}
              {selectedElement === "button" && (
                <div className="mt-5">
                  <Label>Button Background Color</Label>
                  <Input
                    type="color"
                    value={elements.button.backgroundColor}
                    onChange={(e) =>
                      handlePropertyChange("backgroundColor", e.target.value)
                    }
                  />
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="flex-grow bg-white rounded-xl p-10">
              <div className="text-center flex flex-col items-center">
                {/* Heading */}
                <h2
                  className={`${elements.heading.isBold ? "font-bold" : ""} ${
                    elements.heading.isItalic ? "italic" : ""
                  }`}
                  onClick={() => setSelectedElement("heading")}
                  style={{
                    fontSize: `${elements.heading.fontSize}px`,
                    color: elements.heading.color,
                    fontWeight: elements.heading.isBold ? 700 : 400,
                  }}
                >
                  {elements.heading.text}
                </h2>

                {/* Subheading */}
                <p
                  className={`${
                    elements.subheading.isBold ? "font-bold" : ""
                  } ${elements.subheading.isItalic ? "italic" : ""}`}
                  onClick={() => setSelectedElement("subheading")}
                  style={{
                    fontSize: `${elements.subheading.fontSize}px`,
                    color: elements.subheading.color,
                  }}
                >
                  {elements.subheading.text}
                </p>

                {/* Email Input */}
                <div className="my-4 max-w-[300px] ">
                  <Input type="email" placeholder="Email" className="w-full" />
                </div>

                {/* Join Button */}
                <Button
                  className={`text-black hover:bg-yellow-600 px-6 py-2 rounded-md`}
                  onClick={() => setSelectedElement("button")}
                  style={{
                    backgroundColor: elements.button.backgroundColor,
                    color: elements.button.textColor,
                    fontSize: `${elements.button.fontSize}px`,
                    fontWeight: elements.button.isBold ? "bold" : "normal",
                    fontStyle: elements.button.isItalic ? "italic" : "normal",
                  }}
                >
                  {elements.button.text}
                </Button>

                {/* Footer */}
                <p className="mt-2 text-xs text-gray-500">
                  Powered by <span className="text-red-500">poster.xyz</span>
                </p>
              </div>
            </div>
          </div>
          {/* Footer Buttons */}
          <div className="flex gap-10 items-center justify-center mt-10">
            <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-2 rounded-md">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-500 text-white text-2xl hover:bg-red-600 px-10 py-6 rounded-md"
            >
              Update
            </Button>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Wishlist Updated!</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="share-link">Share Link</Label>
                  <div className="flex mt-1">
                    <Input
                      id="share-link"
                      value={`${process.env.NEXT_PUBLIC_BASE_URL}/w/${wishlistId}`}
                      readOnly
                    />
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/w/${wishlistId}`
                        );
                        toast.success("Share link copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        if (navigator.share) {
                          navigator
                            .share({
                              title: "Check out my wishlist!",
                              url: `${process.env.NEXT_PUBLIC_BASE_URL}/w/${wishlistId}`,
                            })
                            .then(() => {
                              toast.success("Shared successfully!");
                            })
                            .catch(console.error);
                        } else {
                          toast.error(
                            "Sharing is not supported on this device"
                          );
                        }
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <div className="flex mt-1">
                    <Input
                      id="embed-code"
                      value={`<script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-wishlist-id="${wishlistId}"></script>`}
                      readOnly
                    />
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/embed.js" data-wishlist-id="${wishlistId}"></script>`
                        );
                        toast.success("Embed code copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
