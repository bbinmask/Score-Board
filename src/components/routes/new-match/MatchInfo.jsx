const MatchInfo = ({ matchDetails }) => {
  return (
    <div className="match-info bg-slate-50 p-2">
      <div className="card w-full min-w-72 md:w-96">
        <div className="card-header font-semibold">Match Details</div>
        <ul className="list-group list-group-flush card-ul">
          <label htmlFor="">
            Players: <li className="list-group-item">{matchDetails.players}</li>
          </label>
          <label htmlFor="">
            Overs: <li className="list-group-item">{matchDetails.overs}</li>
          </label>
          <label htmlFor="">
            Limit: <li className="list-group-item">{matchDetails.limit}</li>
          </label>
        </ul>
      </div>
    </div>
  );
};

export default MatchInfo;
