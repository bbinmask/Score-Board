import { createSlice } from "@reduxjs/toolkit";

export const currentMatchSlice = createSlice({
  name: "currentMatch",
  initialState: {
    team1: {
      name: null,
      score: {
        balls: 0,
        runs: 0,
        wickets: 0,
        extras: {
          wide: 0,
          b: 0,
          lb: 0,
          nb: 0,
        },
        wicketsType: [{ batter: null, bowler: null }],
      },
      fieldingScore: {
        runs: 0,
        wickets: 0,
      },
      playersList: [
        // {
        //   id: null,
        //   playerDetails: {
        //     name: `Player 5`,
        //     position: "All-rounder",
        //     captain: false,
        //     wk: false,
        //   },
        //   batting: {
        //     out: false,
        //     playing: false,
        //     runs: 0,
        //     dots: 0,
        //     balls: 0,
        //     fours: 0,
        //     sixes: 0,
        //   },
        //   bowling: {
        //     playing: false,
        //     overs: 0,
        //     limit: 0,
        //     dots: 0,
        //     balls: 0,
        //     maidens: 0,
        //     runs: 0,
        //     wickets: 0,
        //   },
        //   fielding: {
        //     runOut: [{ name: null, id: null }],
        //     catchOut: [{ name: null, id: null }],
        //   },
        // },
      ],
      batting: [],
      bowling: [],
      fielding: [],
    },
    team2: {
      name: null,
      score: {
        balls: 0,
        runs: 0,
        wickets: 0,
        extras: {
          wide: 0,
          b: 0,
          lb: 0,
          nb: 0,
        },
        wicketsType: [{ batter: null, bowler: null }],
      },
      fieldingScore: {
        runs: null,
        wickets: null,
      },
      playersList: [],
      batting: [],
      bowling: [],
      fielding: [],
    },
    match: {
      overs: null,
      players: null,
      limit: null,
      customPlayer: null,
      isSeries: null,
      teams: { team1: null, team2: null },
      batting: null,
    },
    scoreNode: {},
  },
  reducers: {
    SetMatch: (state, action) => {
      const { overs, players, limit, customPlayer, isSeries, teams, batting } =
        action.payload;
      state.match.batting = batting;
      state.match.limit = limit;
      state.match.customPlayer = customPlayer;
      state.match.isSeries = isSeries;
      state.match.players = players;
      state.match.overs = overs;
      state.match.teams = teams;
      state.team1.name = teams.team1;
      state.team2.name = teams.team2;
    },
    SetTeam1Score: (state, action) => {
      const { data, extra, runs } = action.payload;
      if (data == "batting") {
        if (extra == "w") {
          state.team1.score.wickets++;
        } else if (extra == ("wd" || "nb")) {
          state.team1.score.runs += 1;
        }
        state.team1.score.runs += runs;
      } else if (data == "bowling") {
        if (extra == "w") {
          state.team1.fieldingScore.wickets++;
        }
        state.team1.fieldingScore.runs += runs;
      }
    },
    SetTeam2Score: (state, action) => {
      const { data, extra, runs } = action.payload;
      if (data == "batting") {
        if (extra == "w") {
          state.team2.score.wickets++;
        } else if (extra == ("wd" || "nb")) {
          state.team2.score.runs += 1;
        }
        state.team2.score.runs += runs;
      } else if (data == "bowling") {
        if (extra == "w") {
          state.team2.fieldingScore.wickets++;
        }
        state.team2.fieldingScore.runs += runs;
      }
    },

    SetTeam1BowlersList: (state, action) => {
      const { id } = action.payload;
      const alreadyAddedBowler = state.team1.bowling.find(
        (bowler) => bowler.id === id,
      );

      if (alreadyAddedBowler) {
        state.team1.bowling.forEach(
          (bowler) => (bowler.bowling.playing = bowler.id === id),
        );
      } else {
        const bowler = state.team1.playersList.find(
          (player) => player.id === id,
        );

        if (bowler) {
          // Add a new bowler with updated playing status
          const newBowler = {
            ...bowler,
            bowling: {
              ...bowler.bowling,
              playing: true,
            },
          };

          // Set playing to false for all current bowlers
          state.team1.bowling.forEach((bowler) => {
            bowler.bowling.playing = false;
          });

          // Add the new bowler to the bowling list
          state.team1.bowling.push(newBowler);
        }
      }
      state.team1.bowling.sort((a, b) => b.bowling.playing - a.bowling.playing);
    },
    SetTeam2BowlersList: (state, action) => {
      const { id } = action.payload;
      const alreadyAddedBowler = state.team2.bowling.find(
        (bowler) => bowler.id === id,
      );

      if (alreadyAddedBowler) {
        state.team2.bowling.forEach((bowler) => {
          bowler.bowling.playing = bowler.id === id;
        });
      } else {
        const bowler = state.team2.playersList.find(
          (player) => player.id === id,
        );

        if (bowler) {
          // Add a new bowler with updated playing status
          const newBowler = {
            ...bowler,
            bowling: {
              ...bowler.bowling,
              playing: true,
            },
          };

          // Set playing to false for all current bowlers
          state.team2.bowling.forEach((bowler) => {
            bowler.bowling.playing = false;
          });

          // Add the new bowler to the bowling list
          state.team2.bowling.push(newBowler);
        }
      }
      state.team2.bowling.sort((a, b) => b.bowling.playing - a.bowling.playing);
    },

    SetTeam1BowlerScore: (state, action) => {
      const { runs, extra, id } = action.payload;
      const bowler = state.team1.bowling.find((bowler) => bowler.id === id);
      // const player = state.inning1.find((player) => player.id === id);
      if (bowler) {
        if (extra === "b" || extra === "lb") {
          bowler.bowling.balls += 1;
          bowler.bowling.dotss += 1;
        } else if (extra == "wd") {
          bowler.bowling.balls += 0;
          bowler.bowling.runs += 1;
        } else if (extra == "nb") {
          bowler.bowling.runs += runs + 1;
        } else if (extra == "w") {
          bowler.bowling.balls += 1;
          bowler.bowling.wickets += 1;
          runs == 0
            ? (bowler.bowling.dots += 1)
            : (bowler.bowling.runs += runs);
        } else {
          if (runs == 0) {
            bowler.bowling.dots += 1;
            bowler.bowling.balls += 1;
          } else {
            bowler.bowling.runs += runs;
            bowler.bowling.balls += 1;
          }
        }

        if (bowler.bowling.balls === 6) {
          const currentBowler = state.team1.playersList.find(
            (bowler) => bowler.id == id,
          );
          if (currentBowler) {
            currentBowler.bowling.limit += 1;
          }
          bowler.bowling.overs += 1;
          bowler.bowling.balls = 0;
          bowler.bowling.limit += 1;
          if (bowler.bowling.dots === 6) {
            bowler.bowling.maidens += 1;
          }
          bowler.bowling.dots = 0;
        }
      }
    },

    SetTeam2BowlerScore: (state, action) => {
      const { runs, extra, id } = action.payload;

      const bowler = state.team2.bowling.find((bowler) => bowler.id === id);
      if (bowler) {
        if (extra === "b" || extra === "lb") {
          bowler.bowling.balls += 1;
          bowler.bowling.dots += 1;
        } else if (extra == "wd") {
          bowler.bowling.balls += 0;
          bowler.bowling.runs += 1;
        } else if (extra == "nb") {
          bowler.bowling.runs += runs + 1;
        } else if (extra == "w") {
          bowler.bowling.balls += 1;
          bowler.bowling.wicket += 1;
          runs == 0
            ? (bowler.bowling.dots += 1)
            : (bowler.bowling.runs += runs);
        } else {
          if (runs == 0) {
            bowler.bowling.dots += 1;
            bowler.bowling.balls += 1;
          } else {
            bowler.bowling.runs += runs;
            bowler.bowling.balls += 1;
          }
        }

        if (bowler.bowling.balls === 6) {
          const currentBowler = state.team2.playersList.find(
            (player) => player.id === id, // Correct the search scope
          );

          if (currentBowler) {
            currentBowler.bowling.limit += 1; // Safely update the limit
          }

          // Update bowler stats
          bowler.bowling.overs += 1;
          bowler.bowling.limit += 1; // Only update team2's bowler limit here
          bowler.bowling.balls = 0;

          if (bowler.bowling.dots === 6) {
            bowler.bowling.maidens += 1;
          }

          bowler.bowling.dots = 0; // Reset dots after updating maidens
        }
      }
    },

    SetTeam1BatterScore: (state, action) => {
      const { runs, id, extra } = action.payload;
      const player = state.team1.batting.find((player) => player.id === id);

      if (player) {
        if (extra == "b" || extra == "lb") {
          state.team1.score.runs += runs;
          state.team1.score.balls += 1;
          player.batting.balls += 1;
        } else if (extra == "wd") {
          state.team1.score.runs += 1;
        } else if (extra == "nb") {
          state.team1.score.runs += 1 + runs;
          player.batting.runs += runs;
          player.batting.balls += 1;
        } else if (extra == "w") {
          const batter = state.team1.playersList.find(
            (batter) => batter.id === id,
          );
          batter.batting.playing = false;
          batter.batting.out = true;
          batter.batting.outBy = "";
          state.team1.score.wickets += 1;
          state.team1.score.runs += runs;
          state.team1.score.balls += 1;
          player.batting.runs += runs;
          player.batting.balls += 1;
          player.batting.playing = false;
          player.batting.out = true;
        } else {
          state.team1.score.runs += runs;
          state.team1.score.balls += 1;
          player.batting.runs += runs;
          player.batting.balls += 1;
        }
        if (runs === 6) {
          player.batting.sixes += 1;
        } else if (runs === 4) {
          player.batting.fours += 1;
        }
      }
    },

    SetTeam2BatterScore: (state, action) => {
      const { runs, id, extra } = action.payload;
      const player = state.team2.batting.find((player) => player.id === id);

      if (player) {
        if (extra == "b" || extra == "lb") {
          state.team2.score.runs += runs;
          state.team2.score.balls += 1;
          player.batting.balls += 1;
        } else if (extra == "wd") {
          state.team2.score.runs += 1;
        } else if (extra == "nb") {
          state.team2.score.runs += 1 + runs;
          player.batting.runs += runs;
          player.batting.balls += 1;
        } else if (extra == "w") {
          const batter = state.team2.playersList.forEach((batter) => {
            if (batter.id === id) {
              batter.batting.playing = false;
              batter.batting.out = true;
              batter.batting.outBy = "";
            }
          });

          state.team2.score.wickets += 1;
          state.team2.score.runs += runs;
          state.team2.score.balls += 1;

          player.batting.runs += runs;
          player.batting.balls += 1;
          player.batting.playing = false;
          player.batting.out = true;
        } else {
          state.team2.score.runs += runs;
          state.team2.score.balls += 1;
          player.batting.runs += runs;
          player.batting.balls += 1;
        }
        if (runs === 6) {
          player.batting.sixes += 1;
        } else if (runs === 4) {
          player.batting.fours += 1;
        }
      }
    },
    SetTeam1BattersList: (state, action) => {
      const { id } = action.payload;
      const alreadyAddedBatter = state.team1.batting.find(
        (batter) => batter.id == id,
      );
      if (alreadyAddedBatter) {
        return;
      }
      const batter = state.team1.playersList.find((batter) => batter.id == id);
      batter.batting.playing = true;
      state.team1.batting.push(batter);
    },
    SetTeam2BattersList: (state, action) => {
      const { id } = action.payload;

      const alreadyAddedBatter = state.team2.batting.find(
        (batter) => batter.id == id,
      );
      if (alreadyAddedBatter) return;
      const batter = state.team2.playersList.find((batter) => batter.id === id);
      batter.batting.playing = true;
      state.team2.batting.push(batter);
    },
    SetInning1: (state, action) => {
      const { data, customPlayer } = action.payload;
      if (customPlayer) {
        state.team1.playersList = data;
      } else {
        state.team1.playersList.push(data);
      }
    },
    SetInning2: (state, action) => {
      const { data, customPlayer } = action.payload;

      if (customPlayer) {
        state.team2.playersList = data;
      } else {
        state.team2.playersList.push(data);
      }
    },
  },
});

export const {
  SetMatch,
  SetTeam1Score,
  SetTeam2Score,
  SetTeam1BowlersList,
  SetTeam2BowlersList,
  SetTeam1BattersList,
  SetTeam2BattersList,
  SetInning1,
  SetInning2,
  SetTeam1BatterScore,
  SetTeam2BatterScore,
  SetTeam1BowlerScore,
  SetTeam2BowlerScore,
} = currentMatchSlice.actions;

export default currentMatchSlice.reducer;
