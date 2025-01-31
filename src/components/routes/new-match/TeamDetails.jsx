"use client";

import { useState } from "react";
import MatchVs from "./MatchVs";
import { useAppDispatch } from "../../../store/hooks";
import { SetMatch } from "../../../store/currentMatch";

const TeamDetails = () => {
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(false);
  const [matchDetails, setMatchDetails] = useState({
    teams: {
      team1: "Team 1",
      team2: "Team 2",
    },
    overs: 1,
    players: 2,
    limit: 1,
    customPlayer: false,
    isSeries: false,
    battingFirst: "Team 1",
    battingSecond: "Team 2",
  });

  const handleToggle = (e) => {
    e.preventDefault();
    const confirm = window.confirm("You want to proceed!");
    if (confirm) {
      dispatch(SetMatch(matchDetails));
      setToggle(true);
    }
  };

  return (
    <>
      {!toggle ? (
        <div className="flex flex-col justify-evenly p-2 lg:flex-row">
          <div className="matchDetails-div">
            <form
              onSubmit={handleToggle}
              className={`${!toggle ? "flex" : "hidden"} flex-col items-center rounded-md bg-zinc-100 p-2`}
            >
              <div className="input-group mb-3 font-mono">
                <span
                  className="span w-36 rounded-l-md"
                  id="inputGroup-sizing-default"
                >
                  Total Players
                </span>
                <input
                  required
                  onChange={(e) => {
                    if (matchDetails.overs > matchDetails.players) {
                      const limit = Math.ceil(
                        matchDetails.overs / matchDetails.players,
                      );
                      setMatchDetails({
                        ...matchDetails,
                        players: Number(e.target.value),
                        limit,
                      });
                    } else
                      setMatchDetails({
                        ...matchDetails,
                        players: Number(e.target.value),
                      });
                  }}
                  min={2}
                  defaultValue={2}
                  max={15}
                  placeholder="Select Players"
                  type="number"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group mb-3 font-mono">
                <span
                  className="span w-36 rounded-l-md"
                  id="inputGroup-sizing-default"
                >
                  Total Overs
                </span>
                <input
                  required
                  onChange={(e) => {
                    const i = Number(e.target.value);
                    if (matchDetails.overs > matchDetails.players) {
                      const limit = Math.ceil(
                        matchDetails.overs / matchDetails.players,
                      );

                      setMatchDetails({
                        ...matchDetails,
                        overs: i,
                        limit: limit,
                      });
                    } else
                      setMatchDetails({
                        ...matchDetails,
                        overs: i,
                      });
                  }}
                  defaultValue={1}
                  min={1}
                  placeholder="Select Overs"
                  type="number"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group mb-3 font-mono">
                <span
                  className="span w-36 rounded-l-md"
                  id="inputGroup-sizing-default"
                >
                  Overs Limit
                </span>
                <input
                  required
                  onChange={(e) => {
                    const limit = Number(e.target.value);
                    const max = Number(e.target.max);
                    if (limit > max) {
                      setMatchDetails({
                        ...matchDetails,
                        limit: max,
                      });
                    } else {
                      setMatchDetails({
                        ...matchDetails,
                        limit,
                      });
                    }
                  }}
                  max={
                    matchDetails.overs != 1
                      ? Math.ceil(matchDetails.overs / 2)
                      : 1
                  }
                  min={
                    matchDetails.players >= matchDetails.overs
                      ? 1
                      : Math.ceil(matchDetails.overs / matchDetails.players)
                  }
                  placeholder="Overs Limit"
                  type="number"
                  value={matchDetails.limit}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="input-group mb-1">
                <span
                  className="span w-36 rounded-l-md"
                  id="inputGroup-sizing-default"
                >
                  Team 1
                </span>
                <input
                  defaultValue={`Team 1`}
                  required
                  onChange={(e) =>
                    setMatchDetails({
                      ...matchDetails,
                      [teams.team1]: e.target.value,
                    })
                  }
                  placeholder="Enter First Team Name"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <label className="text-lg font-semibold">vs</label>
              <div className="input-group mb-1">
                <span
                  className="span w-36 rounded-l-md"
                  id="inputGroup-sizing-default"
                >
                  Team 2
                </span>
                <input
                  defaultValue={`Team 2`}
                  required
                  onChange={(e) =>
                    setMatchDetails({
                      ...matchDetails,
                      [teams.team2]: e.target.value,
                    })
                  }
                  placeholder="Enter Second Team Name"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="more-info my-2 w-full">
                <ul className="m-0 flex w-full flex-col gap-2 p-0">
                  <li className="rounded-lg">
                    <span className="span rounded-md p-2">
                      Which team will bat first?
                    </span>

                    <div className="mt-2 flex w-full justify-evenly rounded-md bg-white text-center">
                      <div className="flex w-full justify-between px-4 py-2">
                        <label>Team 1</label>
                        <input
                          required
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              battingFirst: "team1",
                              battingSecond: "team2",
                            })
                          }
                          className="form-check-input"
                          type="radio"
                          value={true}
                          name="batting"
                          defaultChecked
                        />
                      </div>
                      <div className="flex w-full justify-between px-4 py-2">
                        <label>Team 2</label>
                        <input
                          required
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              battingFirst: "team2",
                              battingSecond: "team1",
                            })
                          }
                          className="form-check-input"
                          type="radio"
                          value={true}
                          name="batting"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="info-radio-detail">
                    <label className="span w-36 py-2">Set Team</label>
                    <div className="yes-no">
                      <div className="yes">
                        <label htmlFor="yes">Yes</label>
                        <input
                          required
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              customPlayer: e.currentTarget.checked,
                            })
                          }
                          className="form-check-input"
                          type="radio"
                          value={true}
                          name="set-players"
                          id="yes"
                        />
                      </div>
                      <div className="no">
                        <label className="form-check-label" htmlFor="no">
                          No
                        </label>
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              customPlayer: !e.currentTarget.checked,
                            })
                          }
                          value={false}
                          name="set-players"
                          id="no"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </li>
                  <li className="info-radio-detail">
                    <label className="span w-36 py-2">Series</label>
                    <div className="yes-no">
                      <div className="yes">
                        <label htmlFor="yes">Yes</label>
                        <input
                          required
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              isSeries: e.currentTarget.checked,
                            })
                          }
                          className="form-check-input"
                          type="radio"
                          value={true}
                          name="is-series"
                        />
                      </div>
                      <div className="no">
                        <label className="form-check-label" htmlFor="no">
                          No
                        </label>
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          onChange={(e) =>
                            setMatchDetails({
                              ...matchDetails,
                              isSeries: !e.currentTarget.checked,
                            })
                          }
                          value={false}
                          name="is-series"
                          id="flexRadioDefault2"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                className="buttons w-2/5 bg-red-800 text-slate-50"
              >
                Submit
              </button>
            </form>
            <div className={`team-info ${toggle ? "flex" : "hidden"}`}></div>
          </div>
          <div className="suggest-div mt-10 hidden lg:flex">
            <ul className="suggest-ul">
              <h6 className="m-2 font-semibold">
                Select from Previous Matches
              </h6>
              <li className="suggest-li">Suggest</li>
              <li className="suggest-li">Suggest</li>
              <li className="suggest-li">Suggest</li>
              <li className="suggest-li">Suggest</li>
            </ul>
          </div>
        </div>
      ) : (
        <MatchVs matchDetails={matchDetails} />
      )}
    </>
  );
};

export default TeamDetails;
