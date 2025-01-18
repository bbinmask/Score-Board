"use client";

import styles from "@/css/HomePage.module.css";
import { useState } from "react";

const Match = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const handleFirst = (event) => {
    setFirst(event.target.value.toUpperCase());
  };

  const handleSecond = (event) => {
    setSecond(event.target.value.toUpperCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className={`${styles.main}`}>
      <form action="" className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`${styles.teamsDiv}`}>
          <input
            required
            onChange={handleFirst}
            type="text"
            className={`${styles.teams}`}
            placeholder="Enter First Team"
          />
          <label htmlFor="">{first}</label>
        </div>
        <div className={`${styles.vsDiv}`}>vs</div>
        <div className={`${styles.teamsDiv}`}>
          <input
            onChange={handleSecond}
            type="text"
            className={`${styles.teams}`}
            placeholder="Enter Second Team"
            required
          />
          <label htmlFor="">{second}</label>
        </div>
        <a href="/score">
          <button
            type="submit"
            className={`${styles.continue} btn btn-success`}
          >
            Continue
          </button>
        </a>
      </form>
    </main>
  );
};

export default Match;
