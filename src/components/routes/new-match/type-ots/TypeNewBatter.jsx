import React, { useRef, useState } from "react";
import Suggestion from "./Suggestion";
const TypeNewBatter = ({
  inning,
  strike,
  nonStrike,
  setW,
  hideBowler,
  match,
  overCompleted,
  isCap,
  setHideBowler,
  setCap,
  wicket,
  setInning,
  setStrike,
  setStart,
  setNonStrike,
  toggle,
  setToggle,
  dispatch,
  scoring,
  score,
}) => {
  console.log(inning);
  const playerRef = useRef();
  const captain = useRef();
  const [pl, setPl] = useState({});
  const [search, setSearch] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const player = playerRef.current.value;
    let cap = null;
    if (!isCap) cap = captain.current.checked;

    if (!isCap) {
      if (cap) setCap(true);
    }

    if (!player) {
      alert("Name field cannot be empty!");
    }
    const i = inning.length;
    let playerObject = {
      name: player,
      position: "All-rounder",
      bowling: false,
      captaion: cap,
      wk: false,
      out: false,
      playing: false,
      runs: 0,
      id: i,
      status: false,
      fours: 0,
      sixes: 0,
      overs: {
        over: 0,
        limit: match.limit,
        dot: 0,
        balls: 0,
        maiden: 0,
        runs: 0,
        wicket: 0,
      },
      balls: 0,
    };

    setStrike(i);
    await dispatch(setInning({ type: playerObject, id: false }));
    await dispatch(scoring({ i: i, type: playerObject }));

    setW(false);
    if (hideBowler) {
      setHideBowler(false);
    }
    if (overCompleted !== 0) {
      setStart(true);
    }
  };

  const handleBat = (batter) => {
    setPl(batter);
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
              setPl(e.target.value);
            }}
            readOnly={match.players > inning.length ? false : true}
            value={pl ? pl.name : ""}
            ref={playerRef}
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
      {inning.length !== 0 && (
        <Suggestion
          inning={inning}
          search={search}
          pl={pl}
          handlePl={handleBat}
          isBat={true}
        />
      )}
    </div>
  );
};

export default TypeNewBatter;
