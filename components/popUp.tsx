import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface Props {
  index: number;
  children: React.ReactNode;
  showPopup: boolean;
}

export default function PopUp({ children, index, showPopup }: Props) {
  return (
    <AnimatePresence>
      {index > 5 && showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-6 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-md bg-gray-900 text-white relative max-w-[600px] w-full h-full max-h-[500px] flex flex-col items-center justify-center"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
