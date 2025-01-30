import { SetInning1, SetInning2 } from "../../../store/currentMatch";
import { setTeamFirst, setTeamSecond } from "../../../store/matchSlice";
import CustomPlayers from "../../Random/CustomPlayers";
import { useState } from "react";
import MatchStart from "./MatchStart";
import MatchInfo from "./MatchInfo";
import { useAppSelector } from "@/store/hooks";
const MatchVs = ({ matchDetails }) => {
  const teamFirst = useAppSelector((store) => store.teams.teamFirst);
  const teamSecond = useAppSelector((store) => store.teams.teamSecond);
  const [toggle, setToggle] = useState(false);

  const [matchPrefs, setMatchPrefs] = useState({
    matchOver: false,
    inn1Started: false,
    inn2Started: false,
    inn1Completed: false,
    inn2Completed: false,
  });

  const handleToggle = () => {
    setToggle(true);
    setMatchPrefs({ ...matchPrefs, inn1Started: true });
  };
  return (
    <>
      <section className={`h-full w-full bg-slate-50`}>
        {!toggle && (
          <div className="details p-2">
            <MatchInfo matchDetails={matchDetails} />
          </div>
        )}
        {!toggle ? (
          <div className="flex w-full flex-col items-center rounded-md bg-slate-50">
            {matchDetails.customPlayer ? (
              <div className="match-vs">
                <div className="first-team z-10 rounded-md">
                  <CustomPlayers
                    matchDetails={matchDetails}
                    teamName={matchDetails.teams.team1}
                    setTeam={setTeamFirst}
                    setInning={SetInning1}
                    teamsArr={teamFirst}
                  />
                </div>
                <div className="flex w-full items-center justify-center text-center">
                  <h1 className="font-black">VS</h1>
                </div>

                <div className="second-teamsArr z-10 rounded-md">
                  <CustomPlayers
                    teamName={matchDetails.teams.team2}
                    matchDetails={matchDetails}
                    setTeam={setTeamSecond}
                    setInning={SetInning2}
                    teamsArr={teamSecond}
                  />
                </div>
              </div>
            ) : (
              <div className="my-4 flex h-full w-full flex-col items-center justify-between rounded-md">
                <div className="w-full rounded-md bg-slate-50 text-center sm:w-96">
                  <h1 className="font-brushScript text-5xl font-semibold">
                    {matchDetails.teams.team1}
                  </h1>
                  <h1 className="font-[Algerian] text-3xl font-semibold">vs</h1>
                  <h1 className="font-brushScript text-5xl font-semibold">
                    {matchDetails.teams.team2}
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : (
          <MatchStart
            matchDetails={matchDetails}
            matchPrefs={matchPrefs}
            setMatchPrefs={setMatchPrefs}
          />
        )}
        {!toggle && !matchDetails.customPlayer && (
          <div className="flex w-full justify-center pb-4">
            <button
              className="buttons w-1/4 bg-red-800 text-white"
              onClick={handleToggle}
            >
              Start
            </button>
          </div>
        )}
        {!toggle && teamFirst.length !== 0 && teamSecond.length !== 0 && (
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
