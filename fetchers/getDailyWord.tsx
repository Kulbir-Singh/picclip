import { useQuery } from "@tanstack/react-query";

export const GetDailyWord = ({
  reFetchTriggers,
}: {
  reFetchTriggers?: any;
}) => {
  return useQuery(
    ["GetDailyWord", reFetchTriggers],
    async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/dailyWord`, options);

      const jsonRes = await response.json();
      return jsonRes;
    },
    { staleTime: 24 * 60 * 60 * 1000 }
  );
};
