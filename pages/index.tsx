import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Picture from "../components/Picture";
import GuessContainer from "../components/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import TextSearch from "../components/textSearch";
import { Unbounded } from "@next/font/google";
import { GetImage } from "../fetchers/getImage";
import { GetDailyWord } from "../fetchers/getDailyWord";
import GameOverPopUp from "../components/gameOverPopUp";
import ExplanationPopUp from "../components/explanationPopUp";
import CurrentGuesses from "../components/currentGuesses";
import Header from "../components/header";
import ImageContainer from "../components/imageContainer";

const dmSans = Unbounded({
  subsets: ["latin"],
  weight: "300",
  preload: true,
});

export default function Home() {
  const { data } = GetImage({});
  const [index, setIndex] = useState(1);
  const newDay = useRef<boolean>(null);
  const d = new Date();
  const time = (d.getMonth() + 1) * 100 + d.getDate();
  const [showPopup, setShowPopup] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(newDay.current);
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

  const resetLocalStorageGuesses = () => {
    return window.localStorage.setItem(
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
  };
  useEffect(() => {
    const storedGuesses = window.localStorage.getItem("guesses");

    if (!storedGuesses) {
      resetLocalStorageGuesses();
    } else {
      const data = JSON.parse(storedGuesses);
      if (time > parseInt(data.time)) {
        newDay.current = true;
        resetLocalStorageGuesses();
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
        <ExplanationPopUp
          index={index}
          imgUrl={data?.imgUrl}
          showHowToPlay={showHowToPlay}
          setShowHowToPlay={setShowHowToPlay}
          showPopup={showPopup}
          newDay={newDay}
        />
        <GameOverPopUp
          dailyWord={dailyWord.data?.dailyWord}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          index={index}
          imgUrl={data?.imgUrl}
        />
        <Header />
        <div className="max-w-[600px] m-auto pt-1 flex flex-col h-[calc(100%-130px)]">
          <ImageContainer index={index} dailyWord={dailyWord} />
          <CurrentGuesses guesses={guesses} />
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
