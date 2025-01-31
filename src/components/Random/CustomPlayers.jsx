import { useAppDispatch, useAppSelector } from "../../store/hooks";
import React from "react";
import string from "string";
import LineUp from "../routes/new-match/LineUp";
import { useRef, useState } from "react";
import axios from "axios";

const CustomPlayers = ({
  matchDetails,
  teamName,
  setTeam,
  setInning,
  teamsArr,
}) => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useAppDispatch();

  const playerRef = useRef(
    Array(matchDetails.players).fill({
      name: "Player",
      position: "All-rounder",
    }),
  );
  const [captain, setCaptain] = useState(0);
  const [wicketKeeper, setWicketKeeper] = useState(1);

  const handleSubmit = async () => {
    const team = playerRef.current.map((input, i) => {
      if (input.value == "") {
        if (i == captain) {
          return {
            id: i,
            playerDetails: {
              name: `Player ${i + 1}`,
              position: "All-rounder",
              captain: true,
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
        } else if (i == wicketKeeper) {
          return {
            id: i,
            playerDetails: {
              name: `Player ${i + 1}`,
              position: "All-rounder",
              captain: false,
              wk: true,
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
        } else
          return {
            id: i,
            playerDetails: {
              name: `Player ${i + 1}`,
              position: "All-rounder",
              captain: false,
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
      } else if (i == captain) {
        return {
          id: i,
          playerDetails: {
            name: input.value,
            position: "All-rounder",
            captain: true,
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
      } else if (i == wicketKeeper) {
        return {
          id: i,
          playerDetails: {
            name: input.value,
            position: "All-rounder",
            captain: false,
            wk: true,
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
      } else {
        return {
          id: i,
          playerDetails: {
            name: input.value,
            position: "All-rounder",
            captain: false,
            wk: false,
          },
          batting: {
            outBy: null,
            out: false,
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
      }
    });
    // const confirm = window.confirm("Do you want to save this team?");
    // if (confirm) {
    //   try {
    //     const response = await axios.post("/api/teams", {
    //       name: teamName,
    //       players: innings,
    //     });
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }

    dispatch(setTeam({ name: teamName, team }));
    dispatch(setInning({ data: team, customPlayer: true }));
    setToggle(true);
  };
  const handleCaptain = (index) => {
    if (wicketKeeper === index) {
      if (captain) {
        setWicketKeeper(captain);
        setCaptain(index);
      } else {
        setCaptain(index);
        setWicketKeeper(null);
      }
    } else {
      setCaptain(index);
    }
  };

  const handleWicketKeeper = (index) => {
    if (captain === index) {
      if (wicketKeeper) {
        setCaptain(wicketKeeper);
        setWicketKeeper(index);
      } else {
        setWicketKeeper(index);
        setCaptain(null);
      }
    } else {
      setWicketKeeper(index);
    }
  };
  return (
    <>
      <div className="my-4 flex w-full flex-col items-center rounded-md p-1 shadow-low shadow-black md:w-xl">
        <h3 className="w-full text-center font-serif font-semibold">
          {teamName}
        </h3>
        {matchDetails.customPlayer && !toggle ? (
          <div className="custom-player-div w-full">
            <ul className="player-ul">
              {Array.from({ length: matchDetails.players }, (_, index) => (
                <li
                  key={index}
                  className={`player mb-2 flex w-full justify-between gap-2`}
                >
                  <div className="flex w-full items-center">
                    <span
                      className="player-span"
                      id="inputGroup-sizing-defaultp-2 "
                    >
                      {`Player ${index + 1}`}
                    </span>
                    <input
                      ref={(el) => {
                        playerRef.current[index] = el;
                      }}
                      placeholder={`Select Player ${index + 1}`}
                      type="text"
                      className="player-input p-[5px]"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <ul className="flex">
                    <li className="info-radio">
                      <label className="">C</label>
                      <input
                        onChange={() => {}}
                        onClick={() => handleCaptain(index)}
                        className="form-check-input"
                        type="radio"
                        checked={captain === index}
                      />
                    </li>
                    <li className="info-radio">
                      <label className="">WK</label>
                      <input
                        onChange={() => {}}
                        className="form-check-input"
                        type="radio"
                        onClick={() => handleWicketKeeper(index)}
                        checked={wicketKeeper === index}
                      />
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="buttons float-left h-12 w-24 bg-red-800 text-slate-50"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <LineUp teamsArr={teamsArr} />
        )}
      </div>
    </>
  );
};

export default CustomPlayers;
