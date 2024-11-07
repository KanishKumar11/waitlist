import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { motion } from "framer-motion";
import StaggeredFade from "../ui/staggered-heading";
import { TypingEffect } from "../ui/typing-effect";
import { Button } from "../ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Hero() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div className="flex flex-col gap-5 min-h-[600px] my-auto h-screen items-center justify-between z-10">
      <Navbar />

      <div className="flex flex-col gap-12">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="flex items-center bg-pred rounded-3xl text-white gap-2 px-7 py-2 w-max mx-auto"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <MdElectricBolt /> Coming soon
          </motion.div>
        </motion.div>
        <div className="max-w-3xl flex flex-col gap-4">
          {" "}
          <StaggeredFade
            sentence="Craft Waitlist like a F****ing pro "
            className="md:text-7xl"
          />
          <TypingEffect text="A simple, one-step tool to instantly create a waitlist." />
        </div>
        <Link href="/dashboard/wishlist/new" className="mx-auto">
          <Button className="bg-pred px-10 py-6 text-lg rounded-xl w-max mx-auto">
            Be a pro, make a new waitlist
          </Button>
        </Link>
      </div>
      <div />
    </div>
  );
}
