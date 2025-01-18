import CustomPlayers1 from "./CustomPlayers1";
import CustomPlayers2 from "./CustomPlayers2";
import { useState } from "react";
import MatchStart from "./MatchStart";
import MatchInfo from "./MatchInfo";
const MatchVs = ({ match }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <>
      <section className={`h-full w-full bg-slate-50`}>
        {!toggle && (
          <div className="details p-2">
            <MatchInfo match={match} />
          </div>
        )}

        {!toggle ? (
          <div className="flex w-full flex-col items-center rounded-md bg-slate-50">
            {match.customPlayer ? (
              <div className="match-vs">
                <div className="first-team z-10 rounded-md">
                  <CustomPlayers1 match={match} />
                </div>
                <div className="flex w-full items-center justify-center text-center">
                  <h1 className="font-black">VS</h1>
                </div>

                <div className="second-team z-10 rounded-md">
                  <CustomPlayers2 match={match} />
                </div>
              </div>
            ) : (
              <div className="my-4 flex h-full w-full flex-col items-center justify-between rounded-md">
                <div className="w-full rounded-md bg-slate-50 text-center sm:w-96">
                  <h1 className="font-brushScript text-5xl font-semibold">
                    {match.teams.team1}
                  </h1>
                  <h1 className="font-[Algerian] text-3xl font-semibold">vs</h1>
                  <h1 className="font-brushScript text-5xl font-semibold">
                    {match.teams.team2}
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : (
          <MatchStart match={match} />
        )}
        {!toggle && (
          <div className="flex w-full justify-center pb-4">
            <button
              className="buttons w-1/4 bg-red-800 text-white"
              onClick={handleToggle}
            >
              Start
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default MatchVs;
