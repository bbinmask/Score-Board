import React, { useEffect } from "react";
import Batting from "./Batting";
import FullScoreCard from "./FullScoreCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import wonMessage from "./functions/wonMessage";
import {
  team1Scoring,
  team2Bowling,
  team1Runs,
  team2Bowlers,
  team2Scoring,
  team1Bowling,
  team2Runs,
  team1Bowlers,
  setInning1,
  setInning2,
} from "@/store/currentMatch";

const MatchStart = ({ match }) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector((store) => store.currentMatch);
  const [matchOver, setMatchOver] = useState(false);
  const [inn1Completed, setInn1Completed] = useState(false);
  const [inn2Completed, setInn2Completed] = useState(false);
  const [winner, setWinner] = useState({
    winner: null,
    ballsLeft: null,
    wicketLeft: null,
    runsLeft: null,
  });

  const batting = match.batting === match.teams.team1 ? true : false;

  const inning1 = score.inning1;
  const inning2 = score.inning2;
  const bat1 = score.team1Score;
  const bat2 = score.team2Score;

  const [capTeam1, setCapTeam1] = useState(false);
  const [capTeam2, setCapTeam2] = useState(false);

  const team1 = batting ? match.teams.team1 : match.teams.team2;
  const team2 = batting ? match.teams.team2 : match.teams.team1;
  const inn1 = batting ? inn1Completed : inn2Completed;
  const inn2 = batting ? inn2Completed : inn1Completed;

  const handleSecondInn = (arg) => {
    setInn2Completed(arg);
  };

  useEffect(() => {}, [inn1Completed, inn2Completed]);

  return (
    <>
      {matchOver ? (
        <FullScoreCard
          matchOver={matchOver}
          winner={winner}
          team1={team1}
          team2={team2}
          match={match}
          batting={batting}
          firstComplete={inn1Completed}
          secondComplete={inn2Completed}
          handleSecondInn={handleSecondInn}
        />
      ) : !inn1Completed && !matchOver ? (
        <Batting
          batting={batting}
          team1={team1}
          team2={team2}
          capTeam1={batting ? capTeam1 : capTeam2}
          capTeam2={batting ? capTeam2 : capTeam1}
          setCapTeam1={batting ? setCapTeam1 : setCapTeam2}
          setCapTeam2={batting ? setCapTeam2 : setCapTeam1}
          bat1={batting ? bat1 : bat2}
          bat2={batting ? bat2 : bat1}
          inning1={batting ? inning1 : inning2}
          inning2={batting ? inning2 : inning1}
          setInning1={batting ? setInning1 : setInning2}
          setInning2={batting ? setInning2 : setInning1}
          setMatchOver={setMatchOver}
          setWinner={setWinner}
          matchOver={matchOver}
          dispatch={dispatch}
          match={match}
          completeFirst={inn1Completed}
          completeSecond={inn2Completed}
          setComplete={setInn1Completed}
          teamScore={batting ? team1Scoring : team2Scoring}
          teamBowling={batting ? team2Bowling : team1Bowling}
          teamRuns={batting ? team1Runs : team2Runs}
          teamBowlers={batting ? team2Bowlers : team1Bowlers}
        ></Batting>
      ) : inn2Completed == undefined ? (
        <Batting
          batting={batting}
          capTeam1={!batting ? capTeam1 : capTeam2}
          capTeam2={!batting ? capTeam2 : capTeam1}
          team1={team1}
          team2={team2}
          setCapTeam1={!batting ? setCapTeam1 : setCapTeam2}
          setCapTeam2={!batting ? setCapTeam2 : setCapTeam1}
          bat1={batting ? bat2 : bat1}
          bat2={batting ? bat1 : bat2}
          inning1={batting ? inning2 : inning1}
          inning2={batting ? inning1 : inning2}
          setInning1={!batting ? setInning1 : setInning2}
          setInning2={!batting ? setInning2 : setInning1}
          teamScore={batting ? team2Scoring : team1Scoring}
          teamBowling={batting ? team1Bowling : team2Bowling}
          teamRuns={batting ? team2Runs : team1Runs}
          teamBowlers={batting ? team1Bowlers : team2Bowlers}
          handleSecondInn={handleSecondInn}
          setMatchOver={setMatchOver}
          setWinner={setWinner}
          matchOver={matchOver}
          dispatch={dispatch}
          match={match}
          setComplete={setInn2Completed}
        />
      ) : (
        <FullScoreCard
          team1={team1}
          team2={team2}
          match={match}
          batting={batting}
          firstComplete={inn1Completed}
          secondComplete={inn2Completed}
          handleSecondInn={handleSecondInn}
        />
      )}
    </>
  );
};

export default MatchStart;
