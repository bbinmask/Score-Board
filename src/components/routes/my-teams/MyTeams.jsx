"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";

const MyTeams = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [active, setActive] = useState(null);
  const handleGetInfo = async (_id) => {
    const response = await axios.get("/api/teams/team", {
      params: { _id },
    });
    const { teams } = response.data;
    setTeam(teams);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/teams");
        const { teams } = response.data;
        setAllTeams(teams);
        teams?.map((team, i) => {
          setActive((prev) => {
            return { type: { ...prev, id: team._id } };
          });
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    console.log(active);
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="header-title mb-3 font-brushScript font-semibold">
            My Teams <i className="mdi mdi-account-multiple ms-1"></i>
          </h2>
          <div className="flex gap-2">
            {allTeams?.map((team) => (
              <div className="list-group w-full" key={team._id}>
                <a
                  onClick={() => handleGetInfo(team._id)}
                  href="#"
                  className="list-group-item list-group-item-action"
                >
                  <div className="flex w-full items-center justify-between">
                    <div
                      className="d-flex align-items-center pb-1"
                      id="tooltips-container"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                        alt=""
                      />
                      <div className="w-100 ms-2">
                        <h5 className="mb-1">{team.name}</h5>
                        {/* <p className="font-13 text-muted mb-0">{}</p> */}
                      </div>
                      <i className="mdi mdi-chevron-right h2"></i>
                    </div>
                    <i>
                      <BiDownArrow className={`rotate-180 animate-heading`} />
                    </i>
                  </div>
                </a>
              </div>
            ))}

            {team && (
              <div className="w-full">
                <div className="">
                  <h3 className="text-center">Your teams info</h3>
                  <div className="team-name">
                    <h5>{team.name}</h5>
                  </div>
                  <div className="owner-name flex gap-2 font-serif">
                    <p>owner:</p>
                    <p> {team.owner.fullName}</p>
                  </div>
                  <div className="players">
                    <h5 className="">PLAYERS</h5>
                    {team.players?.map((player) => (
                      <h6 key={player._id}>{player.name}</h6>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTeams;
