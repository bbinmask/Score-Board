import React from "react";
import SearchProfile from "../../../components/routes/search/SeachProfile";
const page = ({ params }) => {
  const id = params._id;

  return (
    <div>
      <SearchProfile id={id} />
    </div>
  );
};

export default page;
