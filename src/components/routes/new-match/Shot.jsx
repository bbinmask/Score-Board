import UndoButton from "@/components/Random/UndoButton";
import React from "react";

const Shot = ({ handleExtra, handleShot, handleStrikeChange, handleUndo }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <button className="btn btn-danger m-2" onClick={handleStrikeChange}>
          change strike
        </button>
        <UndoButton handleUndo={handleUndo}></UndoButton>
      </div>
      <div className="shot-opt my-4 flex w-full flex-col justify-start gap-4 rounded-md bg-red-800 p-2 shadow-md shadow-black md:w-xl">
        <div className="extras flex w-full justify-evenly">
          <li className="flex list-none gap-2">
            <label className="" htmlFor="">
              Wd
            </label>
            <input
              type="radio"
              name="extra"
              className="form-check-input"
              value={"wd"}
              onClick={handleExtra}
            />
          </li>
          <li className="flex list-none gap-2">
            <label className="" htmlFor="">
              b
            </label>
            <input
              type="radio"
              name="extra"
              className="form-check-input"
              value={"b"}
              onClick={handleExtra}
            />
          </li>
          <li className="flex list-none gap-2">
            <label className="" htmlFor="">
              Lb
            </label>
            <input
              type="radio"
              name="extra"
              className="form-check-input"
              value={"lb"}
              onClick={handleExtra}
            />
          </li>
          <li className="flex list-none gap-2">
            <label className="" htmlFor="">
              W
            </label>
            <input
              type="radio"
              name="extra"
              className="form-check-input"
              value={"w"}
              onClick={handleExtra}
            />
          </li>
          <li className="flex list-none gap-2">
            <label className="" htmlFor="">
              Nb
            </label>
            <input
              type="radio"
              name="extra"
              className="form-check-input"
              value={"nb"}
              onClick={handleExtra}
            />
          </li>
        </div>
        <div className="runs flex h-10 w-full justify-evenly">
          <button className="shot btn btn-light" value={0} onClick={handleShot}>
            0
          </button>
          <button className="shot btn btn-light" value={1} onClick={handleShot}>
            1
          </button>
          <button value={2} className="shot btn btn-light" onClick={handleShot}>
            2
          </button>
          <button value={3} className="shot btn btn-light" onClick={handleShot}>
            3
          </button>
          <button value={4} className="shot btn btn-light" onClick={handleShot}>
            4
          </button>
          <button value={6} className="shot btn btn-light" onClick={handleShot}>
            6
          </button>
        </div>
      </div>
    </>
  );
};

export default Shot;
