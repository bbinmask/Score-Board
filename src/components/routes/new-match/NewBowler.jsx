import React, { useState } from "react";

const NewBowler = ({
  Team,
  setBowlingPrefs,
  SetBowlersList,
  bowlingPrefs,
  setStart,
  dispatch,
  matchDetails,
}) => {
  const [toggle, setToggle] = useState(false);

  const [selectedBowler, setSelectedBowler] = useState(null);

  const handleBowler = (event) => {
    const bowler = JSON.parse(event.target.value);
    setSelectedBowler(bowler);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedBowler !== null) {
      dispatch(SetBowlersList({ id: selectedBowler.id }));
      setBowlingPrefs({
        ...bowlingPrefs,
        currentBowler: selectedBowler,
        isBowlerChange: false,
      });
      setSelectedBowler(null);
      setToggle(true);
      setStart(true);
    } else {
      return alert("Select a bowler!");
    }
  };
  return (
    <>
      {!toggle && (
        <div className="relative">
          <form
            className="batter-select absolute left-12 top-16 z-30 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center">New Bowler</h4>
            <select
              required
              onChange={handleBowler}
              className="form-select opt"
              defaultValue={""}
            >
              <option className="opt" value={""} selected disabled>
                Select Bowler
              </option>
              {Team.playersList.map((player, index) => {
                console.log(player);
                if (
                  index === bowlingPrefs.currentBowler.id ||
                  player.bowling.limit === matchDetails.limit
                ) {
                  return;
                } else {
                  return (
                    <option
                      className="opt"
                      key={index}
                      value={JSON.stringify(player)}
                      disabled={player.bowling.limit === matchDetails.limit}
                    >
                      {player.playerDetails.name}
                    </option>
                  );
                }
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

export default NewBowler;
