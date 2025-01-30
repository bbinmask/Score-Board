const whichTeam = (matchDetails, inn2Started, battingTeam, bowlingTeam) => {
  let teams = {
    battingTeam: null,
    bowlingTeam: null,
  };

  if (matchDetails.battingFirst == matchDetails.teams.team1) {
    if (inn2Started) {
      teams = {
        battingTeam: bowlingTeam,
        bowlingTeam: battingTeam,
      };
    } else {
      teams = {
        battingTeam: battingTeam,
        bowlingTeam: bowlingTeam,
      };
    }
  } else {
    if (inn2Started) {
      teams = {
        battingTeam: battingTeam,
        bowlingTeam: bowlingTeam,
      };
    } else {
      teams = {
        battingTeam: bowlingTeam,
        bowlingTeam: battingTeam,
      };
    }
  }
  return teams;
};

export default whichTeam;
