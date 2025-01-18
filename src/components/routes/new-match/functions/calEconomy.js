const calEconomy = (bowler) => {
  let economy;
  // const balls =
  // const overs = .over
  // const runs = runs

  if (bowler.overs.balls == 0 && bowler.overs.over == 0) {
    return 0;
  } else if (bowler.overs.balls !== 0 && bowler.overs.over !== 0) {
    economy =
      (bowler.overs.runs * 6) / (bowler.overs.balls + bowler.overs.over * 6);
  } else if (bowler.overs.balls == 0) {
    economy = bowler.overs.runs / bowler.overs.over;
  } else {
    economy = (bowler.overs.runs * 6) / bowler.overs.balls;
  }
  economy = Number(economy).toFixed(2, "");
  return economy;
};

export default calEconomy;
