import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import calEconomy from "./functions/calEconomy";
import strikeRate from "./functions/strikeRate";
import oversCount from "./functions/oversCount";
import wonMessage from "./functions/wonMessage";
import shortName from "./functions/shortName";
import axios from "axios";
const FullScoreCard = ({
  batting,
  team1,
  matchOver,
  winner,
  team2,
  handleSecondInn,
  secondComplete,
}) => {
  //
  const [change, setChange] = useState(true);

  const score = useAppSelector((store) => store.currentMatch);
  const inning1 = batting ? score.inning1 : score.inning2;
  const inning2 = batting ? score.inning2 : score.inning1;
  const bat1 = batting ? score.team1Score : score.team2Score;
  const bat2 = batting ? score.team2Score : score.team1Score;

  const handleChange = (arg) => {
    setChange(arg);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex w-full flex-col justify-evenly md:flex-row">
        <div className="w-full rounded-md bg-slate-50 p-px shadow-3xl md:mt-4 md:w-xl">
          <div className="flex w-full justify-between gap-2 px-2">
            <button
              onClick={() => handleChange(true)}
              type="button"
              className={`buttons my-2 h-full w-full rounded-none p-2 ${!change ? "bg-gray-500 text-slate-50" : "bg-cyan-400 text-slate-50"}`}
            >
              {team1}
            </button>
            <button
              onClick={() => handleChange(false)}
              type="button"
              className={`buttons my-2 h-full w-full rounded-none p-2 ${!change ? "bg-cyan-400 text-slate-50" : "bg-gray-500 text-slate-50"}`}
            >
              {team2}
            </button>
          </div>
          <div className="my-4 flex flex-col items-center">
            <h3>{wonMessage(winner)}</h3>
          </div>
          <div className="my-4">
            <h2 className="text-center font-sans font-black">
              {`${team1} vs ${team2}`}
            </h2>
            <h5 className="text-center font-black">Score Card</h5>
          </div>

          {change ? (
            <div className="full-score w-full border-1 border-slate-300 md:w-full">
              <div className="flex flex-col bg-zinc-800 text-white">
                <div className="flex justify-between p-1 text-lg">
                  <span className="m-1">{`${team1} Inning`}</span>
                  <span className="m-1">{`${bat1.score.runs}/${bat1.score.wicket}`}</span>
                </div>
                <div className="batting-div w-full rounded-md text-black">
                  <div className="batting flex w-full flex-col bg-slate-50">
                    <div className="flex flex-row items-center justify-between bg-gray-400 px-2 py-1 font-semibold">
                      <span className="insert">Batter</span>
                      <ul className="stats-insert w-52">
                        <li className="stats-li insert">R</li>
                        <li className="stats-li insert">B</li>
                        <li className="stats-li insert">4</li>
                        <li className="stats-li insert">6</li>
                        <li className="stats-li insert">SR.</li>
                      </ul>
                    </div>
                    <div>
                      {bat1.batting.map((player, i) => {
                        return (
                          <div
                            key={`${i}div`}
                            className="flex w-full flex-row items-center justify-between px-2 py-1"
                          >
                            <span className="player w-1/3 text-sm font-medium text-cyan-600">
                              {shortName(player.name)}
                            </span>
                            <div className="flex w-full justify-between">
                              <span className="flex w-14 justify-center text-nowrap text-[12px] text-gray-600">
                                {player.out ? "out" : "not out"}
                              </span>
                              <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                <li className="stats-li">{player.runs}</li>
                                <li className="stats-li">{player.balls}</li>
                                <li className="stats-li">{player.fours}</li>
                                <li className="stats-li">{player.sixes}</li>
                                <li className="stats-li">
                                  {strikeRate(player.runs, player.balls)}
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                      <div className="my-2 flex flex-col">
                        <div className="flex justify-between px-2 text-sm">
                          <span>Total</span>
                          <span>{`${bat1.score.runs}/${bat1.score.wicket}`}</span>
                        </div>
                        <div className="flex justify-between px-2 text-sm">
                          <span>Extra</span>
                          <span>0</span>
                        </div>
                        <div className="didnt-bat my-2 flex items-center">
                          <span className="mx-2 text-xs">Did not Bat:</span>
                          {inning1.map((player, i) => {
                            if (player.out || player.playing == true) {
                              return;
                            } else {
                              return (
                                <span
                                  key={i}
                                  className="m-1 text-[10px] text-gray-500"
                                >
                                  {player.name}
                                </span>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bowling-div w-full bg-slate-50 px-0 py-2">
                    <div className="bowling flex w-full flex-col">
                      <div className="flex flex-row items-center justify-between bg-gray-400 px-2 font-semibold">
                        <span className="insert">Bowling</span>
                        <ul className="stats-insert w-52">
                          <li className="stats-li insert">O</li>
                          <li className="stats-li insert">M</li>
                          <li className="stats-li insert">R</li>
                          <li className="stats-li insert">W</li>
                          <li className="stats-li insert">ECO.</li>
                        </ul>
                      </div>
                      <div className="">
                        {bat2.bowling.map((bowler, i) => {
                          return (
                            <div
                              key={`${i}div`}
                              className="flex flex-row justify-between px-2 py-1"
                            >
                              <span key={`${i}a`} className="player text-sm">
                                {bowler.name}
                              </span>
                              <ul
                                key={`${i}ul`}
                                className="stats flex w-52 flex-row items-center justify-evenly text-sm"
                              >
                                <li className="stats-li">
                                  {oversCount(bowler)}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.maiden}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.runs}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.wicket}
                                </li>
                                <li className="stats-li">
                                  {calEconomy(bowler)}
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="full-score w-full border-1 border-slate-300 md:w-full">
              <div className="flex flex-col bg-zinc-800 text-white">
                <div className="flex justify-between p-1 text-lg">
                  <span className="m-1">{`${team2} Inning`}</span>
                  <span className="m-1">{`${bat2.score.runs}/${bat2.score.wicket}`}</span>
                </div>
                <div className="batting-div w-full rounded-md text-black">
                  <div className="batting flex w-full flex-col bg-slate-50">
                    <div className="flex flex-row items-center justify-between bg-gray-400 px-2 py-1 font-semibold">
                      <span className="insert">Batter</span>
                      <ul className="stats-insert w-52">
                        <li className="stats-li insert">R</li>
                        <li className="stats-li insert">B</li>
                        <li className="stats-li insert">4</li>
                        <li className="stats-li insert">6</li>
                        <li className="stats-li insert">SR.</li>
                      </ul>
                    </div>
                    <div className="">
                      {bat2.batting.map((player, i) => {
                        if (bat2.batting.length == 0) {
                          return <h1>Not Started Yet!</h1>;
                        } else {
                          return (
                            <div
                              key={`${i}div`}
                              className="flex w-full flex-row items-center justify-between px-2 py-1"
                            >
                              <span className="player w-1/3 text-sm font-medium text-cyan-600">
                                {shortName(player.name)}
                              </span>
                              <div className="flex w-full justify-between">
                                <span className="flex w-14 justify-center text-nowrap text-[12px] text-gray-600">
                                  {player.out ? "out" : "not out"}
                                </span>
                                <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                  <li className="stats-li">{player.runs}</li>
                                  <li className="stats-li">{player.balls}</li>
                                  <li className="stats-li">{player.fours}</li>
                                  <li className="stats-li">{player.sixes}</li>
                                  <li className="stats-li">
                                    {strikeRate(player.runs, player.balls)}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        }
                      })}
                      <div className="my-2 flex flex-col">
                        <div className="flex justify-between px-2 text-sm">
                          <span>Total</span>
                          <span>{`${bat2.score.runs}/${bat2.score.wicket}`}</span>
                        </div>
                        <div className="flex justify-between px-2 text-sm">
                          <span>Extra</span>
                          <span>0</span>
                        </div>
                        <div className="didnt-bat my-2 flex items-center">
                          <span className="mx-2 text-xs">Did not Bat:</span>
                          {inning2.map(
                            (player, i) =>
                              (!player.out || !player.playing) && (
                                <span
                                  key={i}
                                  className="m-1 text-[10px] text-gray-500"
                                >
                                  {player.name}
                                </span>
                              ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bowling-div w-full bg-slate-50 px-0 py-2">
                    <div className="bowling flex w-full flex-col">
                      <div className="flex flex-row items-center justify-between bg-gray-400 px-2 font-semibold">
                        <span className="insert">Bowling</span>
                        <ul className="stats-insert w-52">
                          <li className="stats-li insert">O</li>
                          <li className="stats-li insert">M</li>
                          <li className="stats-li insert">R</li>
                          <li className="stats-li insert">W</li>
                          <li className="stats-li insert">ECO.</li>
                        </ul>
                      </div>
                      <div className="">
                        {bat1.bowling.map((bowler, i) => {
                          return (
                            <div
                              key={`${i}div`}
                              className="flex flex-row justify-between px-2 py-1"
                            >
                              <span key={`${i}a`} className="player text-sm">
                                {bowler.name}
                              </span>
                              <ul
                                key={`${i}ul`}
                                className="stats flex w-52 flex-row items-center justify-evenly text-sm"
                              >
                                <li className="stats-li">
                                  {oversCount(bowler)}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.maiden}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.runs}
                                </li>
                                <li className="stats-li">
                                  {bowler.overs.wicket}
                                </li>
                                <li className="stats-li">
                                  {calEconomy(bowler)}
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {secondComplete == false && (
            <div className="flex w-full justify-center py-4">
              <button
                type="button"
                onClick={() => {
                  setChange(false);
                  handleSecondInn(undefined);
                }}
                className="buttons w-2/5 bg-red-800 text-slate-50"
              >
                Second Inning
              </button>
            </div>
          )}
        </div>
        <>
          {matchOver && (
            <div className="suggest-div">
              <ul className="suggest-ul">
                <li className="suggest-li">Start next match</li>
                <li className="suggest-li">Save this match</li>
                <li className="suggest-li">Return Home</li>
                <li className="suggest-li"></li>
                <li className="suggest-li"></li>
              </ul>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default FullScoreCard;
