import { motion, Variants } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setGuesses: Dispatch<SetStateAction<Guesses>>;
  guesses: Guesses;
  setIndex: Dispatch<SetStateAction<number>>;
  index: number;
}

type Guesses = {
  remainGuesses: number;
  answers: { word: string; accuracy: number }[];
};

const itemVariants: Variants = {
  error: {
    scale: 1.1,
    borderWidth: 3,
    borderColor: "red",
    transition: { duration: 0.25 },
  },
  good: {
    scale: 1,
    borderWidth: 0,
    borderColor: "transparent",
    transition: { duration: 0.25 },
  },
};

export default function TextSearch({
  guesses,
  setGuesses,
  index,
  setIndex,
}: Props) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const handleWordSearch = async (answer) => {
    try {
      const data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`
      );
      const res = await data.json();

      if (res?.title == "No Definitions Found") {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const accuracy = async () => {
    const data = await fetch("/api/textMatching?secondWord=" + answer);
    const jsonRes = await data.json();
    return jsonRes;
  };

  const handleAnswer = async () => {
    const acc = await accuracy();
    if (index > 5) {
      return;
    }
    const repetitiveAns = guesses.answers.find((ans) => {
      return ans.word == answer;
    });

    const validWord = await handleWordSearch(answer);
    let updatedGuesses;
    if (answer.length == 0 || repetitiveAns) {
      setError(true);
      window.setTimeout(() => {
        setError(false);
      }, 1000);
      setAnswer("");
    } else {
      setIndex(index + 1);
      updatedGuesses = {
        ...guesses,
        remainGuesses: guesses.remainGuesses - 1,
        answers: guesses.answers.map((a, i) =>
          i === index - 1 ? { ...a, word: answer, accuracy: acc } : a
        ),
      };
      if (acc == 100) {
        setIndex(6);
        updatedGuesses = {
          ...guesses,
          remainGuesses: 0,
          answers: guesses.answers.map((a, i) =>
            i === index - 1 ? { ...a, word: answer, accuracy: acc } : a
          ),
        };
      }

      setGuesses(updatedGuesses);

      setAnswer("");
    }
  };
  return (
    <div className="flex flex-col px-6">
      <motion.input
        className="w-full p-3 my-5 text-lg font-semibold bg-gray-300 rounded-sm text-black/90"
        placeholder="enter your guess"
        animate={error ? "error" : "good"}
        variants={itemVariants}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
          restDelta: 0.001,
        }}
      />
      <motion.button
        whileTap={{
          scale: 1.1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
            duration: 10,
          },
        }}
        whileHover={{
          scale: 1.05,
          transition: {
            duration: 0.25,
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }}
        onClick={() => {
          handleAnswer();
        }}
        className="max-w-[350px] m-auto border-blue-800 w-fit py-3 px-16 bg-blue-600 rounded-lg text-xl font-semibold tracking-wider relative [&>div]:even:hover:translate-x-0 [&>div>]:hover:translate-x-[100%] [&>div]:duration-1000 overflow-hidden"
      >
        <div className="absolute bg-blue-700 w-full h-full top-0 rounded-lg -translate-x-[100%] right-0 z-10 ease-in-out" />
        <div className="absolute bg-blue-800 w-full h-full top-0 rounded-lg delay-[150ms] -translate-x-[100%] right-0 z-10 ease-in-out" />
        <p className="relative z-20">GUESS </p>
      </motion.button>
    </div>
  );
}
