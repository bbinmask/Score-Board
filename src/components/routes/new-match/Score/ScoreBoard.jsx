import Shot from "../Shot";
import BattingScore from "./BattingScore";
import BowlingScore from "./BowlingScore";
const ScoreBoard = ({
  battingPrefs,
  bowlingPrefs,
  BattingTeamScore,
  BowlingTeamScore,
  team1,
  handleUndo,
  handleRedo,
  team2,
  handleExtra,
  recentBalls,
  handleShot,
  handleStrikeChange,
}) => {
  return (
    <>
      <div className="score-board h-screen px-1 py-2">
        <div className="w-full rounded-md shadow-md shadow-black md:w-xl">
          <span className="flex w-full justify-center text-nowrap rounded-t-md bg-green-600 p-1 text-center font-serif text-xl font-semibold text-slate-100">{`${team1} vs ${team2}`}</span>
          <div className="score"></div>
          <BattingScore
            strike={battingPrefs.strikeBatter}
            BattingTeamScore={BattingTeamScore}
            battingPrefs={battingPrefs}
          />
          <BowlingScore
            bowling={BowlingTeamScore.bowling}
            overs={bowlingPrefs.overs}
          />
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
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleExtra={handleExtra}
          handleShot={handleShot}
          handleStrikeChange={handleStrikeChange}
        />
      </div>
    </>
  );
};

export default ScoreBoard;
