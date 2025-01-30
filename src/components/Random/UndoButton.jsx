import { useState } from "react";
import ScoreListHook from "../../hooks/ScoreListHook";
const UndoButton = ({ state, setState }) => {
  const [scoringList] = useState(new ScoreListHook());

  // Function to add a new score state
  const addScore = () => {
    scoringList.addState(state);
    setState({
      bowlingPrefs: state.bowlingPrefs + 1,
      battingPrefs: state.battingPrefs + 2,
      isStarted: state.isStarted + 4,
      recentBalls: state.recentBalls + 8,
      battingTeam: state.battingTeam + 16,
      bowlingTeam: state.bowlingTeam + 32,
    });
  };

  // Function to undo last action
  const handleUndo = () => {
    const prevScore = scoringList.undo();
    setState(prevScore);
  };

  // Function to redo last undone action
  const handleRedo = () => {
    const nextScore = scoringList.redo();
    setState(nextScore);
  };
  const [state, setState] = useState({
    bowlingPrefs: {
      isWicket: false,
      isBowlerChange: true,
      isOverCompleted: false,
      wickets: 0,
      currentBowler: null,
      overLimit: matchDetails.limit,
      overs: 0,
      ballsLeft: 5,
    },
    battingPrefs: {
      strikeBatter: null,
      nonStrikeBatter: null,
      isBatterChange: true,
    },
    isStarted: false,
    recentBalls: [],
    battingTeam: {
      name: null,
      score: {
        balls: 0,
        runs: 0,
        wickets: 0,
        extras: {
          wide: 0,
          b: 0,
          lb: 0,
          nb: 0,
        },
        wicketsType: [{ batter: null, bowler: null }],
      },
      fieldingScore: {
        runs: 0,
        wickets: 0,
      },
      playersList: [],
      batting: [],
      bowling: [],
      fielding: [],
    },
    bowlingTeam: {
      name: null,
      score: {
        balls: 0,
        runs: 0,
        wickets: 0,
        extras: {
          wide: 0,
          b: 0,
          lb: 0,
          nb: 0,
        },
        wicketsType: [{ batter: null, bowler: null }],
      },
      fieldingScore: {
        runs: 0,
        wickets: 0,
      },
      playersList: [],
      batting: [],
      bowling: [],
      fielding: [],
    },
  });

  return (
    <div>
      <h1></h1>
      <div className="flex gap-5 p-6">
        <button
          className="rounded-lg border-1 bg-yellow-300 p-4 text-center text-lg"
          onClick={() => addScore(1)}
        >
          Add 1 Run
        </button>
        <button
          className="rounded-lg border-1 bg-yellow-300 p-4 text-center text-lg"
          onClick={() => addScore(4)}
        >
          Add 4 Runs
        </button>
        <button
          className="rounded-lg border-1 bg-yellow-300 p-4 text-center text-lg"
          onClick={() => addScore(6)}
        >
          Add 6 Runs
        </button>
        <button
          className="rounded-lg border-1 bg-yellow-300 p-4 text-center text-lg"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="rounded-lg border-1 bg-yellow-300 p-4 text-center text-lg"
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default UndoButton;
