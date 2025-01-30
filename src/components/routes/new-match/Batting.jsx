"use client";
import { useEffect, useState } from "react";
import ScoreBoard from "./Score/ScoreBoard.jsx";
import SelectBatter from "./SelectBatter";
import SelectBowler from "./SelectBowler";
import NewBatter from "./NewBatter";
import NewBowler from "./NewBowler";
import TypeBowler from "./type-ots/TypeBowler";
import TypeOpeners from "./type-ots/TypeOpeners";
import TypeNewBatter from "./type-ots/TypeNewBatter";
import TypeNewBowler from "./type-ots/TypeNewBowler";
import { useAppDispatch } from "@/store/hooks.js";
const Batting = ({
  team1,
  team2,
  SetBattingPlayers,
  SetBowlingPlayers,
  BattingTeamScore,
  BowlingTeamScore,
  SetTeam1Score,
  setCapTeam1,
  SetBattersList,
  setCapTeam2,
  capTeam1,
  capTeam2,
  matchDetails,
  SetBatterScore,
  SetBowlerScore,
  SetBowlersList,
  setMatchPrefs,
  matchPrefs,
}) => {
  const [bowlingPrefs, setBowlingPrefs] = useState({
    isWicket: false,
    isBowlerChange: true,
    isOverCompleted: false,
    wickets: 0,
    currentBowler: null,
    overLimit: matchDetails.limit,
    overs: 0,
    ballsLeft: 5,
  });
  const [battingPrefs, setBattingPrefs] = useState({
    strikeBatter: null,
    nonStrikeBatter: null,
    isBatterChange: true,
  });

  const [isStarted, setIsStarted] = useState(false);
  const [recentBalls, setRecentBalls] = useState([]);
  const [extra, setExtra] = useState(null);
  const [toggleBatter, setToggleBatter] = useState(false);
  const dispatch = useAppDispatch();

  const handleShot = (event) => {
    const runs = Number(event.target.value);

    // Setting recentBalls

    const recentBalls = !extra ? runs : runs === 0 ? extra : runs + extra;
    setRecentBalls((prevState) => [recentBalls, ...prevState]);

    // dispatching actions

    dispatch(
      SetBowlerScore({ runs, extra, id: bowlingPrefs.currentBowler.id }),
    );
    dispatch(SetBatterScore({ runs, id: battingPrefs.strikeBatter.id, extra }));

    // Substracting balls from over

    if (extra == "wd" || extra == "nb") {
    } else if (bowlingPrefs.ballsLeft > 0) {
      setBowlingPrefs({
        ...bowlingPrefs,
        ballsLeft: bowlingPrefs.ballsLeft - 1,
      });
    } else if (bowlingPrefs.ballsLeft === 0) {
      setRecentBalls((prevState) => ["|", ...prevState]);
      setIsStarted(false);
      setBowlingPrefs({
        ...bowlingPrefs,
        isBowlerChange: true,
        overs: bowlingPrefs.overs + 1,
        ballsLeft: 5,
        isOverCompleted: true,
      });
    }

    // handling batters prefrences

    if (battingPrefs.strikeBatter.id || battingPrefs.strikeBatter.id == 0) {
      if (bowlingPrefs.ballsLeft === 0) {
        if (runs % 2 === 0) {
          setBattingPrefs({
            ...battingPrefs,
            strikeBatter: battingPrefs.nonStrikeBatter,
            nonStrikeBatter: battingPrefs.strikeBatter,
          });
        }
      } else if (runs % 2 == 1) {
        setBattingPrefs({
          ...battingPrefs,
          strikeBatter: battingPrefs.nonStrikeBatter,
          nonStrikeBatter: battingPrefs.strikeBatter,
        });
      }

      // handling wicket
      if (extra === "w") {
        if (bowlingPrefs.ballsLeft === 0) {
          setBattingPrefs({
            ...battingPrefs,
            strikeBatter: null,
            isBatterChange: true,
          });
          setIsStarted(false);
          setBowlingPrefs({
            ...bowlingPrefs,
            wickets: bowlingPrefs.wickets + 1,
            isWicket: true,
            isBowlerChange: true,
            isOverCompleted: true,
            ballsLeft: 5,
          });
        } else {
          setBattingPrefs({
            ...battingPrefs,
            strikeBatter: null,
            isBatterChange: true,
          });
          setIsStarted(false);
          setBowlingPrefs({
            ...bowlingPrefs,
            wickets: bowlingPrefs.wickets + 1,
            isWicket: true,
            ballsLeft: bowlingPrefs.ballsLeft - 1,
          });
        }
      }
    }
    setExtra(null);
  };

  const handleExtra = (event) => {
    setExtra(event.target.value);
  };
  const handleStrikeChange = () => {
    setBattingPrefs({
      ...battingPrefs,
      strikeBatter: battingPrefs.nonStrikeBatter,
      nonStrikeBatter: battingPrefs.strikeBatter,
    });
  };
  useEffect(() => {
    if (matchPrefs.inn1Started && !matchPrefs.inn1Completed) {
      if (
        matchDetails.overs == bowlingPrefs.overs ||
        bowlingPrefs.wickets == matchDetails.players - 1
      ) {
        setMatchPrefs({ ...matchPrefs, inn1Completed: true });
      } else {
        return;
      }
    } else if (matchPrefs.inn2Started && !matchPrefs.inn2Completed) {
      if (
        bowlingPrefs.wickets == matchDetails.players - 1 ||
        matchDetails.overs === bowlingPrefs.overs ||
        BattingTeamScore.score.runs > BowlingTeamScore.score.runs
      ) {
        setMatchPrefs({ ...matchPrefs, inn2Completed: true, matchOver: true });
      } else {
        return;
      }
    } else {
      return;
    }
    setBowlingPrefs({
      ...bowlingPrefs,
      isWicket: false,
      isBowlerChange: true,
      ballsLeft: 5,
      wickets: 0,
      currentBowler: null,
    });
    setIsStarted(false);
    setBattingPrefs({
      isBatterChange: true,
      strikeBatter: null,
      nonStrikeBatter: null,
    });
    setRecentBalls([]);
    setExtra(null);
    setToggleBatter(false);
  }, [
    bowlingPrefs.ballsLeft,
    bowlingPrefs.isBowlerChange,
    bowlingPrefs.wickets,
  ]);

  return (
    <div className={`Container flex-col`}>
      {matchDetails.customPlayer ? (
        isStarted &&
        !bowlingPrefs.isBowlerChange &&
        !battingPrefs.isBatterChange ? (
          <ScoreBoard
            handleStrikeChange={handleStrikeChange}
            handleShot={handleShot}
            recentBalls={recentBalls}
            battingPrefs={battingPrefs}
            bowlingPrefs={bowlingPrefs}
            handleExtra={handleExtra}
            setBowlingPrefs={setBowlingPrefs}
            setBattingPrefs={setBattingPrefs}
            team1={team1}
            team2={team2}
            BattingTeamScore={BattingTeamScore}
            BowlingTeamScore={BowlingTeamScore}
          />
        ) : bowlingPrefs.isBowlerChange &&
          !bowlingPrefs.isOverCompleted &&
          !bowlingPrefs.isWicket ? (
          <div className="select-div">
            <SelectBatter
              SetBattersList={SetBattersList}
              matchDetails={matchDetails}
              setStart={setIsStarted}
              SetTeamScore={SetTeam1Score}
              TeamScore={BattingTeamScore}
              SetBatterScore={SetBatterScore}
              dispatch={dispatch}
              toggle={toggleBatter}
              setToggle={setToggleBatter}
              battingPrefs={battingPrefs}
              setBowlingPrefs={setBowlingPrefs}
              bowlingPrefs={bowlingPrefs}
              setBattingPrefs={setBattingPrefs}
            />
            {bowlingPrefs.isBowlerChange && !bowlingPrefs.isOverCompleted && (
              <SelectBowler
                setStart={setIsStarted}
                TeamScore={BowlingTeamScore}
                dispatch={dispatch}
                SetBowlersList={SetBowlersList}
                setBowlingPrefs={setBowlingPrefs}
                bowlingPrefs={bowlingPrefs}
              />
            )}
          </div>
        ) : (
          <>
            {bowlingPrefs.isWicket && battingPrefs.isBatterChange && (
              <div className="select-div z-40">
                <NewBatter
                  bowlingPrefs={bowlingPrefs}
                  setStart={setIsStarted}
                  setBowlingPrefs={setBowlingPrefs}
                  battingPrefs={battingPrefs}
                  SetBattersList={SetBattersList}
                  BattingTeamScore={BattingTeamScore}
                  setBattingPrefs={setBattingPrefs}
                  dispatch={dispatch}
                  SetTeam1Score={SetTeam1Score}
                  matchDetails={matchDetails}
                />
              </div>
            )}
            {bowlingPrefs.isBowlerChange && bowlingPrefs.currentBowler && (
              <NewBowler
                Team={BowlingTeamScore}
                bowlingPrefs={bowlingPrefs}
                dispatch={dispatch}
                SetBowlersList={SetBowlersList}
                matchDetails={matchDetails}
                setBowlingPrefs={setBowlingPrefs}
                setStart={setIsStarted}
              />
            )}
          </>
        )
      ) : isStarted &&
        !bowlingPrefs.isBowlerChange &&
        !battingPrefs.isBatterChange ? (
        <ScoreBoard
          handleStrikeChange={handleStrikeChange}
          handleShot={handleShot}
          recentBalls={recentBalls}
          battingPrefs={battingPrefs}
          bowlingPrefs={bowlingPrefs}
          handleExtra={handleExtra}
          setBowlingPrefs={setBowlingPrefs}
          setBattingPrefs={setBattingPrefs}
          team1={team1}
          team2={team2}
          BattingTeamScore={BattingTeamScore}
          BowlingTeamScore={BowlingTeamScore}
        />
      ) : bowlingPrefs.isBowlerChange &&
        !bowlingPrefs.isOverCompleted &&
        !bowlingPrefs.isWicket ? (
        <div className="select-div">
          <TypeOpeners
            SetBattingPlayers={SetBattingPlayers}
            SetBattersList={SetBattersList}
            setCap={setCapTeam1}
            isCap={capTeam1}
            matchDetails={matchDetails}
            SetTeam1Score={SetTeam1Score}
            BattingTeamScore={BattingTeamScore}
            dispatch={dispatch}
            toggle={toggleBatter}
            setToggle={setToggleBatter}
            battingPrefs={battingPrefs}
            setBowlingPrefs={setBowlingPrefs}
            bowlingPrefs={bowlingPrefs}
            setBattingPrefs={setBattingPrefs}
          />
          {/* )} */}

          {bowlingPrefs.isBowlerChange &&
            !bowlingPrefs.isOverCompleted &&
            !battingPrefs.isBatterChange && (
              <TypeBowler
                SetBowlingPlayers={SetBowlingPlayers}
                SetBowlersList={SetBowlersList}
                setCap={setCapTeam2}
                isCap={capTeam2}
                setStart={setIsStarted}
                BowlingTeamScore={BowlingTeamScore}
                dispatch={dispatch}
                matchDetails={matchDetails}
                setBowlingPrefs={setBowlingPrefs}
                bowlingPrefs={bowlingPrefs}
              />
            )}
        </div>
      ) : (
        <>
          {bowlingPrefs.isWicket &&
            bowlingPrefs.wickets !== matchDetails.players - 1 && (
              <div className="select-div z-40">
                <TypeNewBatter
                  SetBattingPlayers={SetBattingPlayers}
                  SetBattersList={SetBattersList}
                  setBowlingPrefs={setBowlingPrefs}
                  bowlingPrefs={bowlingPrefs}
                  setCap={setCapTeam1}
                  isCap={capTeam1}
                  setStart={setIsStarted}
                  battingPrefs={battingPrefs}
                  setBattingPrefs={setBattingPrefs}
                  dispatch={dispatch}
                  SetTeam1Score={SetTeam1Score}
                  BattingTeamScore={BattingTeamScore}
                  matchDetails={matchDetails}
                />
              </div>
            )}
          {bowlingPrefs.isBowlerChange &&
            bowlingPrefs.currentBowler &&
            !battingPrefs.isBatterChange && (
              <TypeNewBowler
                SetBowlingPlayers={SetBowlingPlayers}
                SetBowlersList={SetBowlersList}
                setCap={setCapTeam2}
                isCap={capTeam2}
                setStart={setIsStarted}
                BowlingTeamScore={BowlingTeamScore}
                dispatch={dispatch}
                matchDetails={matchDetails}
                setBowlingPrefs={setBowlingPrefs}
                bowlingPrefs={bowlingPrefs}
              />
            )}
        </>
      )}
    </div>
  );
};

export default Batting;
