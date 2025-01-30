const wonMessage = (winner) => {
  let message = null;

  if (winner.winner) {
    if (winner.runsLeft === undefined && winner.winner) {
      message = `${winner.winner} won by ${winner.wicketLeft} wickets`;
    } else if (winner.runsLeft === 0) {
      message = `The match is ${winner.winner}`;
    } else if (winner.runsLeft !== 0 && winner.runsLeft !== undefined) {
      message = `${winner.winner} won by ${winner.runsLeft} runs`;
    }
  }

  return message;
};

export default wonMessage;
