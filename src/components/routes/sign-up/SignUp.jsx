"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgEye } from "react-icons/cg";
import Loader from "../../extras/Loader";
import { useRouter } from "next/navigation";
import Spinner from "../../extras/Spinner";
import UsernameError from "../../Errors/UsernameError";
const SignUp = () => {
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [hide, setHide] = useState(true);
  const [available, setAvailable] = useState(false);
  const [signup, setSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignup(true);
    if (
      [username, password, email, fullName].some(
        (field) => field?.trim() === "",
      )
    ) {
      setSignup(false);
      alert("FIELDS SHOULD NOT BE EMPTY!");
      return;
    }

    if (password !== repeatPassword) {
      setSignup(false);
      alert("Password did not match!");
      return;
    }
    if (!available) {
      setSignup(false);
      alert("username is not available!");
      return;
    }

    const response = await axios.post("/api/auth/sign-up", {
      fullName,
      username,
      email,
      password,
    });
    const emailVerification = response.data?.emailAvailable;
    if (emailVerification == false) {
      setSignup(false);
      alert("Email is already used or not available");
      return;
    }
  };

  const handleUsername = async (event) => {
    let i = event.target.value.toLowerCase();
    i = i.replace(/\s+/g, "");
    setUsername(i);

    if (i) {
      try {
        const response = await axios.get("/api/auth/sign-up", {
          params: { username: i },
        });

        const { available } = response.data;
        const len = i.length + 1;

        if (len < 3) {
          setAvailable(false);
          setErrorMessage("username should be atleast 3 words");
        } else if (available) {
          setAvailable(true);
          setErrorMessage("username is available");
        } else {
          setAvailable(false);
          setErrorMessage("Username is already taken.");
        }
      } catch (error) {
        setSignup(false);
        setAvailable(false);
      }
    }
  };

  useEffect(() => {
    if (signup) {
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 5000);
    }
  }, [signup]);

  return (
    <>
      {/* {signup ? (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <h2 className="text-center">Account Created Successfully</h2>
          <Loader></Loader>
        </div>
      ) : */}
      <div className="flex h-full min-h-screen flex-col items-center justify-center bg-purple-grad pb-10 pt-2 sm:min-h-screen">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="p-4">
                <div className="card card bg-dark rounded-3xl text-white">
                  <div className="card-body px-5 py-3 text-center">
                    <h4 className="text-uppercase mb-4 text-center font-light">
                      Create an account
                    </h4>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-[24px]"
                    >
                      <div className="form-outline">
                        <input
                          required
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="form-outline relative">
                        <input
                          required
                          value={username}
                          onChange={handleUsername}
                          type="text"
                          className="form-control"
                          placeholder="Create a username"
                        />
                        <div className="absolute left-2 top-10 z-20">
                          <UsernameError errorMessage={errorMessage} />
                        </div>
                      </div>

                      <div className="form-outline">
                        <input
                          required
                          type="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-outline relative">
                        <input
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          type={hide ? "password" : "text"}
                          className="form-control"
                        />
                        {/* <div className="absolute right-2 top-2 text-black">
                          <button type="button" className="">
                            <CgEye
                              onClick={() => setHide((reverse) => !reverse)}
                              className="text-2xl font-extralight"
                            />
                          </button>
                        </div> */}
                      </div>

                      <div className="form-outline relative">
                        <input
                          required
                          placeholder="Repeat your password"
                          type={hide ? "password" : "text"}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      {/* <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          required
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div> */}

                      <button
                        type="submit"
                        className="btn btn-outline-light px-5 py-2"
                      >
                        {signup ? <Spinner /> : "Create account"}
                      </button>
                    </form>
                    <p className="mt-2 text-center">
                      Have already an account?
                      <Link
                        href="/auth/sign-in"
                        className="font-bold text-gray-200"
                      >
                        <u>Login here</u>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
