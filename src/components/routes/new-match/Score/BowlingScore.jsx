import React from "react";
import calEconomy from "../../../../utils/functions/player-utils/calEconomy";
import oversCount from "../../../../utils/functions/player-utils/oversCount";
import shortName from "../../../../utils/functions/player-utils/shortName";
const BowlingScore = ({ bowling }) => {
  return (
    <>
      <div className="bowling-div w-full bg-slate-50 px-0 py-2 md:w-xl">
        <div className="bowling flex w-full flex-col border-[1px] border-t-gray-500">
          <div className="flex flex-row items-center justify-between bg-gray-400 px-2 font-semibold">
            <span className="insert">Bowling</span>
            <ul className="stats-insert w-60">
              <li className="stats-li insert">O</li>
              <li className="stats-li insert">M</li>
              <li className="stats-li insert">R</li>
              <li className="stats-li insert">W</li>
              <li className="stats-li insert">ECO.</li>
            </ul>
          </div>
          <div className="flex flex-row justify-between px-2 py-1">
            <span className="player text-sm">
              {shortName(bowling[0]?.playerDetails.name)}
            </span>
            <ul className="stats flex w-60 flex-row items-center justify-evenly text-sm">
              <li className="stats-li">{oversCount(bowling[0])}</li>
              <li className="stats-li">{bowling[0].bowling.maidens}</li>
              <li className="stats-li">{bowling[0].bowling.runs}</li>
              <li className="stats-li">{bowling[0].bowling.wickets}</li>
              <li className="stats-li">{calEconomy(bowling[0])}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BowlingScore;
