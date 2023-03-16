import React from "react";

export default function iphone() {
  return (
    <div className="flex h-screen p-6 text-black bg-white">
      <div className="w-full max-w-[400px] h-full max-h-[800px] rounded-[35px] relative p-2 bg-black flex justify-center">
        <div className="absolute w-[120px] -m-auto top-4 h-7 rounded-3xl bg-black" />
        <div className="h-full rounded-[30px] bg-white w-full text-black flex items-center justify-center">
          hello
        </div>
      </div>
      <div>
        <label htmlFor="menu" className="relative">
          <input type="checkbox" className="w-10 h-10 sr-only peer" id="menu" />

          <div className="w-10 cursor-pointer z-50 peer-checked:first:[&>div]:rotate-45 first:[&>div]:rotate-0 peer-checked:last:[&>div]:-rotate-45 peer-checked:last:[&>div]:-top-3 first:[&>div]:top-0 peer-checked:first:[&>div]:top-3 last:[&>div]:top-0 last:[&>div]:rotate-0 peer-checked:even:[&>div]:w-0 h-10 relative flex flex-col justify-evenly items-center">
            <div className="relative w-10 h-2 duration-700 bg-black"></div>
            <div className="w-10 h-2 duration-300 bg-black"></div>
            <div className="relative w-10 h-2 duration-700 bg-black"></div>
          </div>
          <div className="absolute top-0 right-0 w-0 h-full overflow-hidden duration-500 bg-blue-200 peer-checked:bg-blue-500 peer-checked:w-20"></div>
        </label>
      </div>
    </div>
  );
}
