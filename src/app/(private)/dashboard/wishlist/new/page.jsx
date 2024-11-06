"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Bold, Copy, Italic, Share } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { submitWishlist } from "@/actions/wishlist";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function WishlistMaker() {
  const [selectedElement, setSelectedElement] = useState("heading");
  const [name, setName] = useState(`#Wishlist${new Date().getMilliseconds()}`);
  const [showDialog, setShowDialog] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [elements, setElements] = useState({
    heading: {
      text: "Join the tribe now",
      fontSize: 24,
      isBold: false,
      isItalic: false,
      color: "#000000",
    },
    subheading: {
      text: "Be one of the first to experience!",
      fontSize: 18,
      isBold: false,
      isItalic: false,
      color: "#555555",
    },
    button: {
      text: "Join Now",
      fontSize: 16,
      isBold: false,
      isItalic: false,
      textColor: "#272727",
      backgroundColor: "#f5c542",
    },
  });

  // Function to handle text, font-size, bold/italic changes
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
    const result = await submitWishlist({ ...elements, name });
    if (result.success) {
      setWishlistId(result.id);

      setShowDialog(true);
    } else {
      // Handle error\
      toast.error("Unable to create wishlist, try again later!");
      console.error(result.error);
    }
  };
  return (
    <div className="max-w-7xl min-h-[80vh] mx-auto p-5 bg-gradient-to-b from-white to-gray-100 flex flex-col gap-5">
      <button className="bg-gray-300 rounded-md px-5 py-2 w-max">Back</button>

      {/* Project Name Section */}
      <div className="bg-white rounded-xl p-5">
        <Label>Wishlist Name</Label>
        <Input
          type="text"
          placeholder="Sculpt Waitlist"
          value={name}
          onChange={setName}
        />
      </div>

      <h1 className="text-2xl text-center">
        Man! Let&#9;s make this great, go edit right in the screen !!!
      </h1>

      {/* Sidebar for Editing Text and Button Properties */}
      <div className="flex gap-10">
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
              value={selectedElement ? elements[selectedElement].fontSize : ""}
              onChange={(e) => handlePropertyChange("fontSize", e.target.value)}
              className="w-[70px]"
            />
            <ToggleGroup
              variant="outline"
              type="multiple"
              className="flex gap-2"
              value={[
                elements[selectedElement]?.isBold ? "bold" : null,
                elements[selectedElement]?.isItalic ? "italic" : null,
              ].filter(Boolean)} // Ensure an empty array is not passed to value
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
              className={` ${elements.heading.isBold ? "font-bold" : ""} ${
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
              className={`${elements.subheading.isBold ? "font-bold" : ""} ${
                elements.subheading.isItalic ? "italic" : ""
              }`}
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
              <Input
                type="email"
                placeholder="Email"
                defaultValue="jazz.xyz"
                className="w-full"
              />
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
          Done
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Wishlist Created!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex mt-1">
                <Textarea
                  id="share-link"
                  className="h-20"
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
                      toast.error("Sharing is not supported on this device");
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
                <Textarea
                  id="embed-code"
                  className="h-28"
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
  );
}
