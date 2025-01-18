"use client";

import Link from "next/link";
import UsernameError from "../Errors/UsernameError";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { BiSave, BiSolidCamera } from "react-icons/bi";
import Spinner from "../extras/Spinner";

const Profile = () => {
  const [user, setUser] = useState({
    username: null,
    email: null,
    fullName: null,
    phone: null,
    avatar: null,
    won: null,
    lose: null,
    tie: null,
    titlesWon: null,
    titlesLose: null,
  });
  const [newPhone, setNewPhone] = useState();
  const [newFullName, setNewFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [fullLoad, setFullLoad] = useState(true);
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState(null);

  const handleNewDetails = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (!newUsername && !newEmail && !newPhone && !file) {
      setLoad(false);
      setEdit(false);
      return;
    }

    if (
      newUsername === user.username &&
      newFullName === user.fullName &&
      newEmail === user.email &&
      newPhone === user.phone
    ) {
      setEdit(false);
      setLoad(false);
      return;
    }

    if (newUsername !== user.username && newUsername !== "")
      if (!isAvailable) {
        alert("username is already taken");
        setLoad(false);
        return;
      }

    const response = await axios
      .post("/api/users/profile", {
        fullName: user.fullName,
        newFullName,
        username: user.username,
        newUsername,
        email: user.email,
        newEmail,
        newPhone,
        phone: user.phone,
      })
      .catch((err) => {
        setLoad(false);
        throw new Error(`Something went wrong ${err?.message}`);
      });
    if (response.status >= 400) {
      setLoad(false);
    }
    const emailVerification = response.data?.emailAvailable;
    if (emailVerification == false) {
      setLoad(false);
      alert("Email is already used or not available");
      return;
    }
    const phoneVerification = response.data?.phoneAvailable;
    if (phoneVerification == false) {
      setLoad(false);
      alert("Contact no. is already used or not available");
      return;
    }

    const updateduser = response.data.user;
    setUser(updateduser);

    if (file) {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("id", user._id);

      const res = await axios
        .post("/api/users/profile/upload", formData)
        .catch((err) => {
          setLoad(false);
        });

      const { data } = res.data;
      if (data) {
        setUser(data);
      }
    }

    setLoad(false);
    setEdit(false);
  };

  const handleUsername = async (event) => {
    let i = event.target.value.toLowerCase();
    i = i.replace(/\s+/g, "");
    setNewUsername(i);
    if (i) {
      try {
        const response = await axios.get("/api/auth/sign-up", {
          params: { username: i },
        });

        const { available } = response.data;
        const len = i.length;
        if (i == "") {
          setIsAvailable(false);
          setErrorMessage("username should not empty");
        } else if (len < 3) {
          setIsAvailable(false);
          setErrorMessage("username should be atleast 3 words");
        } else if (available) {
          setIsAvailable(true);
          setErrorMessage("username is available");
        } else {
          setIsAvailable(false);
          setErrorMessage("Username is already taken.");
        }
      } catch (error) {
        setIsAvailable(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("/api/users/profile")
          .catch((err) => console.error(err));
        const { user } = response.data;
        setUser(user);
        setFullLoad(false);
      } catch (error) {
        setFullLoad(false);
        throw new Error("Error occured while fetching data");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {fullLoad ? (
        <div className="left-1/2 top-1/2 flex h-screen items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="container">
          <div className="main-body p-2">
            <div className="row gutters-sm">
              <div className="col-md-4 relative mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center relative text-center">
                      {edit && (
                        <div className="absolute top-20 z-50 flex w-full items-center justify-center">
                          <input
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                            }}
                            className="absolute h-32 w-[6.2rem] opacity-0"
                            type="file"
                            name="image"
                            accept="image/*"
                          />
                          <BiSolidCamera className="h-8 w-8" />
                        </div>
                      )}
                      <img
                        src={
                          user.avatar ||
                          "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }
                        alt="Admin"
                        className={`rounded-circle ${edit && "opacity-25"}`}
                        width="150"
                      />
                      <div className="mt-3 space-x-1">
                        <h4>{user.username || "Username"}</h4>
                        <div className="my-2 flex gap-4 text-base">
                          <span className="rounded-md p-2 font-semibold">
                            Following• {user?.following?.length}
                          </span>
                          <span className="rounded-md p-2 font-semibold">
                            Followers• {user?.followers?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute z-30 hidden">
                  <input type="file" itemType="image" />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div>
                    {edit ? (
                      <form onSubmit={handleNewDetails} className="card-body">
                        <div className="relative flex w-full justify-center">
                          <input
                            value={newUsername || ""}
                            placeholder={user.username}
                            maxLength={15}
                            onChange={handleUsername}
                            className="mb-4 w-full text-center text-2xl font-semibold outline-none"
                          />
                          <div className="absolute left-40 top-10 z-20">
                            <UsernameError errorMessage={errorMessage} />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="text-secondary mb-0">Full Name</h6>
                          </div>
                          <input
                            onChange={(e) => {
                              setNewFullName(e.target.value);
                            }}
                            placeholder={user.fullName}
                            className="col-sm-9 text-lg outline-none"
                            value={newFullName || ""}
                          />
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="text-secondary mb-0">Email</h6>
                          </div>
                          <input
                            onChange={(e) => {
                              setNewEmail(e.target.value.toLowerCase());
                            }}
                            type="email"
                            placeholder={user.email}
                            className="col-sm-9 text-lg outline-none"
                            value={newEmail || ""}
                          />
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="text-secondary mb-0">Phone</h6>
                          </div>
                          <input
                            type="number"
                            onChange={(e) => {
                              setNewPhone(e.target.value);
                            }}
                            className="col-sm-9 text-lg outline-none"
                            maxLength={10}
                            minLength={10}
                            placeholder={user.phone || "Enter contact no."}
                            value={newPhone || ""}
                          />
                        </div>

                        <div className="row">
                          <div className="col-sm-12"></div>
                        </div>

                        <button
                          type="Submit"
                          className="buttons m-2 bg-gray-400 px-8 text-xl font-black text-black hover:bg-gray-300"
                          target="__blank"
                        >
                          {load ? <Spinner /> : <BiSave />}
                        </button>
                      </form>
                    ) : (
                      <div className="card-body">
                        <h3 className="mb-4 text-center">
                          {user.username || "username"}
                        </h3>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.fullName || "Full Name"}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary outline-none">
                            {user.email || "abcd@your-email.com"}
                          </div>
                        </div>
                        <hr />
                        {user.phone ? (
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.phone || "123-456-7890"}
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-sm-3">
                              <div className="text-secondary mb-0">Phone</div>
                            </div>
                            <h6 className="col-sm-9">Add contact no.</h6>
                          </div>
                        )}

                        <div className="row">
                          <div className="col-sm-12"></div>
                        </div>
                      </div>
                    )}
                    {!edit && (
                      <button
                        onClick={() => setEdit((prev) => !prev)}
                        className="buttons m-2 bg-gray-400 px-8 text-xl font-black text-black hover:bg-gray-300"
                        target="__blank"
                      >
                        <MdEdit />
                      </button>
                    )}
                  </div>
                </div>

                <div className="row gutters-sm">
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">
                          Matches Analytics
                        </h6>
                        <h4 className="text-center">Total Match</h4>
                        <small>Won</small>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar"
                            style={{ width: `${user.won || "0"}` }}
                          ></div>
                        </div>
                        <small>Lose</small>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar"
                            style={{ width: `${user.lose || "0"}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">
                          Tournament Analytics
                        </h6>
                        <h4 className="text-center">Total Tournaments</h4>
                        <small>Won</small>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar"
                            style={{ width: `${user.titlesWon || "0"}` }}
                          ></div>
                        </div>
                        <small>Lose</small>
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar"
                            style={{ width: `${user.titlesLose || "0"}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
