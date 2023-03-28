import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { GetImage } from "../fetchers/getImage";

interface Props {
  className?: string;

  blur: number;
  index?: number;
}

export default function Picture({ className, blur, index }: Props) {
  const { data } = GetImage({});

  useEffect(() => {
    window?.document?.getElementById("img").addEventListener(
      "dragstart",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }, []);
  return (
    <picture>
      <motion.img
        src={data?.imgUrl}
        className={className}
        initial={{ height: 1000 / (index + 1) + "%" }}
        animate={{ height: 1000 / index + "%" }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        style={{ filter: `blur(${blur}px)` }}
        id="img"
      />
    </picture>
  );
}
