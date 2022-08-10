import React from "react";

const CheckBoard = ({
  score,
  oldPrice,
  newPrice,
  coinName,
  priceUnit,
}: {
  score: number;
  oldPrice: number | undefined;
  newPrice: number | undefined;
  coinName: string;
  priceUnit: string;
}) => {
  return (
    <div className="flex-0 py-8 w-full h-full">
      <div className="py-4 flex flex-row justify-center items-center">
        <span className="text-2xl text-amber-600">SCORE</span>
        <span className="ml-4 text-3xl text-violet-700">{score}</span>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center">
          <span className="text-lg">{`Current ${coinName} Price`}</span>
          <span className="text-xl text-rose-500">
            {oldPrice ? `${priceUnit}${oldPrice}` : ""}
          </span>
        </div>

        <div className="ml-20 flex flex-col items-center">
          <span className="text-lg">{`New ${coinName} Price`}</span>
          <span className="text-xl text-rose-500">
            {newPrice ? `${priceUnit}${newPrice}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckBoard;
