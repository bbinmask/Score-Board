import { createSlice } from "@reduxjs/toolkit";

export const currentMatchSlice = createSlice({
  name: "currentMatch",
  initialState: {
    team1Score: {
      score: {
        runs: 0,
        balls: 0,
        overs: 0,
        wicket: 0,
      },
      batting: [],
      bowling: [],
    },
    team2Score: {
      score: {
        runs: 0,
        balls: 0,
        overs: 0,
        wicket: 0,
      },
      batting: [],
      bowling: [],
    },
    inning1: [],
    inning2: [],
    match: {
      overs: null,
      players: null,
      limit: null,
      customPlayer: null,
      isSeries: null,
      teams: { team1: null, team2: null },
      batting: null,
    },
  },
  reducers: {
    matching: (state, action) => {
      const { overs, players, limit, customPlayer, isSeries, teams, batting } =
        action.payload;
      state.match.batting = batting;
      state.match.limit = limit;
      state.match.customPlayer = customPlayer;
      state.match.isSeries = isSeries;
      state.match.players = players;
      state.match.overs = overs;
      state.match.teams = teams;
    },
    team1Scoring: (state, action) => {
      const { i, type, extra } = action.payload;
      const player = state.inning1.find((player) => player.id === i);
      const played = state.team1Score.batting.find((p) => p.id === i);
      if (extra == null) {
        const updatedType = { ...type, status: true, playing: true };
        if (played) {
          return;
        }
        if (!player) {
          state.team1Score.batting.push(updatedType);
          state.team1Score.batting.sort((a, b) => a.status - b.status);
          return;
        } else {
          if (player) {
            player.status = true;
            player.playing = true;
          }

          state.team1Score.batting.push(updatedType);
          state.team1Score.batting.sort((a, b) => a.status - b.status);
        }
      } else if (extra) {
        if (player) {
          player.status = false;
          player.playing = false;
        }
      }
    },
    team2Scoring: (state, action) => {
      const { i, type, extra } = action.payload;
      const player = state.inning2.find((player) => player.id === i);
      const played = state.team2Score.batting.find((p) => p.id === i);
      if (extra == null) {
        const updatedType = { ...type, status: true, playing: true };
        if (played) {
          return;
        }
        if (player) {
          player.playing = true;
          player.status = true;
        }
        state.team2Score.batting.push(updatedType);
        state.team2Score.batting.sort((a, b) => a.status - b.status);
      } else if (extra) {
        if (player) {
          player.playing = false;
          player.status = false;
        }
      }
    },

    team1Bowling: (state, action) => {
      const { i, type } = action.payload;
      const bowler = state.team1Score.bowling.find((bowler) => bowler.id === i);
      const player = state.inning1.find((player) => player.id === i);
      if (bowler) {
        state.team1Score.bowling.forEach((b) => {
          if (b.id == bowler.id) {
            b.bowling = true;
          } else {
            b.bowling = false;
          }
        });
        state.inning1.forEach((b) => {
          if (b.id == player.id) {
            b.bowling = true;
          } else {
            b.bowling = false;
          }
        });
      } else {
        const newBowler = { ...type, bowling: true };
        state.team1Score.bowling.forEach((bowler) => {
          bowler.bowling = false;
        });
        state.inning1.forEach((player) => {
          player.bowling = false;
        });
        if (player) player.bowling = true;
        state.team1Score.bowling.push(newBowler);
      }
      state.team1Score.bowling.sort((a, b) => b.bowling - a.bowling);
    },

    team2Bowling: (state, action) => {
      const { i, type } = action.payload;
      const bowler = state.team2Score.bowling.find((bowler) => bowler.id === i);
      const player = state.inning2.find((player) => player.id === i);

      if (bowler) {
        state.team2Score.bowling.forEach((b) => {
          if (b == bowler) {
            b.bowling = true;
          } else {
            b.bowling = false;
          }
        });
        state.inning2.forEach((b) => {
          if (b.id == player.id) {
            b.bowling = true;
          } else {
            b.bowling = false;
          }
        });
      } else {
        const newBowler = { ...type, bowling: true };
        state.team2Score.bowling.forEach((bowler) => {
          bowler.bowling = false;
        });
        state.inning2.forEach((player) => {
          player.bowling = false;
        });
        if (player) player.bowling = true;

        state.team2Score.bowling.push(newBowler);
      }
      state.team2Score.bowling.sort((a, b) => b.bowling - a.bowling);
    },

    team1Bowlers: (state, action) => {
      const { runs, extra, id } = action.payload;
      const bowler = state.team1Score.bowling.find((b) => b.id === id);
      const player = state.inning1.find((player) => player.id === id);
      if (bowler) {
        if (extra === "b" || extra === "lb") {
          bowler.overs.balls += 1;
          bowler.overs.dot += 1;
        } else if (extra == "wd") {
          bowler.overs.balls += 0;
          bowler.overs.runs += 1;
        } else if (extra == "nb") {
          bowler.overs.runs += runs + 1;
        } else if (extra == "w") {
          bowler.overs.balls += 1;
          bowler.overs.wicket += 1;
          runs == 0 ? (bowler.overs.dot += 1) : (bowler.overs.runs += runs);
        } else {
          if (runs == 0) {
            bowler.overs.dot += 1;
            bowler.overs.balls += 1;
          } else {
            bowler.overs.runs += runs;
            bowler.overs.balls += 1;
          }
        }

        if (bowler.overs.balls === 6) {
          bowler.overs.over += 1;
          bowler.overs.limit -= 1;
          player.overs.limit -= 1;
          bowler.overs.balls = 0;
          if (bowler.overs.dot === 6) {
            bowler.overs.maiden += 1;
          }
          bowler.overs.dot = 0;
        }
      }
    },

    team2Bowlers: (state, action) => {
      const { runs, extra, id } = action.payload;

      const bowler = state.team2Score.bowling.find((b) => b.id === id);
      const b = state.team2Score.bowling.findIndex((b) => b.id === id);
      const player = state.inning2.find((player) => player.id === id);
      if (bowler) {
        if (extra === "b" || extra === "lb") {
          bowler.overs.balls += 1;
          bowler.overs.dot += 1;
        } else if (extra == "wd") {
          bowler.overs.balls += 0;
          bowler.overs.runs += 1;
        } else if (extra == "nb") {
          bowler.overs.runs += runs + 1;
        } else if (extra == "w") {
          bowler.overs.balls += 1;
          bowler.overs.wicket += 1;
          // runs == 0 ? (bowler.overs.dot += 1) : (bowler.overs.runs += runs);
        } else {
          if (runs == 0) {
            bowler.overs.dot += 1;
            bowler.overs.balls += 1;
          } else {
            bowler.overs.runs += runs;
            bowler.overs.balls += 1;
          }
        }

        if (bowler.overs.balls === 6) {
          bowler.overs.over += 1;
          bowler.overs.limit -= 1;
          player.overs.limit -= 1;
          bowler.overs.balls = 0;
          if (bowler.overs.dot === 6) {
            bowler.overs.maiden += 1;
          }
          bowler.overs.dot = 0;
        }
      }
    },

    team1Runs: (state, action) => {
      const { runs, id, extra } = action.payload;
      const player = state.team1Score.batting.find(
        (player) => player.id === id,
      );

      if (player) {
        if (extra == "b" || extra == "lb") {
          state.team1Score.score.runs += runs;
          state.team1Score.score.balls += 1;
          player.balls += 1;
        } else if (extra == "wd") {
          state.team1Score.score.runs += 1;
        } else if (extra == "nb") {
          state.team1Score.score.runs += 1 + runs;
          player.runs += runs;
          player.balls += 1;
        } else if (extra == "w") {
          state.team1Score.score.wicket += 1;
          state.team1Score.score.runs += runs;
          player.runs += runs;
          player.balls += 1;
          state.team1Score.score.balls += 1;
          player.status = false;
          player.playing = false;
          player.out = true;
        } else {
          state.team1Score.score.runs += runs;
          state.team1Score.score.balls += 1;
          player.runs += runs;
          player.balls += 1;
        }
        if (runs === 6) {
          player.sixes += 1;
        } else if (runs === 4) {
          player.fours += 1;
        }
      }
      if (state.team1Score.score.balls % 6 == 0) {
        state.team1Score.score.overs += 1;
      }
    },

    team2Runs: (state, action) => {
      const { runs, id, extra } = action.payload;
      const player = state.team2Score.batting.find(
        (player) => player.id === id,
      );

      if (player) {
        if (extra == "b" || extra == "lb") {
          state.team2Score.score.runs += runs;
          state.team2Score.score.balls += 1;
          player.balls += 1;
        } else if (extra == "wd") {
          state.team2Score.score.runs += 1;
        } else if (extra == "nb") {
          state.team2Score.score.runs += 1 + runs;
          player.runs += runs;
          player.balls += 1;
        } else if (extra == "w") {
          state.team2Score.score.wicket += 1;
          state.team2Score.score.runs += runs;
          player.runs += runs;
          player.balls += 1;
          state.team2Score.score.balls += 1;
          player.status = false;
          player.playing = false;
          player.out = true;
        } else {
          state.team2Score.score.runs += runs;
          state.team2Score.score.balls += 1;
          player.runs += runs;
          player.balls += 1;
        }
        if (runs === 6) {
          player.sixes += 1;
        } else if (runs === 4) {
          player.fours += 1;
        }
      }
      if (state.team2Score.score.balls % 6 == 0) {
        state.team2Score.score.overs += 1;
      }
    },

    setInning1: (state, action) => {
      const { type, id } = action.payload;

      if (id) {
        state.inning1 = type;
      } else {
        state.inning1.push(type);
      }
    },

    setInning2: (state, action) => {
      const { type, id } = action.payload;
      if (id) {
        state.inning2 = type;
      } else {
        state.inning2.push(type);
      }
    },

    setBatter: (state, action) => {},
  },
});

export const {
  matching,
  team1Scoring,
  team2Scoring,
  team1Bowling,
  team2Bowling,
  setInning1,
  setInning2,
  team1Runs,
  team2Runs,
  team1Bowlers,
  team2Bowlers,
} = currentMatchSlice.actions;

export default currentMatchSlice.reducer;
