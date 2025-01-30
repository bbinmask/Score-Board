const findPos = (batter) => {
  let position = "";
  if (batter?.playerDetails?.captain) {
    position = "(c)";
  } else if (batter?.playerDetails?.wk) {
    position = "(wk)";
  }
  return position;
};

export default findPos;
