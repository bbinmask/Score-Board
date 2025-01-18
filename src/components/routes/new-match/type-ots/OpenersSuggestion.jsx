import React from "react";

const OpenersSuggestion = ({
  inning,
  player1,
  player2,
  search,
  active1,
  active2,
  handlePlayer1,
  handlePlayer2,
  setActive1,
  setActive2,
}) => {
  return (
    <>
      <ul className="list absolute left-36 top-64 z-50 flex w-56 flex-col gap-2 rounded-md bg-slate-50 p-0 shadow-3xl lg:left-2/3 lg:top-12">
        <li className="mt-2 text-center font-sans font-semibold text-gray-700">
          Previous
        </li>
        {inning.length !== 0 &&
          inning
            .filter((player) => {
              return search === ""
                ? player
                : player.name.toLowerCase().includes(search);
            })
            .map((player, i) => (
              <li
                key={i}
                onClick={() => {
                  if (!player1 && !player2) {
                    if (active1) {
                      handlePlayer1(player);
                      setActive1(false);
                    } else if (active2) {
                      handlePlayer2(player);
                      setActive2(false);
                    }
                  } else if (player1 && !player2) {
                    if (active1) {
                      handlePlayer1(player);
                      setActive1(false);
                    } else if (active2 && player.id !== player1.id) {
                      handlePlayer2(player);
                      setActive2(false);
                    }
                  } else if (player2 && !player1) {
                    if (active1 && player.id !== player2.id) {
                      handlePlayer1(player);
                      setActive1(false);
                    } else if (active2) {
                      handlePlayer2(player);
                      setActive2(false);
                    }
                  } else {
                    if (active1 && player.id !== player2.id) {
                      handlePlayer1(player);
                      setActive1(false);
                    } else if (active2 && player.id !== player1.id) {
                      handlePlayer2(player);
                      setActive1(false);
                    }
                  }
                }}
                className={`cursor-pointer rounded-md px-4 py-2 font-mono font-semibold hover:bg-slate-200 active:bg-gray-300 active:text-lg ${
                  player1 && player.id === player1.id && "text-gray-500"
                } ${player2 && player.id === player2.id && "text-gray-500"}`}
              >
                {player.name}
              </li>
            ))}
      </ul>
    </>
  );
};

export default OpenersSuggestion;
