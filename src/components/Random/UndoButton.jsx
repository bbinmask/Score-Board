const UndoButton = ({ handleUndo }) => {
  return (
    <div>
      <div className="flex gap-2">
        <button
          className="rounded-lg border-1 bg-blue-500 px-4 py-2 text-center text-base text-white"
          onClick={handleUndo}
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default UndoButton;
