import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StaggeredFade({ sentence, className }) {
  const wordVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
  };
  const words = sentence.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      className={cn(
        "text-center font-display text-4xl font-medium tracking-[-0.02em] drop-shadow-sm  md:leading-[5rem]",
        className
      )}
    >
      {words.map((word, i) => (
        <motion.span key={word} variants={wordVariants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h1>
  );
}
