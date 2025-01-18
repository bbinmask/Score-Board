const findPos = (batter) => {
  let position = "";
  if (batter.position == "c") {
    position = "(c)";
  } else if (batter.position == "wk") {
    position = "(wk)";
  }

  return position;
};

export default findPos;
