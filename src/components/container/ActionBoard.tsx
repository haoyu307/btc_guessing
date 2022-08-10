import { useCallback, useEffect, useState } from "react";

import { useBtcUsdPrice } from "../../services";
import ActionBoard from "../pure/ActionBoard";

import { CRYPTO_BTC, CURRENCY_USD, DELAY_TIME } from "../../constants";

const ActionBoardContainer = ({
  isResolved,
  resolveGuess,
  onGuess,
}: {
  isResolved: boolean;
  resolveGuess: (
    newValue: number,
    guessUp: boolean,
    callbackFn?: () => void
  ) => void;
  onGuess: () => void;
}) => {
  const [isUp, setIsUp] = useState<boolean>(true);
  const [shouldFetchPrice, setShouldFetchPrice] = useState<boolean>(true);

  // * fetch coin price
  const priceResult = useBtcUsdPrice(!isResolved && shouldFetchPrice);
  useEffect(() => {
    if (
      !isResolved &&
      priceResult.isSuccess &&
      priceResult.data[CRYPTO_BTC.id] &&
      priceResult.data[CRYPTO_BTC.id][CURRENCY_USD.id]
    ) {
      const newPrice = priceResult.data[CRYPTO_BTC.id][CURRENCY_USD.id];
      resolveGuess(newPrice, isUp, () => setShouldFetchPrice(false));
    }
  }, [priceResult.isSuccess, priceResult.data, isUp, resolveGuess, isResolved]);

  const onUp = useCallback(() => {
    if (isResolved) setIsUp(true);
  }, [isResolved]);
  const onDown = useCallback(() => {
    if (isResolved) setIsUp(false);
  }, [isResolved]);
  const onGo = useCallback(() => {
    onGuess();
    setTimeout(() => {
      setShouldFetchPrice(true);
    }, DELAY_TIME * 1000);
  }, [onGuess]);

  return (
    <ActionBoard
      isUp={isUp}
      disabled={!isResolved}
      onUp={onUp}
      onDown={onDown}
      onGo={onGo}
    />
  );
};

export default ActionBoardContainer;
