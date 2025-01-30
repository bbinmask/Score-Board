import React from "react";
import findPos from "../../../utils/functions/player-utils/findPos";

const LineUp = ({ teamsArr }) => {
  return (
    <>
      <ol
        style={{ listStyleType: "decimal" }}
        className="font-serif text-lg leading-7"
        type="1"
      >
        {teamsArr.team.map((player, i) => (
          <li className="m-1" key={i}>
            {`${player.playerDetails.name} ${findPos(player)}`}
          </li>
        ))}
      </ol>
    </>
  );
};

export default LineUp;
