import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import PopUp from "./popUp";
import GuessContainer from "./ProgressBar";

interface Props {
  showPopup: boolean;
  index: number;
  imgUrl: string;
  setShowHowToPlay: Dispatch<SetStateAction<boolean>>;
  newDay: { current: boolean };
  showHowToPlay: boolean;
}

export default function ExplanationPopUp({
  showPopup,
  index,
  newDay,
  setShowHowToPlay,
  showHowToPlay,
}: Props) {
  return (
    <PopUp showPopup={showHowToPlay} index={index}>
      <div className="w-full">
        <picture>
          <img
            src="./cat.jpg"
            alt=""
            className="object-cover w-full max-w-[250px] h-full max-h-[250px] py-5 m-auto"
          />
        </picture>
        <button
          onClick={() => {
            newDay.current = false;
            setShowHowToPlay(newDay.current);
          }}
          className="absolute p-4 py-2 text-gray-300 bg-blue-600 border-2 rounded-md right-4 top-4 border-black/80"
        >
          X
        </button>
        <div className="px-12 space-y-2 text-sm">
          <p className="">You have to guess the right word.</p>
          <p className="">Each guess will show you more of the image.</p>
          <p className="">
            The progress bar shows you how close your guess is to the picture of
            the day.
          </p>
        </div>
        <div className="px-6">
          <GuessContainer small answer="dog" progress={50} />
          <GuessContainer small answer="cat" progress={100} />
        </div>
      </div>
    </PopUp>
  );
}
