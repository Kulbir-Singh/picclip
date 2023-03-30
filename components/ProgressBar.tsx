import classNames from "../utils/twClassNames";
interface Props {
  answer: string;
  progress: number;
  small?: boolean;
}

export default function GuessContainer({ progress, answer, small }: Props) {
  return (
    <div
      className={classNames(
        small ? "text-xs" : "sm:text-lg",
        "max-w-[600px] m-auto px-6 text-white/80"
      )}
    >
      <p
        className={classNames(
          small ? " translate-y-4" : " translate-y-2",
          " font-semibold tracking-wide capitalize min-h-[12px] xs:min-h-[32px] translate-y-2"
        )}
      >
        {answer}
      </p>
      <div className="flex items-center">
        <div className="relative w-full h-fit">
          <div
            className="bg-green-600 h-1.5 rounded-xl absolute z-10 left-0 top-0"
            style={{ width: progress + "%" }}
          ></div>
          <div className="bg-slate-800 w-full h-1.5 rounded-xl absolute left-0 top-0"></div>
        </div>
        <div className="pl-4">
          <p
            className={classNames(
              progress > 0 ? "" : "text-slate-800",
              "w-10 font-bold tracking-wider"
            )}
          >
            {progress + "%"}
          </p>
        </div>
      </div>
    </div>
  );
}
