import React, { useState, useEffect } from "react";

const NewBowler = ({
  setBowler,
  setOvers,
  setStart,
  inning,
  bowler,
  overs,
  match,
  dispatch,
  scoring,
  setChangeBowler,
}) => {
  const [toggle, setToggle] = useState(false);

  const [selectedBowler, setSelectedBowler] = useState(null);

  const handleBowler = (event) => {
    const i = Number(event.target.value);
    setSelectedBowler(i);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedBowler !== null) {
      dispatch(scoring({ i: selectedBowler, type: inning[selectedBowler] }));
      if (overs) {
        setBowler(overs);
      }
      setOvers({ id: selectedBowler, limit: match.limit });
      setSelectedBowler(null);
    }
    setToggle(true);
    setStart(true);
    setChangeBowler(false);
  };

  useEffect(() => {
    if (overs) {
      setBowler(overs);
    }
  }, [overs, setBowler, inning]);

  return (
    <>
      {!toggle && (
        <div className="relative">
          <form
            className="batter-select absolute left-12 top-16 z-30 h-72 w-80 rounded-md bg-slate-50 p-2 shadow-3xl"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center">Bowler</h4>
            <select
              required
              onChange={handleBowler}
              className="form-select opt"
              defaultValue={"disabled"}
            >
              <option className="opt" value={"disabled"} disabled>
                Select Bowler
              </option>
              {inning.map((player, index) => {
                if (player.overs.limit == 0) {
                  return;
                } else {
                  return (
                    <option
                      className="opt"
                      key={index}
                      value={index}
                      disabled={index === (overs ? bowler.id : -1)}
                    >
                      {player.name}
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
