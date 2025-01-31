import React, { useEffect } from "react";
import Batting from "./Batting";
import FullScoreCard from "./Score/FullScoreCard";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import whichTeam from "../../../utils/functions/whichTeam.js";
import {
  SetInning1,
  SetTeam1Node,
  SetTeam2Node,
  SetInning2,
  SetTeam1Score,
  SetTeam2Score,
  SetTeam1BatterScore,
  SetTeam2BatterScore,
  SetTeam1BowlersList,
  SetTeam2BowlersList,
  SetTeam1BowlerScore,
  SetTeam2BowlerScore,
  SetTeam1BattersList,
  SetTeam2BattersList,
} from "@/store/currentMatch";
import checkWinner from "../../../utils/functions/player-utils/checkWinner";

const MatchStart = ({ matchDetails, matchPrefs, setMatchPrefs }) => {
  const score = useAppSelector((store) => store.currentMatch);

  const team1 = score.team1;
  const team2 = score.team2;

  const [winner, setWinner] = useState({
    winner: null,
    ballsLeft: null,
    wicketLeft: null,
    runsLeft: null,
  });
  const BattingTeamScore = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    team1,
    team2,
  ).battingTeam;
  const BowlingTeamScore = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    team1,
    team2,
  ).bowlingTeam;

  const [capTeam1, setCapTeam1] = useState(false);
  const [capTeam2, setCapTeam2] = useState(false);

  const firstTeam = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    matchDetails.teams.team1,
    matchDetails.teams.team2,
  ).battingTeam;
  const secondTeam = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    matchDetails.teams.team1,
    matchDetails.teams.team2,
  ).bowlingTeam;

  const setTeam1Score = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1Score,
    SetTeam2Score,
  ).battingTeam;
  const setTeam2Score = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1Score,
    SetTeam2Score,
  ).bowlingTeam;

  const setInning1 = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetInning1,
    SetInning2,
  ).battingTeam;

  const setInning2 = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetInning1,
    SetInning2,
  ).bowlingTeam;
  const setBattersList = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1BattersList,
    SetTeam2BattersList,
  ).battingTeam;
  const setBatterScore = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1BatterScore,
    SetTeam2BatterScore,
  ).battingTeam;

  const setBowlerScore = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1BowlerScore,
    SetTeam2BowlerScore,
  ).bowlingTeam;
  const setBowlersList = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1BowlersList,
    SetTeam2BowlersList,
  ).bowlingTeam;

  const SetBattingTeamNode = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1Node,
    SetTeam2Node,
  ).battingTeam;

  const SetBowlingTeamNode = whichTeam(
    matchDetails,
    matchPrefs.inn2Started,
    SetTeam1Node,
    SetTeam2Node,
  ).bowlingTeam;

  useEffect(() => {
    if (matchPrefs.inn2Completed) {
      const winner = checkWinner(
        matchDetails,
        BattingTeamScore,
        BowlingTeamScore,
      );
      setWinner(winner);
    }
  }, [matchPrefs]);
  return (
    <>
      {matchPrefs.matchOver ? (
        <FullScoreCard
          matchPrefs={matchPrefs}
          setMatchPrefs={setMatchPrefs}
          BattingTeamScore={BattingTeamScore}
          BowlingTeamScore={BowlingTeamScore}
          winner={winner}
          firstTeam={firstTeam}
          secondTeam={secondTeam}
          matchDetails={matchDetails}
        />
      ) : !matchPrefs.inn1Completed ? (
        <Batting
          SetBattingTeamNode={SetBattingTeamNode}
          SetBowlingTeamNode={SetBowlingTeamNode}
          SetBattingPlayers={setInning1}
          SetBowlingPlayers={setInning2}
          team1={firstTeam}
          team2={secondTeam}
          BattingTeamScore={BattingTeamScore}
          BowlingTeamScore={BowlingTeamScore}
          SetTeam1Score={setTeam1Score}
          SetTeam2Score={setTeam2Score}
          setCapTeam1={setCapTeam1}
          setCapTeam2={setCapTeam2}
          capTeam1={capTeam1}
          capTeam2={capTeam2}
          matchDetails={matchDetails}
          SetBattersList={setBattersList}
          SetBatterScore={setBatterScore}
          SetBowlersList={setBowlersList}
          SetBowlerScore={setBowlerScore}
          setWinner={setWinner}
          setMatchPrefs={setMatchPrefs}
          matchPrefs={matchPrefs}
        ></Batting>
      ) : matchPrefs.inn2Started && matchPrefs.inn1Completed ? (
        <Batting
          SetBattingTeamNode={SetBattingTeamNode}
          SetBowlingTeamNode={SetBowlingTeamNode}
          SetBattingPlayers={setInning1}
          SetBowlingPlayers={setInning2}
          team1={secondTeam}
          team2={firstTeam}
          BattingTeamScore={BattingTeamScore}
          BowlingTeamScore={BowlingTeamScore}
          SetBattersList={setBattersList}
          SetTeam1Score={setTeam1Score}
          SetTeam2Score={setTeam2Score}
          matchDetails={matchDetails}
          SetBowlerScore={setBowlerScore}
          SetBatterScore={setBatterScore}
          SetBowlersList={setBowlersList}
          setWinner={setWinner}
          setMatchPrefs={setMatchPrefs}
          matchPrefs={matchPrefs}
          setCapTeam1={setCapTeam2}
          setCapTeam2={setCapTeam1}
          capTeam1={capTeam2}
          capTeam2={capTeam1}
        />
      ) : (
        <FullScoreCard
          matchPrefs={matchPrefs}
          setMatchPrefs={setMatchPrefs}
          BattingTeamScore={BattingTeamScore}
          BowlingTeamScore={BowlingTeamScore}
          winner={winner}
          firstTeam={firstTeam}
          secondTeam={secondTeam}
          matchDetails={matchDetails}
        />
      )}
    </>
  );
};

export default MatchStart;
