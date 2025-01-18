const playersToBat = (allPlayers) => {
  let temp = [];
  allPlayers.map((player) => {
    if (player.status == "out" || player.status == "playing") {
    } else {
      temp.push(player);
    }
  });

  return temp;
};

export default playersToBat;
