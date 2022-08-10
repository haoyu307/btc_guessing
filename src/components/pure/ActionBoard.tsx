import React from "react";

import { ReactComponent as UpIcon } from "../../assets/up.svg";
import { ReactComponent as DownIcon } from "../../assets/down.svg";
import GoPng from "../../assets/go.png";
import GoDisabledPng from "../../assets/go_inactive.png";

const ActionBoard = ({
  isUp,
  disabled,
  onUp,
  onDown,
  onGo,
}: {
  isUp: boolean;
  disabled: boolean;
  onUp: () => void;
  onDown: () => void;
  onGo: () => void;
}) => {
  return (
    <div className="flex-1 relative py-4 px-20 min-w-1/3 rounded-md border border-cyan-700 self-center shadow-md">
      <span className="absolute -top-6 pt-3 px-3 bg-white text-xl text-blue-800">
        Guess
      </span>
      <div className="flex flex-row items-center">
        <span className="flex-0 text-xl">Price Goes</span>
        <div className="ml-12 flex flex-col items-end">
          <UpIcon
            onClick={onUp}
            width={45}
            height={45}
            className={`${isUp ? "" : "opacity-30"} ${
              disabled ? "" : "transition ease-in-out delay-100 hover:scale-110"
            }`}
          />
          <DownIcon
            onClick={onDown}
            width={45}
            height={45}
            className={`mt-4 ${isUp ? "opacity-30" : ""} ${
              disabled ? "" : "transition ease-in-out delay-100 hover:scale-110"
            }`}
          />
        </div>
        <div className="flex-1 flex flex-row justify-end">
          <button disabled={disabled} onClick={onGo}>
            <img
              src={disabled ? GoDisabledPng : GoPng}
              alt=""
              width={75}
              height={75}
              className={`ml-20 object-cover ${
                disabled
                  ? ""
                  : "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBoard;
