const oversCount = (bowler) => {
  return bowler.bowling.balls === 0
    ? bowler.bowling.overs
    : `${bowler.bowling.overs}.${bowler.bowling.balls}`;
};

export default oversCount;
