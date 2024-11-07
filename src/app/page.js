"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Image from "next/image";
export default function page() {
  const MotionImg = motion.create(Image);
  return (
    <>
      <div className="min-h-[75vh] mx-auto flex items-center justify-center flex-col bg-[#F5F5F5] gap-16 relative">
        <Hero />
        <WhyUs />
        <MotionImg
          src="/1.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-0 top-[10%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: 0, y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/2.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-[8%] top-[23%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "8%", y: "0%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/3.svg"
          alt=""
          width={500}
          height={500}
          className="absolute left-[18%] top-[35%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/4.svg"
          alt=""
          width={500}
          height={500}
          className="absolute right-0 top-[10%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/5.svg"
          alt=""
          width={500}
          height={500}
          className="absolute right-[8%] top-[23%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
        <MotionImg
          src="/6.svg"
          alt=""
          width={500}
          height={500}
          className="absolute right-[18%] top-[35%] w-[250px] lg:block hidden"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: "0%", y: "10%" }}
          transition={{ ease: "easeInOut", type: "spring" }}
        />
      </div>
      <div className="bg-pred mt-20 py-40 text-7xl text-center text-white">
        Contact the CEO
      </div>
      <Footer />
    </>
  );
}
