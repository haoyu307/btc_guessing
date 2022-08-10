import React from "react";

import CheckBoard from "../pure/CheckBoard";
import { CRYPTO_BTC, CURRENCY_USD } from "../../constants";

const CheckBoardContainer = ({
  score,
  oldPrice,
  newPrice,
}: {
  score: number;
  oldPrice: number | undefined;
  newPrice: number | undefined;
}) => {
  return (
    <CheckBoard
      score={score}
      oldPrice={oldPrice}
      newPrice={newPrice}
      coinName={CRYPTO_BTC.label}
      priceUnit={CURRENCY_USD.label}
    />
  );
};

export default CheckBoardContainer;
