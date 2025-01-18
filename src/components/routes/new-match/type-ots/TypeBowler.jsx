import React, { useRef, useState, useEffect } from "react";
import Suggestion from "./Suggestion";

const TypeBowler = ({
  setBowler,
  setOvers,
  setHideBowler,
  setStart,
  inning,
  isCap,
  setCap,
  bowler,
  setInning,
  overs,
  match,
  toggle,
  setToggle,
  dispatch,
  scoring,
  setChangeBowler,
}) => {
  const captain = useRef();
  const [search, setSearch] = useState("");
  const [pl, setPl] = useState({});
  const handleBowl = (bowler) => {
    setPl(bowler);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let cap = null;
    if (!isCap) cap = captain.current.checked;

    if (!isCap) {
      if (cap) setCap(true);
    }

    if (pl.id == 0 || pl.id) {
      dispatch(scoring({ i: pl.id, type: pl }));

      setOvers({ id: pl.id, limit: match.limit });
    } else {
      let playerObject = {
        name: pl,
        position: "All-rounder",
        bowling: false,
        out: false,
        playing: false,
        captaion: cap,
        wk: false,
        runs: 0,
        id: inning.length,
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
      dispatch(setInning({ type: playerObject, id: false }));
      dispatch(scoring({ i: inning.length, type: playerObject }));
      setOvers({ id: inning.length, limit: match.limit });
    }

    if (overs) {
      setBowler(overs);
    }
    setToggle((t) => !t);
    setStart(true);
    setChangeBowler(false);
    setHideBowler(true);
  };

  useEffect(() => {}, [inning, pl]);

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
            readOnly={match.players > inning.length ? false : true}
            value={pl ? pl.name : ""}
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
      <Suggestion
        inning={inning}
        search={search}
        pl={pl}
        handlePl={handleBowl}
        isBat={false}
      />
    </div>
  );
};

export default TypeBowler;
