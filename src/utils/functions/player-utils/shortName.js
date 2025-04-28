const shortName = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return "";
  }

  let username = fullName;

  if (username.length > 9 && !username.includes(" ")) {
    username = username.slice(0, 7) + "...";
  } else if (username.length > 9) {
    let temp = username.split(" ", 2);
    username = `${temp[0]}`; // ${temp[1]?.slice(0, 1)}
  }

  return username;
};

export default shortName;
