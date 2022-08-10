import { useCallback, useEffect, useState } from "react";

import { useCreateAccount, usePersistScore, useScore } from "../services";
import CheckBoard from "../components/container/CheckBoard";
import ActionBoard from "../components/container/ActionBoard";
import Footer from "../components/pure/Footer";

var CoinKey = require("coinkey");

const Guess = () => {
  const [userId, setUserId] = useState<string>();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [fetchResultText, setFetchResultText] = useState<string>(
    "Initializing coin price"
  );

  // * checking saved userid & create one if not exists
  useCreateAccount(isNewUser ? userId : undefined);

  useEffect(() => {
    const currentUserId = localStorage.getItem("btc_guessing_userid");
    if (!currentUserId) {
      const newUserId = CoinKey.createRandom();
      localStorage.setItem("btc_guessing_userid", newUserId);
      setUserId(newUserId);
      setIsNewUser(true);
    } else {
      setUserId(currentUserId);
      const currentScore = localStorage.getItem("btc_guessing_score");
      setScore(parseInt(currentScore ?? "0"));
    }
  }, []);

  // * Initializing : getting the score of the user if the user is oldUser
  const scoreResult = useScore(userId);
  useEffect(() => {
    if (scoreResult.isSuccess) {
      const newScore = scoreResult.data.score;
      if (newScore) setScore(newScore);
    }
  }, [scoreResult.isSuccess, scoreResult.data]);

  const persistScoreMutation = usePersistScore(userId ?? "");
  const resolveGuess = useCallback(
    (
      oldCoinPrice: number | undefined,
      newCoinPrice: number,
      guessUp: boolean,
      oldScore: number,
      callbackFn?: () => void
    ) => {
      if (oldCoinPrice === undefined) {
        setOldPrice(newCoinPrice);
        setIsResolved(true);
        setFetchResultText("Please guess");
        if (callbackFn) callbackFn();
      } else if (newCoinPrice === oldCoinPrice) {
        setFetchResultText(
          "The price didn't increase nor decrease, continue checking"
        );
      } else {
        setNewPrice(newCoinPrice);
        if (
          (newCoinPrice > oldCoinPrice && guessUp) ||
          (newCoinPrice < oldCoinPrice && !guessUp)
        ) {
          const newScore = oldScore + 1;
          setScore(newScore);
          setFetchResultText("Success, your guess was right.");
          if (!persistScoreMutation.isLoading) {
            persistScoreMutation.mutate({
              score: newScore,
            });
          }
        } else {
          const newScore = oldScore - 1;
          setScore(newScore);
          persistScoreMutation.mutate({
            score: newScore,
          });
          setFetchResultText("Failed, your guess is wrong");
        }
        setIsResolved(true);
        if (callbackFn) callbackFn();
      }
    },
    [persistScoreMutation]
  );
  const onGuess = useCallback((price: number | undefined) => {
    setIsResolved(false);
    if (price) setOldPrice(price);
    setNewPrice(undefined);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <CheckBoard score={score} oldPrice={oldPrice} newPrice={newPrice} />
      <ActionBoard
        isResolved={isResolved}
        resolveGuess={(newValue: number, guessUp: boolean) =>
          resolveGuess(oldPrice, newValue, guessUp, score)
        }
        onGuess={() => onGuess(newPrice)}
      />
      <Footer text={fetchResultText} isLoading={!isResolved} />
    </div>
  );
};

export default Guess;
