import React, { useEffect, useRef, useState } from "react";

const NewBatter = ({
  inning,
  strike,
  setStart,
  nonStrike,
  setStrike,
  dispatch,
  scoring,
  setW,
  batting,
  wicket,
}) => {
  const batterRef = useRef(null);

  useEffect(() => {}, [strike]);

  const handleTog = (event) => {
    event.preventDefault();
    const i = Number(batterRef.current.value);
    dispatch(scoring({ i, type: inning[i], extra: null }));
    setStrike(i);
    setW(false);
    setStart(true);
  };

  return (
    <>
      <div className="relative">
        <form
          className="batter-select absolute left-12 top-16 z-30 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl"
          onSubmit={handleTog}
        >
          <h5 className="text-center font-semibold">New Batter</h5>
          <select required={true} ref={batterRef} className="form-select opt">
            {inning.map((player, i) => {
              if (!player.out || !player.playing) {
                return (
                  <option
                    className="opt"
                    key={i}
                    value={i}
                    disabled={i === nonStrike}
                  >
                    {inning[i].name}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBatter;
