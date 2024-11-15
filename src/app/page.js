/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Image from "next/image";
import Link from "next/link";
export default function page() {
  const MotionImg = motion.create(Image);
  return (
    <>
      <div className="min-h-[75vh] mx-auto flex items-center justify-center flex-col bg-[#F5F5F5] gap-16 relative overflow-x-hidden">
        <Hero />
        <MotionImg
          src="/1.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-0 top-[6%] lg:top-[10%] lg:w-[220px] w-[150px] lg:block "
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: 0, y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/2.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-[8%] top-[23%] w-[220px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "8%", y: "0%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/3.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-[18%] top-[35%] w-[220px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/4.svg"
          alt=""
          width={500}
          height={500}
          className="absolute right-0 lg:top-[10%] lg:w-[250px] block top-[6%] w-[150px]"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <motion.div
          className="bg-white rounded-2xl py-14 px-8  flex-col gap-4 lg:absolute right-[3%] top-[23%] w-[320px] rotate-[-20deg] flex  border  lg:mt-0 -mt-52 mb-10"
          initial={{ opacity: 0, x: 0, y: 0, rotate: "12deg" }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        >
          <h3 className="text-2xl">Yes, you the in line!</h3>
          <p className="text-pred text-sm">
            &quot;You&#39;re successfully on the waitlist!
          </p>
          <img
            src="/gif.webp"
            width={500}
            height={500}
            className="bg-cover rounded-xl"
            alt=""
          />
        </motion.div>
        <WhyUs />
      </div>
      <div className="bg-pred mt-20 py-40 text-7xl text-center text-white">
        <Link href="mailto:kulkarnisampreet9@gmail.com">Contact the CEO</Link>
      </div>
      <Footer />
    </>
  );
}
