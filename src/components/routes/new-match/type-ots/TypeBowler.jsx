import React, { useRef, useState, useEffect } from "react";
import Suggestion from "./Suggestion";

const TypeBowler = ({
  SetBowlingPlayers,
  BowlingTeamScore,
  matchDetails,
  setBowlingPrefs,
  bowlingPrefs,
  setStart,
  isCap,
  setCap,
  dispatch,
  SetBowlersList,
}) => {
  const captain = useRef();
  const [search, setSearch] = useState("");
  const [player, setPl] = useState(null);
  const handleBowl = (bowler) => {
    setPl(bowler);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let cap = false;
    if (!isCap) {
      cap = captain.current.checked;
      if (cap) {
        setCap(true);
      }
    }

    if (player.id == 0 || player.id) {
      dispatch(SetBowlersList({ id: player.id }));
      setBowlingPrefs({
        ...bowlingPrefs,
        isBowlerChange: false,
        currentBowler: player,
      });
    } else {
      const id = BowlingTeamScore.playersList.length;
      let playerObject = {
        id,
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
      dispatch(SetBowlingPlayers({ data: playerObject, customPlayer: false }));
      dispatch(SetBowlersList({ id }));
      setBowlingPrefs({
        ...bowlingPrefs,
        isBowlerChange: false,
        currentBowler: playerObject,
      });
    }
    setStart(true);
  };
  useEffect(() => {}, [BowlingTeamScore, player]);
  return (
    <div className="relative flex flex-col items-center bg-slate-50 md:items-start">
      <form
        className="absolute left-auto top-10 z-30 flex w-full flex-col gap-2 rounded-md bg-slate-50 p-2 shadow-3xl md:left-16 md:w-xl"
        onSubmit={handleSubmit}
      >
        <h5 className="font-black text-gray-800">Add next bowler</h5>
        <div className="flex items-center gap-2 rounded-md">
          <input
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
              setPl(e.target.value);
            }}
            readOnly={
              matchDetails.players > BowlingTeamScore.playersList.length
                ? false
                : true
            }
            value={player ? player?.playerDetails?.name : ""}
            type="text"
            className="input w-full border-1"
            placeholder="Enter bowler name"
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

      {BowlingTeamScore.playersList.length !== 0 && (
        <Suggestion
          TeamScore={BowlingTeamScore}
          search={search}
          player={player}
          handlePlayer={handleBowl}
          forBat={false}
          matchDetails={matchDetails}
        />
      )}
    </div>
  );
};

export default TypeBowler;
