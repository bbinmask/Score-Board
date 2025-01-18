"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "./Spinner";
const Logout = () => {
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const logout = () => {
    setLoad(true);
    const fetchData = async () => {
      const response = await axios.get("/api/auth/logout").catch((err) => {
        setLoad(false);
        console.error(err.message);
      });

      if (response?.data?.status < 400) {
        setTimeout(() => {
          setLoad(false);
          router.push("/auth/sign-in");
        }, 2000);
      }
    };
    fetchData();
  };

  return (
    <button className="btn btn-light float-right" onClick={logout}>
      {!load ? "Logout" : <Spinner />}
    </button>
  );
};

export default Logout;
