import React from "react";
import { MdNotifications } from "react-icons/md";
import Logout from "../extras/Logout";
import axios from "axios";
import Link from "next/link";
import Notifications from "./Notifications";
const Header = ({
  isShowNotify,
  setIsShowNotify,
  userInfo,
  fRequests,
  setFRequests,
}) => {
  const handleNotifications = (e) => {
    e.stopPropagation();
    setIsShowNotify((arg) => !arg);
  };

  return (
    <>
      <div
        className="h-24 w-full sm:hidden"
        onClick={() => setIsShowNotify(false)}
      ></div>
      <div className="fixed top-0 z-50 mb-4 w-full bg-green-500 px-2 py-2 sm:hidden">
        <ul className="header-ul flex w-nearFull justify-between">
          <li className="header-li flex text-black no-underline">
            <h2
              name="score board"
              className="mx-2 font-brushScript font-semibold text-slate-50"
            >
              Score Board
            </h2>
          </li>

          <li className="header-li">
            <div className="flex items-center gap-4">
              <button type="button" onClick={handleNotifications}>
                <MdNotifications className="text-3xl text-white" />
              </button>
              <Logout />
            </div>
          </li>
        </ul>
      </div>
      {isShowNotify && (
        <Notifications
          userInfo={userInfo}
          fRequests={fRequests}
          setFRequests={setFRequests}
        />
      )}
    </>
  );
};

export default Header;
