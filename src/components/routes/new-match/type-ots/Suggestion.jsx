import React from "react";

const Suggestion = ({ inning, search, pl, handlePl, isBat }) => {
  return (
    <div className="w-96">
      <ul className="list absolute left-36 top-64 z-30 flex w-56 flex-col gap-2 rounded-md bg-slate-50 p-0 shadow-3xl lg:left-2/3 lg:top-12">
        {inning.length !== 0 &&
          inning
            .filter((player) => {
              return search === ""
                ? player
                : player.name.toLowerCase().includes(search);
            })
            .map((player, i) => {
              if (isBat) {
                if (player.out) return;
                else if (player.playing) return;
                return (
                  <li
                    disabled={!!pl}
                    key={i}
                    onClick={() => {
                      handlePl(player);
                    }}
                    className={`cursor-pointer rounded-md px-4 py-2 font-mono font-semibold hover:bg-slate-200 active:bg-gray-300 active:text-lg ${pl && player.id == pl.id ? "text-gray-500 line-through" : ""}`}
                  >
                    {player.name}
                  </li>
                );
              } else if (!isBat) {
                if (player.bowling) return;
                return (
                  <li
                    disabled={!!pl}
                    key={i}
                    onClick={() => {
                      handlePl(player);
                    }}
                    className={`cursor-pointer px-4 py-2 font-mono font-semibold hover:bg-slate-200 active:bg-gray-300 active:text-lg ${pl && player.id == pl.id ? "text-gray-500" : ""}`}
                  >
                    {player.name}
                  </li>
                );
              }
            })}
      </ul>
    </div>
  );
};

export default Suggestion;
