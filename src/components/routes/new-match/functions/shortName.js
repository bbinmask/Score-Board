const shortName = (fullName) => {
  // Check if fullName is valid and a string
  if (!fullName || typeof fullName !== "string") {
    return ""; // Return an empty string or any fallback value if the name is invalid
  }

  let username = fullName;

  if (username.length > 9 && !username.includes(" ")) {
    // Handle case where the name has no spaces and is longer than 9 characters
    username = username.slice(0, 7) + "..."; // Slice the first 7 characters and append "..."
  } else if (username.length > 9) {
    // Handle case where the name has spaces and is longer than 9 characters
    let temp = username.split(" ", 2); // Split name into two parts
    username = `${temp[0]} ${temp[1]?.slice(0, 1)}`; // Combine first name with the initial of the last name
  }

  return username;
};

export default shortName;
