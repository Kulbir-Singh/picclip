import { Dispatch, SetStateAction } from "react";
import PopUp from "./popUp";

interface Props {
  showPopup: boolean;
  index: number;
  imgUrl: string;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  dailyWord: string;
}

export default function GameOverPopUp({
  showPopup,
  index,
  imgUrl,
  setShowPopup,
  dailyWord,
}: Props) {
  return (
    <PopUp showPopup={showPopup} index={index}>
      <div className="flex flex-col items-center ">
        <picture>
          <img
            src={imgUrl ? imgUrl : "./placeholder.jpg"}
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
        <p className="capitalize">{dailyWord}</p>
      </div>
    </PopUp>
  );
}
