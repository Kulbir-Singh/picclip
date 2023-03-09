import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Picture from "../components/Picture";
import GuessContainer from "../components/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import TextSearch from "../components/textSearch";
import PopUp from "../components/popUp";
import Script from "next/script";

export default function Home() {
  const [index, setIndex] = useState(1);
  const [guesses, setGuesses] = useState({
    remainGuesses: 5,
    answers: [
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
    ],
  });

  const initialGuessesRef = useRef(guesses);
  useEffect(() => {
    window?.document?.getElementById("mainContainer").addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
    const storedGuesses = window.localStorage.getItem("guesses");
    if (!storedGuesses) {
      window.localStorage.setItem(
        "guesses",
        JSON.stringify({
          remainGuesses: 5,
          answers: [
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
          ],
        })
      );
    } else {
      const data = JSON.parse(storedGuesses);
      setGuesses(data);
      setIndex(5 - data.remainGuesses + 1);
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialGuessesRef.current) !== JSON.stringify(guesses)) {
      window.localStorage.setItem("guesses", JSON.stringify(guesses));
    }
  }, [guesses]);

  return (
    <div id="mainContainer">
      <Head>
        <title>Pic Clip</title>
        <meta name="description" content="This is a image guessing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative h-full">
        <PopUp guesses={guesses} index={index} />
        <div className="mb-2 border-b border-gray-400">
          <div className="text-center">
            <h1 className="pt-2 font-serif text-5xl tracking-widest text-blue-700">
              PicClip
            </h1>
            <p className="pt-2 text-blue-300">Guess the picture</p>
          </div>
          <div className="pb-2 text-3xl tracking-widest text-center">
            <p>01:00</p>
          </div>
        </div>
        <div className="max-w-[600px] m-auto pt-1">
          <div className="relative flex justify-center m-auto overflow-hidden w-80 sm:w-96 h-80 sm:h-96">
            <Picture
              src="./cat.jpg"
              alt="brown cat image"
              index={index}
              blur={index > 5 ? 0 : 100 / (index * index)}
              className="absolute inset-0 object-cover w-full m-auto blur-lg"
            />
            <AnimatePresence>
              {index > 5 && (
                <motion.div
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  exit={{ y: 150 }}
                  transition={{ delay: 0.5, stiffness: 80 }}
                  className="absolute bottom-0 w-[150px] text-center border-2 border-black border-b-0 p-3 rounded-t-lg bg-black/50"
                >
                  <p className="text-3xl">Cat</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {guesses.answers?.map((answer, index) => {
            return (
              <div key={answer.word + index}>
                <GuessContainer
                  progress={answer.accuracy}
                  answer={answer.word}
                />
              </div>
            );
          })}
          <TextSearch
            index={index}
            setGuesses={setGuesses}
            guesses={guesses}
            setIndex={setIndex}
          />
        </div>
      </main>
    </div>
  );
}
