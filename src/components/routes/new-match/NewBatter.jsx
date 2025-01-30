import React, { useEffect, useRef, useState } from "react";

const NewBatter = ({
  setStart,
  setBowlingPrefs,
  bowlingPrefs,
  SetBattersList,
  battingPrefs,
  setBattingPrefs,
  matchDetails,
  BattingTeamScore,
  dispatch,
}) => {
  const batterRef = useRef(null);

  const handleTog = (event) => {
    event.preventDefault();
    const player = JSON.parse(batterRef.current.value);
    dispatch(SetBattersList({ id: player.id }));
    setBattingPrefs({
      ...battingPrefs,
      strikeBatter: player,
      isBatterChange: false,
    });
    setBowlingPrefs({ ...bowlingPrefs, isWicket: false });
    setStart(true);
  };
  return (
    <>
      <div className="relative">
        <form
          className="batter-select absolute left-12 top-16 z-30 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl"
          onSubmit={handleTog}
        >
          <h5 className="text-center font-semibold">New Batter</h5>
          <select
            defaultValue={""}
            required={true}
            ref={batterRef}
            className="form-select opt"
          >
            {BattingTeamScore.playersList.map((player, i) => {
              if (!player.batting.out && !player.batting.playing) {
                return (
                  <option
                    className="opt"
                    key={i}
                    value={JSON.stringify(player)}
                    defaultValue={JSON.stringify(player)}
                    disabled={i === battingPrefs.nonStrikeBatter.id}
                  >
                    {player.playerDetails.name}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBatter;
