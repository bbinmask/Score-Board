import React from "react";

import Shot from "./Shot";
import BattingScore from "./BattingScore";
import BowlingScore from "./BowlingScore";
const ScoreBoard = ({
  team1,
  team2,
  overs,
  inning1,
  handleExtra,
  inning2,
  recentBalls,
  handleShot,
  strike,
  nonStrike,
  bowler,
  bat1,
  wicket,
  bat2,
  setBowler,
  setStrike,
  setNonStrike,
  handleStrikeChange,
}) => {
  const batting = bat1.batting;
  const bowling = bat2.bowling;
  return (
    <>
      <div className="score-board h-screen px-1 py-2">
        <div className="w-full rounded-md shadow-md shadow-black md:w-xl">
          <span className="flex w-full justify-center text-nowrap rounded-t-md bg-green-600 p-1 text-center font-serif text-xl font-semibold text-slate-100">{`${team1} vs ${team2}`}</span>
          <div className="score"></div>
          <BattingScore strike={strike} batting={batting} wicket={wicket} />
          <BowlingScore bowling={bowling} overs={overs} />
          <div className="prev-balls flex w-full gap-1 rounded-b-md bg-slate-50 p-1 md:w-xl">
            <span>overs: </span>
            <div className="overs flex w-full flex-row-reverse flex-nowrap gap-1 overflow-hidden">
              {Array.from({ length: recentBalls.length }, (_, index) => {
                return (
                  <span key={index} className="ball text-nowrap text-xs">
                    {recentBalls[index]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <Shot
          handleExtra={handleExtra}
          handleShot={handleShot}
          handleStrikeChange={handleStrikeChange}
        />
      </div>
    </>
  );
};

export default ScoreBoard;
