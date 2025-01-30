import { SetTeam1BowlersList } from "@/store/currentMatch";
import React, { useState } from "react";

const SelectBatter = ({
  TeamScore,
  dispatch,
  battingPrefs,
  SetBattersList,
  setBowlingPrefs,
  bowlingPrefs,
  setBattingPrefs,
  toggle,
  setToggle,
}) => {
  const { nonStrikeBatter: nonStrike, strikeBatter: strike } = battingPrefs;
  const { wickets } = bowlingPrefs;
  const [tog, setTog] = useState(false);

  const handleStrike = (e) => {
    const player = JSON.parse(e.target.value);
    setBattingPrefs({ ...battingPrefs, strikeBatter: player });
  };

  const handleNonStrike = (e) => {
    const player = JSON.parse(e.target.value);
    setBattingPrefs({ ...battingPrefs, nonStrikeBatter: player });
  };

  const handleTog = (event) => {
    event.preventDefault();
    if (strike == null) {
      return alert("Select a player!");
    }
    dispatch(SetBattersList({ id: strike.id }));
    setTog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nonStrike == null) {
      alert("Select a player!");
      return;
    }
    dispatch(SetBattersList({ id: nonStrike.id }));
    setBattingPrefs({ ...battingPrefs, isBatterChange: false });
    setToggle(true);
  };
  return (
    <>
      {!toggle && (
        <div className="relative">
          <div className="batter-select absolute left-12 top-16 z-40 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl">
            {!tog && (
              <form>
                <h5 className="py-2 text-center">Strike Batter</h5>
                <select onChange={handleStrike} className="form-select opt">
                  <option className="opt" value={""} selected disabled>
                    Select Striker
                  </option>
                  {TeamScore.playersList.map((player, index) => (
                    <option
                      className="opt"
                      key={index}
                      disabled={index == nonStrike?.id}
                      value={JSON.stringify(player)}
                    >
                      {/* {TeamScore.playersList[index].playerDetails.name} */}
                      {player.playerDetails.name}
                    </option>
                  ))}
                </select>
                {!tog && (
                  <button
                    onClick={handleTog}
                    className="btn btn-danger"
                    type="button"
                  >
                    Submit
                  </button>
                )}
              </form>
            )}

            {tog && wickets == 0 && (
              <form>
                <h5 className="py-2 text-center">Non-Strike Batsman</h5>
                <select onChange={handleNonStrike} className="form-select opt">
                  <option className="opt" value={""} selected={true} disabled>
                    Select Non Striker
                  </option>
                  {TeamScore.playersList.map((player, index) => (
                    <option
                      className="opt"
                      key={index}
                      disabled={index == strike?.id}
                      value={JSON.stringify(player)}
                    >
                      {/* {TeamScore.playersList[index].playerDetails.name} */}
                      {player.playerDetails.name}
                    </option>
                  ))}
                </select>
                {wickets == 0 && tog && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-danger"
                  >
                    Submit
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectBatter;
