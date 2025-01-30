import React, { useEffect, useState } from "react";

const SelectBowler = ({
  setStart,
  TeamScore,
  setBowlingPrefs,
  bowlingPrefs,
  dispatch,
  SetBowlersList,
}) => {
  const {
    isWicket,
    isBowlerChange,
    isOverCompleted,
    wickets,
    currentBowler,
    overLimit,
    overs,
    ballsLeft,
  } = bowlingPrefs;

  const [selectedBowler, setSelectedBowler] = useState(null);

  const handleBowler = (event) => {
    const player = JSON.parse(event.target.value);
    setSelectedBowler(player);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedBowler == null) {
      alert("Select a bowler!");
      return;
    }
    if (selectedBowler !== null) {
      dispatch(SetBowlersList({ id: selectedBowler.id }));
      setSelectedBowler(null);
    }
    setStart(true);
    setBowlingPrefs({
      ...bowlingPrefs,
      isBowlerChange: false,
      currentBowler: selectedBowler,
    });
  };

  return (
    <>
      {isBowlerChange && (
        <div className="relative">
          <form
            className="batter-select absolute left-12 top-16 z-30 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl"
            onSubmit={handleSubmit}
          >
            <h5 className="py-2 text-center">Bowler</h5>
            <select
              defaultValue={""}
              required
              onChange={handleBowler}
              className="form-select opt"
            >
              <option className="opt" value={""} selected disabled>
                Select Bowler
              </option>
              {TeamScore.playersList.map((player, index) => {
                return (
                  <option
                    className="opt"
                    key={index}
                    value={JSON.stringify(player)}
                  >
                    {player.playerDetails.name}
                  </option>
                );
              })}
            </select>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SelectBowler;
