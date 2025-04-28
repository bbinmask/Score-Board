"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../../extras/Spinner";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const data = { email: details.toLowerCase(), password };
    setLoader(true);
    const response = await axios
      .post("/api/auth/sign-in", data)
      .catch((err) => {
        setLoader(false);
        console.error(err);
        throw new Error(err);
      });

    if (response.status < 400 && response.status > 100) {
      // const { user, accessToken, refreshToken } = response.data;
      // const localData = JSON.stringify(user);
      // localStorage.setItem("user", localData);
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      router.push("/profile");
    }
  };

  const handleUsernameOrPassword = (e) => {
    setDetails(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex h-full min-h-screen flex-col items-center justify-center bg-purple-grad"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark rounded-3xl text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-8">
                    <h2 className="fw-bold text-uppercase mb-2">Login</h2>
                    <p className="text-white-50 mb-4">
                      Please enter your details and password!
                    </p>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        required
                        type="text"
                        onChange={handleUsernameOrPassword}
                        placeholder="Enter your username or details here"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        username or details
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        required
                        type="password"
                        id="typePasswordX"
                        onChange={handlePassword}
                        placeholder="Enter your password here"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <p className="small mb-4">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      className="btn btn-outline-light btn-lg flex items-center gap-2 px-5"
                      type={`submit`}
                      disabled={loader}
                    >
                      {loader ? <Spinner /> : "Login"}
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?
                      <Link
                        href="/auth/sign-up"
                        className="text-white-50 fw-bold"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
