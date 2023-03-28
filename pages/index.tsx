import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Picture from "../components/Picture";
import GuessContainer from "../components/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import TextSearch from "../components/textSearch";
import PopUp from "../components/popUp";
import {
  Gruppo,
  Beth_Ellen,
  Labrada,
  Marcellus,
  Vidaloka,
  Rowdies,
  Staatliches,
  Unbounded,
} from "@next/font/google";
import { GetImage } from "../fetchers/getImage";
import { GetDailyWord } from "../fetchers/getDailyWord";

const dmSans = Unbounded({
  subsets: ["latin"],
  weight: "300",
  preload: true,
});

export default function Home() {
  const { data } = GetImage({});
  const [index, setIndex] = useState(1);

  const d = new Date();
  const time = (d.getMonth() + 1) * 100 + d.getDate();
  const [showPopup, setShowPopup] = useState(true);
  const [guesses, setGuesses] = useState({
    remainGuesses: 5,
    answers: [
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
      { word: "", accuracy: 0 },
    ],
    time: time,
  });
  const dailyWord = GetDailyWord({});

  const initialGuessesRef = useRef(guesses);
  useEffect(() => {
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
          time: time,
        })
      );
    } else {
      const data = JSON.parse(storedGuesses);
      if (time > parseInt(data.time)) {
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
            time: time,
          })
        );
        setGuesses({
          remainGuesses: 5,
          answers: [
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
            { word: "", accuracy: 0 },
          ],
          time: time,
        });
        setIndex(1);
      } else {
        setGuesses(data);
        setIndex(5 - data.remainGuesses + 1);
      }
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialGuessesRef.current) !== JSON.stringify(guesses)) {
      window.localStorage.setItem("guesses", JSON.stringify(guesses));
    }
  }, [guesses, time]);

  return (
    <div id="mainContainer">
      <Head>
        <title>Pic Clip</title>
        <meta name="description" content="This is a image guessing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"relative h-screen " + dmSans.className}>
        {/* {time > guesses.time ? "new day" : time + " " + guesses.time} */}
        <PopUp showPopup={showPopup} index={index}>
          <div className="flex flex-col items-center ">
            <picture>
              <img
                src={data?.imgUrl}
                alt=""
                className="object-cover w-full max-w-[300px] h-full max-h-[300px] py-5"
              />
            </picture>
            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="absolute p-4 py-2 text-gray-300 bg-blue-600 border-2 rounded-md right-4 top-4 border-black/80"
            >
              X
            </button>
            <p className="text-lg font-thin">Word of the day</p>
            <p className="capitalize">{dailyWord?.data?.dailyWord}</p>
          </div>
        </PopUp>
        <div className="mb-2 border-b border-gray-400 sm:h-[100px]">
          <div className="text-center">
            <h1 className="pt-2 text-3xl font-bold tracking-widest text-blue-700 sm:text-5xl">
              PicClip
            </h1>
            <p className="pb-1 text-blue-300 sm:pt-2">Guess the picture</p>
          </div>
        </div>
        <div className="max-w-[600px] m-auto pt-1 flex flex-col h-[calc(100%-130px)]">
          <div className="relative flex justify-center h-full m-auto overflow-hidden w-72 sm:w-96 min-h-[180px] xs:h-96">
            <Picture
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
                  className="absolute bottom-0 max-w-[350px] text-center border-2 border-black border-b-0 p-3 rounded-t-lg bg-black/50"
                >
                  <p className="text-xl sm:text-3xl">
                    {dailyWord?.data?.dailyWord}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="h-full xs:h-fit">
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
          </div>
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
