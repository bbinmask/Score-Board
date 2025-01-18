const changeBowler = (list, id, limit) => {
  if (!id || !limit) {
    return list;
  }
  const bowlArray = list.filter(
    (bowler) => bowler.id != id && bowler.overs.over != limit,
  );

  return bowlArray;
};

export default changeBowler;
