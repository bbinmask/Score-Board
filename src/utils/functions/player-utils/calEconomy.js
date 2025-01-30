const calEconomy = (bowler) => {
  let economy;
  // const balls =
  // const overs = .overs
  // const runs = runs

  if (bowler.bowling.balls == 0 && bowler.bowling.overs == 0) {
    return 0;
  } else if (bowler.bowling.balls !== 0 && bowler.bowling.overs !== 0) {
    economy =
      (bowler.bowling.runs * 6) /
      (bowler.bowling.balls + bowler.bowling.overs * 6);
  } else if (bowler.bowling.balls == 0) {
    economy = bowler.bowling.runs / bowler.bowling.overs;
  } else {
    economy = (bowler.bowling.runs * 6) / bowler.bowling.balls;
  }
  economy = Number(economy).toFixed(2, "");
  return economy;
};

export default calEconomy;
