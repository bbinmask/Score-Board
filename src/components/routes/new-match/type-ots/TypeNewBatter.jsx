import React, { useRef, useState } from "react";
import Suggestion from "./Suggestion";
const TypeNewBatter = ({
  battingPrefs,
  bowlingPrefs,
  setBowlingPrefs,
  setBattingPrefs,
  SetBattingPlayers,
  BattingTeamScore,
  matchDetails,
  isCap,
  setCap,
  setStart,
  dispatch,
  SetBattersList,
}) => {
  const captain = useRef();
  const [player, setPlayer] = useState({});
  const [search, setSearch] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let cap = false;
    if (!isCap) {
      cap = captain.current.checked;
      if (cap) {
        setCap(true);
      }
    }

    if (!player) {
      return alert("Name field cannot be empty!");
    }
    const id = BattingTeamScore.playersList.length;
    let playerObject = {
      id: id,
      playerDetails: {
        name: player,
        position: "All-rounder",
        captain: cap,
        wk: false,
      },
      batting: {
        out: false,
        outBy: null,
        playing: false,
        runs: 0,
        dots: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      },
      bowling: {
        playing: false,
        overs: 0,
        limit: 0,
        dots: 0,
        balls: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
      },
      fielding: {
        runOut: [{ name: null, id: null }],
        catchOut: [{ name: null, id: null }],
      },
    };

    setBattingPrefs({
      ...battingPrefs,
      strikeBatter: playerObject,
      isBatterChange: false,
    });
    dispatch(SetBattingPlayers({ data: playerObject, customPlayer: false }));
    dispatch(SetBattersList({ id }));
    setBowlingPrefs({ ...bowlingPrefs, isWicket: false });
    setStart(true);
  };
  const handleBat = (batter) => {
    setPlayer(batter);
  };
  return (
    <div className="relative flex h-full w-full flex-col items-center sm:items-start">
      <form
        className="absolute left-auto top-10 z-30 flex w-96 flex-col gap-2 rounded-md bg-slate-50 p-2 shadow-3xl sm:left-16"
        onSubmit={handleSubmit}
      >
        <h5 className="font-black text-gray-800">NEXT BATTER</h5>
        <div className="flex items-center gap-2 rounded-md">
          <input
            required
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
              setPlayer(e.target.value);
            }}
            readOnly={
              matchDetails.players > BattingTeamScore.playersList.length
                ? false
                : true
            }
            value={player ? player?.playerDetails?.name : ""}
            type="text"
            className="input w-full border-1"
            placeholder="Enter batter name"
          />
          {!isCap && (
            <div className="flex gap-2 rounded-md border-[1px] border-slate-200 bg-slate-50 p-1 text-lg">
              <label className="form-check-label" htmlFor="defaultCheck1">
                Captain
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                className="form-check-input"
                ref={captain}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-dark float-end">
          Add
        </button>
      </form>
      {BattingTeamScore.playersList.length !== 0 && (
        <Suggestion
          TeamScore={BattingTeamScore}
          search={search}
          player={player}
          handlePlayer={handleBat}
          forBat={true}
          matchDetails={matchDetails}
          playerPrefs={battingPrefs}
        />
      )}
    </div>
  );
};

export default TypeNewBatter;
