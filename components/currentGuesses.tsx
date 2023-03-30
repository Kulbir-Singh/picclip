import GuessContainer from "./ProgressBar";

interface Props {
  guesses: { answers: { word: string; accuracy: number }[] };
}

export default function CurrentGuesses({ guesses }: Props) {
  return (
    <div className="h-full xs:h-fit">
      {guesses.answers?.map((answer, index) => {
        return (
          <div key={answer.word + index}>
            <GuessContainer progress={answer.accuracy} answer={answer.word} />
          </div>
        );
      })}
    </div>
  );
}
