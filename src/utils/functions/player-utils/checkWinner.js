const checkWinner = (matchDetails, team1, team2) => {
  let winnerObject = {
    winner: undefined,
    ballsLeft: undefined,
    wicketLeft: undefined,
    runsLeft: undefined,
  };
  const balls = matchDetails.overs * 6;
  const team1WicketsLeft = matchDetails.players - (team1.score.wickets + 1);

  const team2RunsLeft = team2.score.runs - team1.score.runs;

  const team1BallsLeft =
    balls - (team2.bowling.overs * 6 + team2.bowling.balls);
  const team2BallsLeft =
    balls - (team1.bowling.overs * 6 + team1.bowling.balls);

  if (team1.score.runs > team2.score.runs) {
    winnerObject = {
      winner: team1.name,
      ballsLeft: team1BallsLeft,
      wicketLeft: team1WicketsLeft,
      runsLeft: undefined,
    };
  } else if (team1.score.runs < team2.score.runs) {
    winnerObject = {
      winner: team2.name,
      ballsLeft: team2BallsLeft,
      wicketLeft: null,
      runsLeft: team2RunsLeft,
    };
  }
  return winnerObject;
};

export default checkWinner;
