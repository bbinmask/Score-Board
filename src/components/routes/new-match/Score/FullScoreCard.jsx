import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks.js";
import calEconomy from "../../../../utils/functions/player-utils/calEconomy";
import strikeRate from "../../../../utils/functions/player-utils/strikeRate";
import oversCount from "../../../../utils/functions/player-utils/oversCount";
import wonMessage from "../../../../utils/functions/wonMessage";
import shortName from "../../../../utils/functions/player-utils/shortName";
const FullScoreCard = ({
  BattingTeamScore,
  BowlingTeamScore,
  matchPrefs,
  setMatchPrefs,
  winner,
  matchDetails,
  batting,
  firstTeam,
  matchOver,
  secondTeam,
  handleSecondInn,
  secondComplete,
}) => {
  //
  const [change, setChange] = useState(true);

  const score = useAppSelector((store) => store.currentMatch);

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
              className={`buttons my-2 h-full w-full rounded-none p-2 ${!change ? "bg-gray-500 text-slate-50" : "bg-red-700 text-slate-50"}`}
            >
              {firstTeam}
            </button>
            <button
              onClick={() => handleChange(false)}
              type="button"
              className={`buttons my-2 h-full w-full rounded-none p-2 ${!change ? "bg-red-700 text-slate-50" : "bg-gray-500 text-slate-50"}`}
            >
              {secondTeam}
            </button>
          </div>
          {winner && (
            <>
              <div className="my-4 flex flex-col items-center">
                <h3>{wonMessage(winner)}</h3>
              </div>
            </>
          )}
          <div className="my-4">
            <h2 className="text-center font-sans font-black">
              {`${firstTeam} vs ${secondTeam}`}
            </h2>
            <h5 className="text-center font-black">Score Card</h5>
          </div>

          {change ? (
            <div className="full-score w-full border-1 border-slate-300 md:w-full">
              <div className="flex flex-col bg-zinc-800 text-white">
                <div className="flex justify-between p-1 text-lg">
                  <span className="m-1">{`${firstTeam} Inning`}</span>
                  <span className="m-1">{`${BattingTeamScore.score.runs}/${BattingTeamScore.score.wickets}`}</span>
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
                      {BattingTeamScore.batting.map((player, i) => {
                        return (
                          <div
                            key={i}
                            className="flex w-full flex-row items-center justify-between px-2 py-1"
                          >
                            <span className="player w-1/3 text-sm font-medium text-cyan-600">
                              {shortName(player.playerDetails.name)}
                            </span>
                            <div className="flex w-full justify-between">
                              <span className="flex w-14 justify-center text-nowrap text-[12px] text-gray-600">
                                {player.batting.out ? "out" : "not out"}
                              </span>
                              <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                <li className="stats-li">
                                  {player.batting.runs}
                                </li>
                                <li className="stats-li">
                                  {player.batting.balls}
                                </li>
                                <li className="stats-li">
                                  {player.batting.fours}
                                </li>
                                <li className="stats-li">
                                  {player.batting.sixes}
                                </li>
                                <li className="stats-li">
                                  {strikeRate(
                                    player.batting.runs,
                                    player.batting.balls,
                                  )}
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                      <div className="my-2 flex flex-col">
                        <div className="flex justify-between px-2 text-sm">
                          <span>Total</span>
                          <span>{`${BattingTeamScore.score.runs}/${BattingTeamScore.score.wickets}`}</span>
                        </div>
                        <div className="flex justify-between px-2 text-sm">
                          <span>Extra</span>
                          <span>{BattingTeamScore.score.extras.wide}</span>
                        </div>
                        <div className="didnt-bat my-2 flex items-center">
                          <span className="mx-2 text-xs">Did not Bat:</span>
                          {BattingTeamScore.playersList.map(
                            (player, i) =>
                              !player.batting.out &&
                              !player.batting.playing && (
                                <span
                                  key={i}
                                  className="m-1 text-[10px] text-gray-500"
                                >
                                  {player.playerDetails.name}
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
                        {BowlingTeamScore.bowling.map((bowler, i) => {
                          return (
                            <div
                              key={i}
                              className="flex flex-row justify-between px-2 py-1"
                            >
                              <span className="player text-sm">
                                {bowler.playerDetails.name}
                              </span>
                              <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                <li className="stats-li">
                                  {oversCount(bowler)}
                                </li>
                                <li className="stats-li">
                                  {bowler.bowling.maidens}
                                </li>
                                <li className="stats-li">
                                  {bowler.bowling.runs}
                                </li>
                                <li className="stats-li">
                                  {bowler.bowling.wickets}
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
                  <span className="m-1">{`${secondTeam} Inning`}</span>
                  <span className="m-1">{`${BowlingTeamScore.score.runs}/${BowlingTeamScore.score.wickets}`}</span>
                </div>
                <div className="batting-div w-full rounded-md text-black">
                  {BowlingTeamScore.batting.length == 0 ? (
                    <div className="flex w-full items-center justify-center bg-white py-[100px]">
                      <h3 className="">Not Started Yet!</h3>
                    </div>
                  ) : (
                    <div className="">
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
                          {BowlingTeamScore.batting.map((player, i) => (
                            <div
                              key={i}
                              className="flex w-full flex-row items-center justify-between px-2 py-1"
                            >
                              <span className="player w-1/3 text-sm font-medium text-cyan-600">
                                {shortName(player.playerDetails.name)}
                              </span>
                              <div className="flex w-full justify-between">
                                <span className="flex w-14 justify-center text-nowrap text-[12px] text-gray-600">
                                  {player.batting.out ? "out" : "not out"}
                                </span>
                                <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                  <li className="stats-li">
                                    {player.batting.runs}
                                  </li>
                                  <li className="stats-li">
                                    {player.batting.balls}
                                  </li>
                                  <li className="stats-li">
                                    {player.batting.fours}
                                  </li>
                                  <li className="stats-li">
                                    {player.batting.sixes}
                                  </li>
                                  <li className="stats-li">
                                    {strikeRate(
                                      player.batting.runs,
                                      player.batting.balls,
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ))}
                          <div className="my-2 flex flex-col">
                            <div className="flex justify-between px-2 text-sm">
                              <span>Total</span>
                              <span>{`${BowlingTeamScore.score.runs}/${BowlingTeamScore.score.wickets}`}</span>
                            </div>
                            <div className="flex justify-between px-2 text-sm">
                              <span>Extra</span>
                              <span>0</span>
                            </div>
                            <div className="didnt-bat my-2 flex items-center">
                              <span className="mx-2 text-xs">Did not Bat:</span>
                              {BowlingTeamScore.playersList.map(
                                (player, i) =>
                                  !player.batting.out &&
                                  !player.batting.playing && (
                                    <span
                                      key={i}
                                      className="m-1 text-[10px] text-gray-500"
                                    >
                                      {player.playerDetails.name}
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
                            {BattingTeamScore.bowling.map((bowler, i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-row justify-between px-2 py-1"
                                >
                                  <span className="player text-sm">
                                    {bowler.playerDetails.name}
                                  </span>
                                  <ul className="stats flex w-52 flex-row items-center justify-evenly text-sm">
                                    <li className="stats-li">
                                      {oversCount(bowler)}
                                    </li>
                                    <li className="stats-li">
                                      {bowler.bowling.maidens}
                                    </li>
                                    <li className="stats-li">
                                      {bowler.bowling.runs}
                                    </li>
                                    <li className="stats-li">
                                      {bowler.bowling.wickets}
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
                  )}
                </div>
              </div>
            </div>
          )}
          {!matchPrefs.inn2Completed && (
            <div className="flex w-full justify-center py-4">
              <button
                type="button"
                onClick={() => {
                  setChange(false);
                  setMatchPrefs({
                    ...matchPrefs,
                    inn1Completed: true,
                    inn2Started: true,
                  });
                }}
                className="buttons w-2/5 bg-red-800 text-slate-50"
              >
                Second Inning
              </button>
            </div>
          )}
        </div>
        <>
          {matchPrefs.matchOver && (
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
