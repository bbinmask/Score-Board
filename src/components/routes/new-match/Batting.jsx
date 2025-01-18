"use client";
import { useEffect, useState } from "react";

import checkWinner from "./functions/checkWinner.js";
import ScoreBoard from "./ScoreBoard.jsx";
import SelectBatter from "./SelectBatter";
import SelectBowler from "./SelectBowler";
import NewBatter from "./NewBatter";
import NewBowler from "./NewBowler";
import TypeBowler from "./type-ots/TypeBowler";
import TypeOpeners from "./type-ots/TypeOpeners";
import TypeNewBatter from "./type-ots/TypeNewBatter";
import TypeNewBowler from "./type-ots/TypeNewBowler";
const Batting = ({
  teamScore,
  setWinner,
  batting,
  capTeam1,
  capTeam2,
  setCapTeam1,
  setCapTeam2,
  matchOver,
  setMatchOver,
  teamBowling,
  teamRuns,
  teamBowlers,
  match,
  inning1,
  inning2,
  bat1,
  bat2,
  setInning1,
  setInning2,
  setComplete,
  team1,
  dispatch,
  team2,
}) => {
  const [hideBowler, setHideBowler] = useState(true);
  const [isWicket, setIsWicket] = useState(false);
  const [isChangeBowler, setIsChangeBowler] = useState(false);
  const [overCompleted, setOverCompleted] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [strikeBatter, setStrikeBatter] = useState("disabled");
  const [nonStrikeBatter, setNonStrikeBatter] = useState("disabled");
  const [currentBowler, setCurrentBowler] = useState("disabled");
  const [overs, setOvers] = useState();
  const [recentBalls, setRecentBalls] = useState([]);
  const [extra, setExtra] = useState(null);
  const [toggleBatter, setToggleBatter] = useState(false);
  const [toggleBowler, setToggleBowler] = useState(false);
  const [wickets, setWickets] = useState(0);

  // console.warn(
  //   "Bat 1: ",
  //   bat1,
  //   " & Bat 2: ",
  //   bat2,
  //   " & Inning 1: ",
  //   inning1,
  //   " & Inning 2: ",
  //   inning2,
  // );

  const handleShot = (event) => {
    const runs = Number(event.target.value);

    const ball = extra == null ? runs : runs === 0 ? extra : runs + extra;
    setRecentBalls((prevState) => [ball, ...prevState]);
    dispatch(teamBowlers({ runs, extra, id: overs.id }));
    dispatch(teamRuns({ runs, id: strikeBatter, extra }));
    if (overCompleted < 5 && extra !== "nb" && extra !== "wd") {
      setOverCompleted((prevState) => prevState + 1);
    } else if (overCompleted === 5 && extra !== "nb" && extra !== "wd") {
      if (runs === 1 || runs === 3) {
        setRecentBalls((prevState) => ["|", ...prevState]);
        setIsStarted(false);
        setIsChangeBowler(true);
        setHideBowler(false);
        setOverCompleted(0);
      } else {
        setStrikeBatter(nonStrikeBatter);
        setNonStrikeBatter(strikeBatter);
        setRecentBalls((prevState) => ["|", ...prevState]);
        setIsStarted(false);
        setIsChangeBowler(true);
        setHideBowler(false);
        setOverCompleted(0);
      }
    }
    if (strikeBatter !== "disabled") {
      if ((runs === 1 || runs === 3) && overCompleted !== 5) {
        setStrikeBatter(nonStrikeBatter);
        setNonStrikeBatter(strikeBatter);
      }

      if (extra === "w") {
        dispatch(
          teamScore({ i: strikeBatter, type: inning1[strikeBatter], extra }),
        );
        setStrikeBatter(null);
        setIsStarted(false);
        setWickets((prevWickets) => prevWickets + 1);
        setIsWicket(true);
      }
    } else {
      console.error("No striker selected!");
    }
    setExtra(null);
  };

  const handleExtra = (event) => {
    setExtra(event.target.value);
  };

  const handleStrikeChange = () => {
    setStrikeBatter(nonStrikeBatter);
    setNonStrikeBatter(strikeBatter);
  };

  useEffect(() => {
    const temp = checkWinner(
      bat1,
      bat2,
      match,
      inning1,
      inning2,
      wickets,
      batting,
    );
    temp;
    if (wickets == bat1.length - 1) {
      setComplete(true);
    }
    if (wickets == bat2.length - 1) {
      setWinner(temp);
      setMatchOver(true);
      setComplete(true);
    } else if (temp.winner !== undefined) {
      setWinner(temp);
      setMatchOver(true);
      setComplete(true);
    }
    if (match.overs == bat1.score.overs || wickets == match.players - 1) {
      if (temp.winner !== undefined) {
        setWinner(temp);
        setMatchOver(true);
        setComplete(true);
      }
      setHideBowler(true);
      setIsWicket(false);
      setIsChangeBowler(false);
      setOverCompleted(0);
      setIsStarted(false);
      setStrikeBatter("disabled");
      setNonStrikeBatter("disabled");
      setCurrentBowler("disabled");
      setOvers();
      setRecentBalls([]);
      setExtra(null);
      setToggleBatter(false);
      setToggleBowler(false);
      setWickets(0);
      setComplete(true);
    }
  }, [bat1.score.overs, overCompleted, teamScore]);

  return (
    <div className={`Container flex-col`}>
      {match.customPlayer ? (
        isStarted ? (
          <ScoreBoard
            handleStrikeChange={handleStrikeChange}
            overs={overs}
            inning1={inning1}
            inning2={inning2}
            handleShot={handleShot}
            recentBalls={recentBalls}
            strike={strikeBatter}
            wicket={wickets}
            handleExtra={handleExtra}
            bowler={currentBowler}
            setBowler={setCurrentBowler}
            setStrike={setStrikeBatter}
            nonStrike={nonStrikeBatter}
            setNonStrike={setNonStrikeBatter}
            team1={team1}
            team2={team2}
            bat1={bat1}
            bat2={bat2}
          />
        ) : !isChangeBowler && !isWicket ? (
          <div className="select-div">
            <SelectBatter
              match={match}
              setStart={setIsStarted}
              scoring={teamScore}
              score={bat1}
              setInning={setInning1}
              dispatch={dispatch}
              toggle={toggleBatter}
              setToggle={setToggleBatter}
              inning={inning1}
              strike={strikeBatter}
              setW={setIsWicket}
              wicket={wickets}
              nonStrike={nonStrikeBatter}
              setStrike={setStrikeBatter}
              setNonStrike={setNonStrikeBatter}
            />

            <SelectBowler
              setInning={setInning2}
              setChangeBowler={setIsChangeBowler}
              setStart={setIsStarted}
              scoring={teamBowling}
              score={bat2}
              dispatch={dispatch}
              match={match}
              toggle={toggleBowler}
              setToggle={setToggleBowler}
              setBowler={setCurrentBowler}
              setOvers={setOvers}
              inning={inning2}
              bowler={currentBowler}
              overs={overs}
            />
          </div>
        ) : (
          <>
            {isWicket && (
              <div className="select-div z-40">
                <NewBatter
                  setInning={setInning1}
                  setStart={setIsStarted}
                  wicket={wickets}
                  setW={setIsWicket}
                  inning={inning1}
                  strike={strikeBatter}
                  nonStrike={nonStrikeBatter}
                  setStrike={setStrikeBatter}
                  dispatch={dispatch}
                  scoring={teamScore}
                  batting={bat1}
                  match={match}
                />
              </div>
            )}
            {isChangeBowler && (
              <NewBowler
                setInning={setInning2}
                setChangeBowler={setIsChangeBowler}
                setStart={setIsStarted}
                scoring={teamBowling}
                score={bat2}
                dispatch={dispatch}
                match={match}
                toggle={toggleBowler}
                setToggle={setToggleBowler}
                setBowler={setCurrentBowler}
                setOvers={setOvers}
                inning={inning2}
                bowler={currentBowler}
                overs={overs}
              />
            )}
          </>
        )
      ) : isStarted ? (
        <ScoreBoard
          handleStrikeChange={handleStrikeChange}
          overs={overs}
          inning1={inning1}
          inning2={inning2}
          handleShot={handleShot}
          recentBalls={recentBalls}
          strike={strikeBatter}
          wicket={wickets}
          handleExtra={handleExtra}
          bowler={currentBowler}
          setBowler={setCurrentBowler}
          setStrike={setStrikeBatter}
          nonStrike={nonStrikeBatter}
          setNonStrike={setNonStrikeBatter}
          team1={team1}
          team2={team2}
          bat1={bat1}
          bat2={bat2}
        />
      ) : !isChangeBowler && !isWicket ? (
        <div className="select-div">
          {hideBowler && (
            <TypeOpeners
              setHideBowler={setHideBowler}
              setCap={setCapTeam1}
              isCap={capTeam1}
              match={match}
              setStart={setIsStarted}
              scoring={teamScore}
              score={bat1}
              setInning={setInning1}
              dispatch={dispatch}
              toggle={toggleBatter}
              setToggle={setToggleBatter}
              inning={inning1}
              strike={strikeBatter}
              setW={setIsWicket}
              wicket={wickets}
              nonStrike={nonStrikeBatter}
              setStrike={setStrikeBatter}
              setNonStrike={setNonStrikeBatter}
            />
          )}

          {!hideBowler && (
            <TypeBowler
              setHideBowler={setHideBowler}
              hideBowler={hideBowler}
              setCap={setCapTeam2}
              isCap={capTeam2}
              setInning={setInning2}
              setChangeBowler={setIsChangeBowler}
              setStart={setIsStarted}
              scoring={teamBowling}
              score={bat2}
              dispatch={dispatch}
              match={match}
              toggle={toggleBowler}
              setToggle={setToggleBowler}
              setBowler={setCurrentBowler}
              setOvers={setOvers}
              inning={inning2}
              bowler={currentBowler}
              overs={overs}
            />
          )}
        </div>
      ) : (
        <>
          {isWicket && (
            <div className="select-div z-40">
              <TypeNewBatter
                overCompleted={overCompleted}
                hideBowler={hideBowler}
                setHideBowler={setHideBowler}
                setCap={setCapTeam1}
                isCap={capTeam1}
                setInning={setInning1}
                setStart={setIsStarted}
                wicket={wickets}
                setW={setIsWicket}
                inning={inning1}
                strike={strikeBatter}
                nonStrike={nonStrikeBatter}
                setStrike={setStrikeBatter}
                dispatch={dispatch}
                scoring={teamScore}
                batting={bat1}
                match={match}
              />
            </div>
          )}
          {isChangeBowler && !hideBowler && (
            <TypeNewBowler
              setHideBowler={setHideBowler}
              hideBowler={hideBowler}
              setCap={setCapTeam2}
              isCap={capTeam2}
              setInning={setInning2}
              setChangeBowler={setIsChangeBowler}
              setStart={setIsStarted}
              scoring={teamBowling}
              score={bat2}
              dispatch={dispatch}
              match={match}
              toggle={toggleBowler}
              setToggle={setToggleBowler}
              setBowler={setCurrentBowler}
              setOvers={setOvers}
              inning={inning2}
              bowler={currentBowler}
              overs={overs}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Batting;
