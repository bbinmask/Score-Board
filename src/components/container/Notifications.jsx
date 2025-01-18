"use client";

import axios from "axios";
import React from "react";

const Notifications = ({ userInfo, fRequests, setFRequests }) => {
  const handleAcceptRequest = async (requestedUserId) => {
    const response = await axios
      .post("/api/request/friend/accept-request", { requestedUserId })
      .catch((err) => console.error(err.message));
    const { friendRequests } = response.data;

    if (friendRequests) {
      setFRequests(friendRequests);
    }
  };

  return (
    <>
      <div className="notifications-div">
        <h5 className="text-center">Notifications</h5>
        <ul className="notifications-ul">
          {fRequests?.length == 0 ? (
            <li className="mt-8 h-full w-full">
              <h5 className="text-center font-sans">
                No notifications for now!
              </h5>
            </li>
          ) : (
            fRequests?.map((req) => {
              return (
                <li
                  className="notifications-li mb-1 flex flex-row items-center justify-between gap-4"
                  key={req._id}
                >
                  <div className="flex w-full flex-row">
                    <img
                      src={
                        req?.avatar ||
                        "https://bootdey.com/img/Content/avatar/avatar7.png"
                      }
                      alt="avatar"
                      className="h-12 w-12 cursor-pointer rounded-full border-0 border-black p-1"
                    />
                    <span className="">
                      <b className="cursor-pointer">{req?.username}</b>{" "}
                      <small className="w-full text-xs">
                        sending you friend request
                      </small>
                    </span>
                  </div>
                  <div>
                    <button
                      className="rounded-md bg-sky-500 px-2 py-1 text-sm text-white"
                      onClick={() => handleAcceptRequest(req._id)}
                    >
                      Accept
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default Notifications;
