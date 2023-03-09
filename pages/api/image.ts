// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch(
    "https://guessTheWord.kulbirsingh1.repl.co/imgUrl"
  );
  const resData = await response.json();
  res.status(200).json(resData);
}
