const strikeRate = (runs, balls) => {
  if (balls == 0 || runs == 0) {
    return 0;
  }

  let sr = ((runs / balls) * 100).toFixed(2, "");

  return sr;
};

export default strikeRate;
