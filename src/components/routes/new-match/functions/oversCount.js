const oversCount = (bowler) => {
  const temp =
    bowler.overs.balls == 0
      ? bowler.overs.over
      : `${bowler.overs.over}.${bowler.overs.balls}`;

  return temp;
};

export default oversCount;
