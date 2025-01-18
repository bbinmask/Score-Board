import React from "react";

const LineUp = ({ team }) => {
  return (
    <div>
      <ol className="list-group list-group-flush">
        {team.team.map((t, i) => {
          return (
            <li className="list-group-item m-1" key={i}>
              {t.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default LineUp;
