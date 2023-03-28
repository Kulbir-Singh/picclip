import { motion, Variants } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetWordAccuracy } from "../fetchers/getWordAccuracy";
import classNames from "../utils/twClassNames";

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
  const [acc, setAcc] = useState(true);

  const [error, setError] = useState(false);
  const { data, refetch, isSuccess, isFetched, isLoading, status } =
    GetWordAccuracy({
      word: answer,
      reFetchTriggers: acc,
    });
  const handleAnswer = async () => {
    refetch();
    if (isLoading) return;
    if (!isSuccess) return;
    if (!isFetched) return;
    if (index > 5) {
      return;
    }
    const repetitiveAns = guesses.answers.find((ans) => {
      return ans.word == answer;
    });

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
          i === index - 1 ? { ...a, word: answer, accuracy: data } : a
        ),
      };
      if (data == 100) {
        setIndex(6);
        updatedGuesses = {
          ...guesses,
          remainGuesses: 0,
          answers: guesses.answers.map((a, i) =>
            i === index - 1 ? { ...a, word: answer, accuracy: data } : a
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
        className="w-full p-3 my-3 font-thin bg-gray-300 rounded-sm xs:my-5 text-black/90"
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
          if (isLoading) return;
          handleAnswer();
          setAcc(!acc);
        }}
        className={classNames(
          isLoading ? "bg-blue-600/50" : "bg-blue-600",
          "max-w-[350px] m-auto border-blue-800 w-fit py-3 px-16 rounded-lg sm:text-xl font-semibold tracking-wider relative [&>div]:even:hover:translate-x-0 [&>div>]:hover:translate-x-[100%] [&>div]:duration-1000 overflow-hidden"
        )}
      >
        <span className="absolute bg-blue-700 w-full h-full top-0 rounded-lg -translate-x-[100%] right-0 z-10 ease-in-out" />
        <span className="absolute bg-blue-800 w-full h-full top-0 rounded-lg delay-[150ms] -translate-x-[100%] right-0 z-10 ease-in-out" />
        <p className="relative z-20 font-thin">
          {!isFetched ? "loading" : "Guess"}
        </p>
      </motion.button>
    </div>
  );
}
