import { asyncHandler } from "../utils/asyncHandler";

const verifyUsername = asyncHandler(async (req, res) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  if (!email && !username) {
    throw new Error("Invalid credentials");
  }
  // else if (email && username) {
  //   return { email, username };
  // } else if (email) {
  //   return { email };
  // }
  else {
    return { username, email };
  }
});

export { verifyUsername };
