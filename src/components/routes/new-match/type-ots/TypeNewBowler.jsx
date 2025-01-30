import React, { useRef, useState, useEffect } from "react";
import Suggestion from "./Suggestion";

const TypeNewBowler = ({
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
  const [player, setPlayer] = useState();

  const handleBowl = (bowler) => {
    setPlayer(bowler);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = BowlingTeamScore.playersList.length;
    let cap = false;
    if (!isCap) {
      cap = captain.current.checked;
      if (cap) {
        setCap(true);
      }
    }
    if (player.id == 0 || player.id) {
      setBowlingPrefs({
        ...bowlingPrefs,
        currentBowler: player,
        isBowlerChange: false,
        isWicket: false,
        isOverCompleted: false,
      });
      dispatch(SetBowlersList({ id: player.id }));
    } else {
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
      setBowlingPrefs({
        ...bowlingPrefs,
        currentBowler: playerObject,
        isBowlerChange: false,
        isWicket: false,
        isOverCompleted: false,
      });
      dispatch(SetBowlingPlayers({ data: playerObject, id: false }));
      dispatch(SetBowlersList({ id }));
    }

    setStart(true);
  };

  useEffect(() => {}, [BowlingTeamScore]);
  return (
    <div className="relative flex h-full w-full flex-col items-center bg-slate-50 md:items-start">
      <form
        className="absolute left-auto top-10 z-30 flex w-96 flex-col gap-2 rounded-md bg-slate-50 p-2 shadow-3xl md:left-16"
        onSubmit={handleSubmit}
      >
        <h5 className="font-black text-gray-800">Add next bowler</h5>
        <div className="flex items-center gap-2 rounded-md">
          <input
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
              setPlayer(e.target.value);
            }}
            readOnly={
              matchDetails.players > BowlingTeamScore.playersList.length
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
      {BowlingTeamScore.playersList.length !== 0 && (
        <Suggestion
          matchDetails={matchDetails}
          TeamScore={BowlingTeamScore}
          search={search}
          player={player}
          handlePlayer={handleBowl}
          forBat={false}
          playerPrefs={bowlingPrefs}
        />
      )}
    </div>
  );
};

export default TypeNewBowler;
