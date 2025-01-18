import React, { useState, useEffect } from "react";
import OpenersSuggestion from "./OpenersSuggestion";
const TypeOpeners = ({
  inning,
  strike,
  nonStrike,
  setW,
  setHideBowler,
  match,
  wicket,
  isCap,
  setCap,
  setInning,
  setStrike,
  setNonStrike,
  toggle,
  setToggle,
  dispatch,
  scoring,
  score,
}) => {
  const [search, setSearch] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [captain, setCaptain] = useState(null);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCap) {
      if (captain !== null) {
        setCap(true);
      }
    }

    let playerObject = {
      name: "",
      position: "All-rounder",
      bowling: false,
      out: false,
      playing: false,
      runs: 0,
      captaion: false,
      wk: false,
      id: null,
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

    if ((player1.id == 0 || player1.id) && (player2.id || player2.id == 0)) {
      setStrike(player1.id);

      await dispatch(scoring({ i: player1.id, type: player1 }));

      setNonStrike(player2.id);
      await dispatch(scoring({ i: player2.id, type: player2 }));
    } else if (
      player1.id !== 0 &&
      !player1.id &&
      (player2.id || player2.id == 0)
    ) {
      setStrike(inning.length);
      setNonStrike(player2.id);

      await setInning({
        type: { ...playerObject, name: player1, id: inning.length },
        id: false,
      });
      await dispatch(
        scoring({
          i: inning.length,
          type: { ...playerObject, name: player1, id: inning.length },
        }),
      );

      await dispatch(scoring({ i: player2.id, type: player2 }));
    } else if (
      (player1.id == 0 || player1.id) &&
      !player2.id &&
      player2.id !== 0
    ) {
      setStrike(player1.id);
      setNonStrike(inning.length);

      await dispatch(
        setInning({
          type: { ...playerObject, name: player2, id: inning.length },
          id: false,
        }),
      );

      await dispatch(scoring({ i: player1.id, type: player1 }));
      await dispatch(
        scoring({
          i: inning.length,
          type: { ...playerObject, name: player2, id: inning.length },
        }),
      );
    } else {
      setStrike(0);
      setNonStrike(1);

      await dispatch(
        setInning({
          type: { ...playerObject, name: player1, id: 0 },
          id: false,
        }),
      );
      await dispatch(
        setInning({
          type: { ...playerObject, name: player2, id: 1 },
          id: false,
        }),
      );
      await dispatch(
        scoring({ i: 0, type: { ...playerObject, name: player1, id: 0 } }),
      );
      await dispatch(
        scoring({ i: 1, type: { ...playerObject, name: player2, id: 1 } }),
      );
    }

    setToggle(true);
    setW(false);
    setHideBowler(false);
  };

  const handlePlayer1 = (player) => {
    setPlayer1(player);
    setSearch("");
  };

  const handlePlayer2 = (player) => {
    setPlayer2(player);
    setSearch("");
  };

  const handleCaptain = (event) => {
    captain == null ? setCaptain(event.target.value) : setCaptain(null);
  };
  useEffect(() => {}, [search, player1, player2]);
  return (
    !toggle && (
      <div className="relative flex h-full w-full flex-col items-center bg-slate-50 sm:items-start">
        <form
          className="absolute left-auto top-10 z-30 flex w-full flex-col gap-2 rounded-md bg-slate-50 p-2 shadow-3xl sm:left-16 md:w-xl"
          onSubmit={handleSubmit}
        >
          <h5 className="font-black text-gray-800">Add Openers</h5>
          <div className="flex items-center gap-2 rounded-md">
            <input
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
                setPlayer1(e.target.value);
              }}
              onFocus={() => {
                setActive2(false);
                setActive1(true);
                setSearch("");
              }}
              readOnly={match.players > inning.length ? false : true}
              placeholder={"Enter strike batter"}
              required
              value={!player1 ? "" : player1.name ? player1.name : player1}
              type="text"
              className="input w-full border-[1px]"
            />

            {!isCap && (
              <div className="flex gap-2 rounded-md border-[1px] border-slate-200 bg-slate-50 p-1 text-lg">
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Captain
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleCaptain}
                  value={0}
                  disabled={captain == 1}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-md">
            <input
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
                setPlayer2(e.target.value);
              }}
              onFocus={() => {
                setActive1(false);
                setActive2(true);
                setSearch("");
              }}
              readOnly={match.players > inning.length ? false : true}
              placeholder={"Enter non-strike batter"}
              required
              value={!player2 ? "" : player2.name ? player2.name : player2}
              type="text"
              className="input w-full border-[1px]"
            />
            {!isCap && (
              <div className="flex gap-2 rounded-md border-[1px] border-slate-200 bg-slate-50 p-1 text-lg">
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Captain
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleCaptain}
                  value={1}
                  disabled={captain == 0}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-dark float-end">
            Add
          </button>
        </form>
        {inning.length !== 0 && (
          <OpenersSuggestion
            inning={inning}
            player1={player1}
            player2={player2}
            search={search}
            active1={active1}
            active2={active2}
            handlePlayer1={handlePlayer1}
            handlePlayer2={handlePlayer2}
            setActive1={setActive1}
            setActive2={setActive2}
          />
        )}
      </div>
    )
  );
};

export default TypeOpeners;
