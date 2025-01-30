import React from "react";

const Suggestion = ({
  TeamScore,
  search,
  player,
  handlePlayer,
  forBat,
  matchDetails,
  playerPrefs,
}) => {
  return (
    <div className="absolute left-36 top-64 z-30 flex min-w-72 flex-col justify-center gap-2 rounded-md bg-slate-50 px-10 shadow-3xl lg:left-2/3 lg:top-12">
      <h5 className="m-2 text-center text-black">Suggestions</h5>
      <ol className="list px-5" type="1" style={{ listStyleType: "decimal" }}>
        {TeamScore?.playersList
          .filter((pl) =>
            search === ""
              ? pl
              : pl?.playerDetails?.name.toLowerCase().includes(search),
          )
          .map((pl, i) => {
            if (forBat) {
              if (pl.batting.out || pl.batting.playing) return;
              return (
                <li
                  disabled={!!player}
                  key={i}
                  onClick={() => {
                    handlePlayer(pl);
                  }}
                  className={`my-2 w-full cursor-pointer rounded-md px-4 font-mono font-semibold hover:text-lg active:bg-gray-300 active:text-[20px] ${player && pl.id == player.id && "text-gray-500 line-through"}`}
                >
                  {pl.playerDetails.name}
                </li>
              );
            } else if (!forBat) {
              if (
                pl.id == playerPrefs?.currentBowler?.id ||
                pl.bowling.limit >= matchDetails.limit
              )
                return;
              return (
                <li
                  disabled={!!player}
                  key={i}
                  onClick={() => {
                    handlePlayer(pl);
                  }}
                  className={`w-full cursor-pointer rounded-md px-4 py-2 font-mono font-semibold hover:text-lg active:bg-gray-300 active:text-[20px] ${player && pl.id == player.id && "text-gray-500"}`}
                >
                  {pl.playerDetails.name}
                </li>
              );
            }
          })}
      </ol>
    </div>
  );
};

export default Suggestion;
