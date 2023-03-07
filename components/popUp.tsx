import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface Props {
  index: number;
  guesses: Guesses;
}
type Guesses = {
  remainGuesses: number;
  answers: { word: string; accuracy: number }[];
};
export default function PopUp({ index, guesses }: Props) {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <AnimatePresence>
      {index > 5 && showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute z-50 flex items-center justify-center w-screen h-screen p-6 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.5 }}
            className="border-2 rounded-md bg-gray-300 text-black/80 relative max-w-[600px] w-full h-full max-h-[500px] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="absolute p-4 py-2 text-gray-300 bg-blue-600 border-2 rounded-md right-4 top-4 border-black/80"
            >
              X
            </button>
            <p className="text-5xl">Game Over</p>
            <p>
              {guesses.answers[4].accuracy === 100
                ? "You won"
                : "Better luck next time"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
