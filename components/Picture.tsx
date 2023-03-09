import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  src: string;
  className?: string;
  alt: string;
  blur: number;
  index?: number;
}

export default function Picture({ src, className, alt, blur, index }: Props) {
  const [imageSrc, setImageSrc] = useState<{ imgUrl: string }>({ imgUrl: "" });
  const imgSrc = async () => {
    const data = await fetch("/api/image");
    const jsonRes = await data.json();
    setImageSrc(jsonRes);
  };
  useEffect(() => {
    imgSrc();
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
        src={imageSrc.imgUrl}
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
        id="img"
      />
    </picture>
  );
}
