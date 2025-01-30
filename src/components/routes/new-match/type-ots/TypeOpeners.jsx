import React, { useState, useEffect } from "react";
import OpenersSuggestion from "./OpenersSuggestion";
const TypeOpeners = ({
  SetBattingPlayers,
  SetBattersList,
  BattingTeamScore,
  battingPrefs,
  setBowlingPrefs,
  bowlingPrefs,
  setBattingPrefs,
  setHideBowler,
  matchDetails,
  isCap,
  setCap,
  SetTeam1Score,
  toggle,
  dispatch,
}) => {
  const [search, setSearch] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [captain, setCaptain] = useState(false);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = BattingTeamScore.playersList.length;
    if (!isCap) {
      if (captain) {
        setCap(true);
      }
    }

    let playerObject = {
      id: id,
      playerDetails: {
        name: ``,
        position: "All-rounder",
        captain: captain,
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

    if ((player1.id == 0 || player1.id) && (player2.id || player2.id == 0)) {
      setBattingPrefs({
        ...battingPrefs,
        strikeBatter: player1,
        nonStrikeBatter: player2,
        isBatterChange: false,
      });
      dispatch(SetBattersList({ id: player1.id }));
      dispatch(SetBattersList({ id: player2.id }));
    } else if (
      player1.id !== 0 &&
      !player1.id &&
      (player2.id || player2.id == 0)
    ) {
      setBattingPrefs({
        ...battingPrefs,
        strikeBatter: {
          ...playerObject,
          id: id,
          playerDetails: {
            ...playerObject.playerDetails,
            name: player1,
          },
        },
        nonStrikeBatter: player2,
        isBatterChange: false,
      });

      // Setting up strike Batter
      dispatch(
        SetBattingPlayers({
          data: {
            ...playerObject,
            playerDetails: { ...playerObject.playerDetails, name: player1 },
          },
          customPlayer: false,
        }),
      );
      dispatch(SetBattersList({ id }));

      // Setting up non-strike batter

      dispatch(SetBattersList({ id: player2.id }));
    } else if (
      (player1.id == 0 || player1.id) &&
      !player2.id &&
      player2.id !== 0
    ) {
      setBattingPrefs({
        ...battingPrefs,
        strikeBatter: player1,
        nonStrikeBatter: {
          ...playerObject,
          id: id + 1,
          playerDetails: {
            ...playerObject.playerDetails,
            name: player2,
          },
        },
        isBatterChange: false,
      });
      dispatch(SetBattersList({ id: player1.id }));

      dispatch(
        SetBattingPlayers({
          data: {
            ...playerObject,
            id: id + 1,
            playerDetails: {
              ...playerObject.playerDetails,
              name: player2,
            },
          },
          customPlayer: false,
        }),
      );
      dispatch(SetBattersList({ id: id + 1 }));
    } else {
      setBattingPrefs({
        ...battingPrefs,
        strikeBatter: {
          ...playerObject,
          id: id,
          playerDetails: {
            ...playerObject.playerDetails,
            name: player1,
          },
        },
        nonStrikeBatter: {
          ...playerObject,
          id: id + 1,
          playerDetails: {
            ...playerObject.playerDetails,
            name: player2,
          },
        },
        isBatterChange: false,
      });
      dispatch(
        SetBattingPlayers({
          data: {
            ...playerObject,
            playerDetails: { ...playerObject.playerDetails, name: player1 },
          },
          customPlayer: false,
        }),
      );
      dispatch(
        SetBattingPlayers({
          data: {
            ...playerObject,
            id: id + 1,
            playerDetails: {
              ...playerObject.playerDetails,
              name: player2,
            },
          },
          customPlayer: false,
        }),
      );

      dispatch(SetBattersList({ id }));
      dispatch(SetBattersList({ id: id + 1 }));
    }

    setBowlingPrefs({ ...bowlingPrefs, isWicket: false });
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
    !captain ? setCaptain(event.target.value) : setCaptain(null);
  };
  useEffect(() => {}, [search, player1, player2]);
  return (
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
            readOnly={
              matchDetails.players > BattingTeamScore.playersList.length
                ? false
                : true
            }
            placeholder={"Enter strike batter"}
            required
            value={
              !player1
                ? ""
                : player1?.playerDetails?.name
                  ? player1?.playerDetails?.name
                  : player1
            }
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
            readOnly={
              matchDetails.players > BattingTeamScore.playersList.length
                ? false
                : true
            }
            placeholder={"Enter non-strike batter"}
            required
            value={
              !player2
                ? ""
                : player2?.playerDetails?.name
                  ? player2?.playerDetails?.name
                  : player2
            }
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
      {BattingTeamScore.length !== 0 && (
        <OpenersSuggestion
          BattingTeamScore={BattingTeamScore}
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
  );
};

export default TypeOpeners;
