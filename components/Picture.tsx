import { motion } from "framer-motion";
import React from "react";

interface Props {
  src: string;
  className?: string;
  alt: string;
  blur: number;
  index?: number;
}

export default function Picture({ src, className, alt, blur, index }: Props) {
  return (
    <picture>
      <motion.img
        src={src}
        className={className}
        alt={alt}
        initial={{ height: 1000 / (index + 1) + "%" }}
        animate={{ height: 1000 / index + "%" }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        style={{ filter: `blur(${blur}px)` }}
      />
    </picture>
  );
}
