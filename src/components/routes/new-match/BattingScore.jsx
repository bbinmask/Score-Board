import React from "react";
import strikeRate from "./functions/strikeRate";
import point from "./functions/point";
import shortName from "./functions/shortName";
import findPos from "./functions/findPos";
const BattingScore = ({ strike, batting, wicket }) => {
  return (
    <div className="batting-div w-full rounded-md md:w-xl">
      <div className="batting flex w-full flex-col bg-slate-50">
        <div className="flex flex-row items-center justify-between bg-gray-400 px-2 py-1 font-semibold">
          <span className="insert">Batter</span>
          <ul className="stats-insert w-60">
            <li className="stats-li insert">R</li>
            <li className="stats-li insert">B</li>
            <li className="stats-li insert">4</li>
            <li className="stats-li insert">6</li>
            <li className="stats-li insert">SR.</li>
          </ul>
        </div>
        <div className="flex flex-row justify-between px-2 py-1">
          <span className="player text-sm">{`${shortName(batting[wicket]?.name)} ${findPos(batting[wicket])}${point(strike, batting[wicket].id)}`}</span>
          <ul className="stats flex w-60 flex-row items-center justify-evenly text-sm">
            <li className="stats-li">{batting[wicket]?.runs}</li>
            <li className="stats-li">{batting[wicket]?.balls}</li>
            <li className="stats-li">{batting[wicket]?.fours}</li>
            <li className="stats-li">{batting[wicket]?.sixes}</li>
            <li className="stats-li">
              {strikeRate(batting[wicket]?.runs, batting[wicket]?.balls)}
            </li>
          </ul>
        </div>
        <div className="flex flex-row justify-between px-2 py-1">
          <span className="player text-sm">{`${shortName(batting[wicket + 1]?.name)}${point(strike, batting[wicket + 1]?.id)}`}</span>
          <ul className="stats flex w-60 flex-row items-center justify-evenly text-sm">
            <li className="stats-li">{batting[wicket + 1]?.runs}</li>
            <li className="stats-li">{batting[wicket + 1]?.balls}</li>
            <li className="stats-li">{batting[wicket + 1]?.fours}</li>
            <li className="stats-li">{batting[wicket + 1]?.sixes}</li>
            <li className="stats-li">
              {strikeRate(
                batting[wicket + 1]?.runs,
                batting[wicket + 1]?.balls,
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BattingScore;
