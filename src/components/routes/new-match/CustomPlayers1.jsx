import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTeamFirst } from "../../../store/matchSlice";
import React from "react";
import { useRef, useState } from "react";
import LineUp from "./LineUp";
import { setInning1 } from "../../../store/currentMatch";
import axios from "axios";
const CustomPlayers1 = ({ match }) => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useAppDispatch();
  const teamFirst = useAppSelector((store) => store.teams.teamFirst);

  const t1PlayerRefs = useRef(
    Array(match.players).fill({ name: "Player", position: "All-rounder" }),
  );
  const [t1C, setT1C] = useState(0);
  const [t1WK, setT1WK] = useState(1);

  const handleSubmit = async () => {
    const t1_values = t1PlayerRefs.current.map((input, i) => {
      if (input.value == "") {
        return { name: `Player ${i + 1}`, position: "All-rounder" };
      } else if (i == t1C) {
        return { name: input.value, position: "captain" };
      } else if (i == t1WK) {
        return { name: input.value, position: "vice-captain" };
      } else {
        return { name: input.value, position: "All-rounder" };
      }
    });

    const t1_innings = t1PlayerRefs.current.map((input, i) => {
      if (input.value == "") {
        return {
          name: `Player ${i + 1}`,
          position: "All-rounder",
          bowling: false,
          out: false,
          playing: false,
          captaion: false,
          wk: false,
          runs: 0,
          id: i,
          status: true,
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
      } else if (i == t1C) {
        return {
          name: input.value,
          position: "All-rounder",
          bowling: false,
          out: false,
          playing: false,
          captaion: true,
          wk: false,
          runs: 0,
          id: i,
          status: true,
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
      } else if (i == t1WK) {
        return {
          name: input.value,
          position: "Wicketkeeper",
          bowling: false,
          out: false,
          playing: false,
          captaion: false,
          wk: true,
          runs: 0,
          id: i,
          status: true,
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
      } else {
        return {
          name: input.value,
          position: "All-rounder",
          bowling: false,
          out: false,
          playing: false,
          captaion: false,
          wk: false,
          runs: 0,
          id: i,
          status: true,
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
      }
    });
    const confirm = window.confirm("Do you want to save this team?");
    if (confirm) {
      try {
        const response = await axios.post("/api/teams", {
          name: match.teams.team1,
          players: t1_innings,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    dispatch(setTeamFirst({ name: match.teams.team1, team: t1_values }));
    dispatch(setInning1({ type: t1_innings, id: true }));
    setToggle(true);
  };

  const handleT1C = (index) => {
    if (t1WK === index) {
      alert(
        "This player is already the vice-captain and cannot be the captain.",
      );
    } else {
      setT1C(index);
    }
  };

  const handleT1Vice = (index) => {
    if (t1C === index) {
      alert(
        "This player is already the captain and cannot be the vice-captain.",
      );
    } else {
      setT1WK(index);
    }
  };
  return (
    <>
      <div className="my-4 flex w-full flex-col items-center rounded-md p-1 shadow-low shadow-black md:w-xl">
        <h3 className="w-full text-center font-serif font-semibold">
          {match.teams.team1}
        </h3>
        {match.customPlayer && !toggle ? (
          <div className="custom-player-div w-full">
            <ul className="player-ul">
              {Array.from({ length: match.players }, (_, index) => (
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
                        t1PlayerRefs.current[index] = el;
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
                        onClick={() => handleT1C(index)}
                        name="captain"
                        className="form-check-input"
                        type="radio"
                        checked={t1C === index}
                      />
                    </li>
                    <li className="info-radio">
                      <label className="">WK</label>
                      <input
                        onChange={() => {}}
                        className="form-check-input"
                        type="radio"
                        onClick={() => handleT1Vice(index)}
                        name="vice-captain"
                        checked={t1WK === index}
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
          <LineUp team={teamFirst} />
        )}
      </div>
    </>
  );
};

export default CustomPlayers1;
