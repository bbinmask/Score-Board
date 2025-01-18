const checkWinner = (bat1, bat2, match, inning1, inning2, wickets, batting) => {
  const totalBalls = match.overs * 6;
  const inn2Balls = Number(bat1.score.balls);
  const t1Runs = batting ? Number(bat2.score.runs) : Number(bat1.score.runs);
  const t2Runs = batting ? Number(bat1.score.runs) : Number(bat2.score.runs);
  const totalPlayers = match.players - 1;

  let winnerObject = {
    winner: undefined,
    ballsLeft: undefined,
    wicketLeft: undefined,
    runsLeft: undefined,
  };

  if (bat2.batting.length === 0) {
    return winnerObject;
  }
  const remainingBalls = totalBalls - inn2Balls;
  const remainingWickets = inning1.filter(
    (player) => player.out === false,
  ).length;

  if (batting) {
    if (t1Runs < t2Runs) {
      winnerObject = {
        winner: match.teams.team2,
        ballsLeft: remainingBalls,
        wicketLeft: totalPlayers - remainingWickets,
        runsLeft: undefined,
      };
    } else if (
      t1Runs > t2Runs &&
      (inn2Balls === totalBalls || wickets === inning2.length - 1)
    ) {
      winnerObject = {
        winner: match.teams.team1,
        ballsLeft: remainingBalls,
        wicketLeft: undefined,
        runsLeft: t1Runs - t2Runs,
      };
    } else if (
      t1Runs === t2Runs &&
      (inn2Balls === totalBalls || wickets === inning2.length - 1)
    ) {
      winnerObject = {
        winner: "Tie",
        ballsLeft: remainingBalls,
        wicketLeft: totalPlayers - remainingWickets,
        runsLeft: 0,
      };
    }
  } else if (!batting) {
    if (t1Runs > t2Runs) {
      winnerObject = {
        winner: match.teams.team1,
        ballsLeft: remainingBalls,
        wicketLeft: totalPlayers - remainingWickets,
        runsLeft: undefined,
      };
    } else if (
      t1Runs < t2Runs &&
      (inn2Balls === totalBalls || wickets === inning2.length - 1)
    ) {
      winnerObject = {
        winner: match.teams.team2,
        ballsLeft: remainingBalls,
        wicketLeft: undefined,
        runsLeft: t2Runs - t1Runs,
      };
    } else if (
      t1Runs === t2Runs &&
      (inn2Balls === totalBalls || wickets === inning2.length - 1)
    ) {
      winnerObject = {
        winner: "Tie",
        ballsLeft: remainingBalls,
        wicketLeft: totalPlayers - remainingWickets,
        runsLeft: 0,
      };
    }
  }
  return winnerObject;
};

export default checkWinner;
