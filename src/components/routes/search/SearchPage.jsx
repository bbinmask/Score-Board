"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Spinner from "@/components/extras/Spinner";
import Link from "next/link";
const SearchPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [results, setResults] = useState();
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (!search || search == "") {
      setLoad(false);
    }

    const response = await axios
      .get("/api/search", {
        params: { search },
      })
      .catch((err) => {
        setLoad(false);
        setError(err);
      });

    const { users } = response.data;
    const { status } = response.data;
    if (status >= 400) {
      setLoad(false);
      setError(users);
      return;
    }

    setResults(users);
    setLoad(false);
    setError(null);
  };

  const handleFollow = async (id) => {
    const response = await axios.post("/api/request/follow", { id });
    if (response.status < 400) {
      const fetchData = async () => {
        const response = await axios.get("/api/users/profile");
        const { user } = response.data;
        if (user) {
          setUserInfo(user);
        }
      };

      fetchData();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/users/profile");
      const { user } = response.data;
      user && setUserInfo(user);
    };

    fetchData();
  }, []);

  return load ? (
    <div className="left-1/2 top-1/2 flex h-screen items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[500px] flex-col justify-center pt-6">
        <div className="text-center">
          <div className="">
            <h3>Search players</h3>
            <div className="small-search-wrap">
              <form action="#" onSubmit={handleSubmit}>
                <div className="mt-4 flex px-8">
                  <input
                    type="text"
                    placeholder="@username"
                    maxLength={search.startsWith("@", 0) ? 16 : 35}
                    required
                    minLength={search.startsWith("@", 0) ? 4 : 2}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-l-md border-b-2 border-l-2 border-r-0 border-t-2 p-2 font-serif outline-none"
                    name="name"
                    id="name"
                  />
                  <button className="rounded-r-md border-b-2 border-l-0 border-r-2 border-t-2 bg-white px-3">
                    <BiSearch className="h-6 w-6 hover:h-7 hover:w-7 hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
            <hr className="small invisible" />
          </div>
          <div className="col-md-12">
            <div className="v-heading-v2">
              <h4 className="v-search-result-count">
                {results?.length} results
              </h4>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ul className="m-0 px-2">
            {!results ? (
              <h1 className="text-center">Search for friends</h1>
            ) : load ? (
              <div className="flex w-full flex-col items-center gap-6">
                <h1>Searching</h1>
                <Spinner />
              </div>
            ) : (
              results.map((user) => {
                return (
                  <li
                    key={user._id}
                    className="mb-3 flex items-center justify-between rounded-md border-1 p-3 text-black no-underline"
                  >
                    <Link
                      href={`/search/${user?._id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="">
                        <img
                          src={
                            user.avatar ||
                            "https://bootdey.com/img/Content/avatar/avatar7.png"
                          }
                          className="h-14 w-14 rounded-full lg:h-16 lg:w-16"
                        />
                      </div>
                      <div className="">
                        <span className="hover:tex-blue-600 text-xl font-semibold text-blue-500 active:text-blue-600">
                          {user.username}
                        </span>
                        <div className="mb-15">
                          <ul className="m-0 p-0 text-xs">
                            <li className="">{user.fullName}</li>
                            <li className="">{user.won}% winning</li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                    {userInfo?._id === user._id ? (
                      ""
                    ) : (
                      <div>
                        {userInfo?.following?.includes(user._id) ? (
                          <button
                            onClick={() => handleFollow(user._id)}
                            className={`btn btn-secondary`}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFollow(user._id)}
                            className={`btn btn-primary`}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
