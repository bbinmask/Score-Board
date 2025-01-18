"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./Header";
import axios from "axios";

const HomePage = () => {
  const [isShowNotify, setIsShowNotify] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [fRequests, setFRequests] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios
        .get("/api/users/profile")
        .catch((err) => console.error(err.message));

      const { user } = response1?.data;
      setUserInfo(user);

      const response2 = await axios
        .get(`/api/notifications/requests`)
        .catch((err) => console.error(err));

      const { friendRequests } = response2?.data;
      setFRequests(friendRequests);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="home-sec sm:py-6">
        <Header
          isShowNotify={isShowNotify}
          setIsShowNotify={setIsShowNotify}
          userInfo={userInfo}
          fRequests={fRequests}
          setFRequests={setFRequests}
        ></Header>

        <div
          className="flex w-full items-center justify-center"
          onClick={() => setIsShowNotify(false)}
        >
          <ul className="home-ul">
            <Link href={"/my-teams"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/cricket-logo.jpg" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">Your Teams</label>
                </div>
              </li>
            </Link>
            <Link href={"/new-match"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/prev-matches.jpg" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">New Match</label>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/statistics.png" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">Statistics</label>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/streak.jpg" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">Streak</label>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/cricket-tournament.jpg" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">Tournament</label>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="home-li">
                <div className="home-img">
                  <img src="/img/prev-tournament.jpg" alt="Icon" />
                </div>
                <div className="home-name">
                  <label htmlFor="home-name">Prev Matches</label>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomePage;
