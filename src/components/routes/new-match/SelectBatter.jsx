import React, { useRef, useState } from "react";

const SelectBatter = ({
  inning,
  strike,
  nonStrike,
  setW,
  wicket,
  setStrike,
  setNonStrike,
  toggle,
  setToggle,
  dispatch,
  scoring,
  score,
}) => {
  const [tog, setTog] = useState(false);
  const strikeRef = useRef();
  const nonStrikeRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (nonStrike == "disabled") {
      alert("Select a player!");
      return;
    }
    dispatch(scoring({ i: nonStrike, type: inning[nonStrike] }));
    setToggle(true);
  };
  const handleStrike = () => {
    const i = Number(strikeRef.current.value);
    setStrike(i);
  };

  const handleNonStrike = () => {
    const i = Number(nonStrikeRef.current.value);
    setNonStrike(i);
  };

  const handleTog = (event) => {
    event.preventDefault();
    if (strike == "disabled") {
      alert("Select a player!");
      return;
    }
    dispatch(scoring({ i: strike, type: inning[strike] }));
    setW(false);
    setTog(true);
  };

  return (
    <>
      {!toggle && (
        <div className="relative">
          <div className="batter-select absolute left-12 top-16 z-40 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl">
            <h4 className="text-center">Batter</h4>
            {!tog ? (
              <form onSubmit={handleTog}>
                <select
                  ref={strikeRef}
                  onChange={handleStrike}
                  value={strike}
                  className="form-select opt"
                >
                  <option className="opt" value={"disabled"} disabled>
                    Select Striker
                  </option>
                  {Array.from({ length: inning.length }, (_, index) => (
                    <option
                      className="opt"
                      key={index}
                      value={index}
                      disabled={index == nonStrike}
                    >
                      {inning[index].name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-danger" type="submit">
                  Submit
                </button>
              </form>
            ) : wicket == 0 ? (
              <form onSubmit={handleSubmit}>
                <select
                  ref={nonStrikeRef}
                  onChange={handleNonStrike}
                  value={nonStrike}
                  className="form-select opt"
                >
                  <option className="opt" value={"disabled"} disabled>
                    Select Non Striker
                  </option>
                  {Array.from({ length: inning.length }, (_, index) => (
                    <option
                      className="opt"
                      key={index}
                      disabled={index == strike}
                      value={index}
                    >
                      {inning[index].name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </form>
            ) : (
              setToggle(true)
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectBatter;
