import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setTeamSecond } from "../../../store/matchSlice";
import LineUp from "./LineUp";
import axios from "axios";
import { setInning2 } from "../../../store/currentMatch";

const CustomPlayers2 = ({ match }) => {
  const [toggle, setToggle] = useState(false);
  const teamSecond = useAppSelector((store) => store.teams.teamSecond);
  const dispatch = useAppDispatch();
  const t2PlayerRefs = useRef([]);
  const [t2C, setT2C] = useState(0);
  const [t2WK, setT2WK] = useState(1);
  const handleSubmit = async () => {
    const t2_values = t2PlayerRefs.current.map((input, i) => {
      if (input.value === "") {
        return { name: `Player ${i + 1}`, position: "All-rounder" };
      } else if (i === t2C) {
        return { name: input.value, position: "All-rounder" };
      } else if (i === t2WK) {
        return { name: input.value, position: "Wicketkeeper" };
      } else {
        return { name: input.value, position: "All-rounder" };
      }
    });

    const t2_innings = t2PlayerRefs.current.map((input, i) => {
      if (input.value == "") {
        return {
          name: `Player ${i + 1}`,
          position: "All-rounder",
          bowling: false,
          runs: 0,
          id: i,
          captaion: false,
          wk: false,
          status: true,
          out: false,
          playing: false,
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
      } else if (i == t2C) {
        return {
          name: input.value,
          position: "All-rounder",
          bowling: false,
          runs: 0,
          id: i,
          captaion: true,
          wk: false,
          status: true,
          out: false,
          playing: false,
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
      } else if (i == t2WK) {
        return {
          name: input.value,
          position: "Wicketkeeper",
          bowling: false,
          runs: 0,
          id: i,
          captaion: false,
          wk: true,
          status: true,
          out: false,
          playing: false,
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
          runs: 0,
          id: i,
          captaion: false,
          wk: false,
          status: true,
          out: false,
          playing: false,
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
      if (confirm) {
        try {
          const response = await axios.post("/api/teams", {
            name: match.teams.team2,
            players: t2_innings,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
      dispatch(setTeamSecond({ name: match.teams.team2, team: t2_values }));
      dispatch(setInning2({ type: t2_innings, id: true }));
      setToggle(true);
    }
  };

  const handleT2C = (index) => {
    if (t2WK === index) {
      alert(
        "This player is already the vice-captain and cannot be the captain.",
      );
    } else {
      setT2C(index);
    }
  };

  const handleT2WK = (index) => {
    if (t2C === index) {
      alert(
        "This player is already the captain and cannot be the vice-captain.",
      );
    } else {
      setT2WK(index);
    }
  };

  return (
    <div className="my-4 flex w-full flex-col items-center rounded-md p-1 shadow-low shadow-black md:w-xl">
      <h3 className="w-full text-center font-serif font-semibold">
        {match.teams.team2}
      </h3>
      {match.customPlayer && !toggle ? (
        <div className="custom-player-div w-full">
          <ul className="player-ul">
            {Array.from({ length: match.players }, (_, index) => (
              <li key={index} className={`player mb-2 flex gap-2`}>
                <div className="flex w-full items-center">
                  <span
                    className="player-span"
                    id="inputGroup-sizing-defaultp-2 "
                  >
                    {`Player ${index + 1}`}
                  </span>
                  <input
                    ref={(el) => {
                      t2PlayerRefs.current[index] = el;
                    }}
                    placeholder={`Select Player ${index + 1}`}
                    type="text"
                    className="player-input"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <ul className="flex">
                  <li className="info-radio">
                    <label className="" htmlFor="flexRadioDefault1">
                      C
                    </label>
                    <input
                      onChange={() => {}}
                      onClick={() => handleT2C(index)}
                      name="_captain"
                      className="form-check-input"
                      type="radio"
                      checked={t2C === index}
                    />
                  </li>
                  <li className="info-radio">
                    <label className="" htmlFor="flexRadioDefault1">
                      WK
                    </label>
                    <input
                      onChange={() => {}}
                      className="form-check-input"
                      type="radio"
                      onClick={() => handleT2WK(index)}
                      name="_vice"
                      checked={t2WK === index}
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
        <LineUp team={teamSecond} />
      )}
    </div>
  );
};

export default CustomPlayers2;
