import { useQuery } from "@tanstack/react-query";

export const GetWordAccuracy = ({
  word,
  reFetchTriggers,
}: {
  word: string;
  reFetchTriggers?: any;
}) => {
  return useQuery(["GetWordAccuracy"], async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `/api/textMatching?secondWord=${word}`,
      options
    );

    const jsonRes = await response.json();

    return jsonRes;
  });
};
