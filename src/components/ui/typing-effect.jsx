import { motion } from "framer-motion";
import React from "react";

export function TypingEffect({ text }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, 200);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i]);

  return (
    <h1 className="text-center font-display text-xl  tracking-[-0.02em] drop-shadow-sm text-balance ">
      {displayedText ? displayedText : ""}
    </h1>
  );
}
