import React from "react";

const UsernameError = ({ errorMessage }) => {
  return <p className={`text-[10px] font-light`}>{errorMessage}</p>;
};

export default UsernameError;
