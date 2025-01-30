import strikeRate from "../../../../utils/functions/player-utils/strikeRate";
import point from "../../../../utils/functions/player-utils/point";
import shortName from "../../../../utils/functions/player-utils/shortName";
import findPos from "../../../../utils/functions/player-utils/findPos";
const BattingScore = ({
  strike,
  battingPrefs,
  currentPlayers,
  BattingTeamScore,
}) => {
  return (
    <>
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
          {BattingTeamScore.batting.map((player, i) => {
            if (player.id === battingPrefs.strikeBatter.id) {
              return (
                <div
                  key={i}
                  className="flex flex-row justify-between px-2 py-1"
                >
                  <span className="player text-sm">{`${shortName(player?.playerDetails?.name)} ${findPos(player)} ${point(strike.id, player?.id)}`}</span>
                  <ul className="stats flex w-60 flex-row items-center justify-evenly text-sm">
                    <li className="stats-li">{player?.batting.runs}</li>
                    <li className="stats-li">{player?.batting.balls}</li>
                    <li className="stats-li">{player?.batting.fours}</li>
                    <li className="stats-li">{player?.batting.sixes}</li>
                    <li className="stats-li">
                      {strikeRate(player?.batting.runs, player?.batting.balls)}
                    </li>
                  </ul>
                </div>
              );
            } else if (player.id === battingPrefs.nonStrikeBatter.id) {
              return (
                <div
                  key={i}
                  className="flex flex-row justify-between px-2 py-1"
                >
                  <span className="player text-sm">{`${shortName(player?.playerDetails?.name)} ${point(strike.id, player?.id)}`}</span>
                  <ul className="stats flex w-60 flex-row items-center justify-evenly text-sm">
                    <li className="stats-li">{player?.batting.runs}</li>
                    <li className="stats-li">{player?.batting.balls}</li>
                    <li className="stats-li">{player?.batting.fours}</li>
                    <li className="stats-li">{player?.batting.sixes}</li>
                    <li className="stats-li">
                      {strikeRate(player?.batting.runs, player?.batting.balls)}
                    </li>
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default BattingScore;
