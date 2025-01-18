"use client";

import { useRef, useState } from "react";
import MatchVs from "./MatchVs";
import { useAppDispatch } from "../../../store/hooks";
import { matching } from "../../../store/currentMatch";
const TeamDetails = () => {
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(false);
  const [match, setMatch] = useState({});
  const [overs, setOvers] = useState(1);
  const [players, setPlayers] = useState(2);
  const [limit, setLimit] = useState(1);
  const customPlayersYesRef = useRef();
  const isSeriesYesRef = useRef();
  const firstRef = useRef();
  const secondRef = useRef();
  const battingRef = useRef();

  const handleToggle = (event) => {
    event.preventDefault();
    const team1 = firstRef.current.value || "Team First";
    const team2 = secondRef.current.value || "Team Second";
    const batting = battingRef.current.checked ? team1 : team2;
    const customPlayer = customPlayersYesRef.current.checked ? true : false;
    const isSeries = isSeriesYesRef.current.checked ? true : false;
    const confirm = window.confirm("You want to proceed!");
    if (confirm) {
      dispatch(
        matching({
          teams: { team1, team2 },
          overs,
          players,
          limit,
          customPlayer,
          isSeries,
          batting,
        }),
      );

      setMatch({
        overs,
        players,
        limit,
        customPlayer,
        isSeries,
        teams: { team1, team2 },
        batting,
      });
      setToggle((t) => !t);
    }
  };
  const handleOvers = (event) => {
    const i = Number(event.target.value);
    setOvers(i);
    if (overs > players) {
      const lim = Math.ceil(overs / players);
      setLimit(lim);
    }
  };

  const handlePlayers = (event) => {
    const i = Number(event.target.value);
    setPlayers(i);
    if (overs > players) {
      const lim = Math.ceil(overs / players);
      setLimit(lim);
    }
  };
  const handleLimit = (event) => {
    const i = Number(event.target.value);
    const limit = i;
    const max = event.target.max;
    if (Number(limit) > Number(max)) {
      setLimit(max);
    } else {
      setLimit(limit);
    }
  };

  return (
    <>
      {!toggle ? (
        <div className="flex flex-col justify-evenly p-2 lg:flex-row">
          <div className="match-div">
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
                  onChange={handlePlayers}
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
                  onChange={handleOvers}
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
                  onChange={handleLimit}
                  max={overs != 1 ? Math.ceil(overs / 2) : 1}
                  min={players >= overs ? 1 : Math.ceil(overs / players)}
                  placeholder="Overs Limit"
                  type="number"
                  value={limit}
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
                  ref={firstRef}
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
                  ref={secondRef}
                  placeholder="Enter Second Team Name"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="more-info my-2 w-full">
                <ul className="m-0 flex w-full flex-col gap-2 p-0">
                  <li className="info-radio-detail">
                    <label className="span w-36 py-2">First Batting</label>
                    <div className="yes-no">
                      <div className="yes">
                        <label className="overflow-hidden">Team 1</label>
                        <input
                          required
                          ref={battingRef}
                          className="form-check-input"
                          type="radio"
                          value={true}
                          name="batting"
                          id="yes"
                          defaultChecked
                        />
                      </div>
                      <div className="no">
                        <label className="overflow-hidden" htmlFor="no">
                          Team 2
                        </label>
                        <input
                          required
                          value={false}
                          className="form-check-input"
                          type="radio"
                          name="batting"
                          id="no"
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
                          ref={customPlayersYesRef}
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
                          ref={isSeriesYesRef}
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
        <MatchVs match={match} />
      )}
    </>
  );
};

export default TeamDetails;
