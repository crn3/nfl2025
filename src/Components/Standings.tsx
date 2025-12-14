import { useEffect, useState } from "react";
import { Game, Standing, Team } from "../interfaces/interfaces";
import axios from "axios";

// put each team into an array
const getTeam = (
  standings: Standing[],
  teamID: number,
  displayName: string,
  logo: string
) => {
  let team = standings.find((t) => t.teamID === teamID);
  //for every team id found in games, find if there's a team with that id in teams
  //if it isn't already in the array, add it

  if (!team) {
    team = {
      teamID,
      displayName,
      logo,
      w: 0,
      l: 0,
      t: 0,
      pf: 0,
      pa: 0,
    };
    standings.push(team);
  }

  return team;
};

function Standings() {
  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    // allows 1+ requests
    Promise.all([
      axios.get<Game[]>("http://localhost:3000/scores"),
      axios.get<Team[]>("http://localhost:3000/teams"),
    ]).then(([gameResponse, teamResponse]) => {
      const games = gameResponse.data;
      const teams = teamResponse.data;
      const table: Standing[] = [];

      const getLogo = (id: number) =>
        teams.find((t) => t.teamID == id)?.teamLogo ?? ""; //won't crash if undefined

      games.forEach((game) => {
        const team1 = getTeam(
          table,
          game.team1ID,
          game.team1DisplayName,
          getLogo(game.team1ID)
        );
        const team2 = getTeam(
          table,
          game.team2Id,
          game.team2DisplayName,
          getLogo(game.team2Id)
        );

        team1.pf += game.team1Score;
        team1.pa += game.team2Score;
        team2.pf += game.team2Score;
        team2.pa += game.team1Score;

        if (game.team1Score > game.team2Score) {
          team1.w += 1;
          team2.l += 1;
        } else if (game.team1Score < game.team2Score) {
          team2.w += 1;
          team1.l += 1;
        } else if (game.team1Score == game.team2Score) {
          team1.t += 1;
          team2.t += 1;
        }
      });
      setStandings(table);
    });
  }, []);
  return (
    <>
      <h1>League Standings</h1>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Name</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>PCT</th>
            <th>PF</th>
            <th>PA</th>
            <th>PDiff</th>
          </tr>
        </thead>
        <tbody>
          {standings
            .sort((a, b) => {
              const totalGamesA = a.w + a.l + a.t;
              const totalGamesB = b.w + b.l + b.t;

              const pctA = totalGamesA ? (a.w + 0.5 * a.t) / totalGamesA : 0;
              const pctB = totalGamesB ? (b.w + 0.5 * b.t) / totalGamesB : 0;

              if (pctB !== pctA) {
                return pctB - pctA;
              } //sort by pct first

              const pdiffA = a.pf - a.pa;
              const pdiffB = b.pf - b.pa;

              return pdiffB - pdiffA; //sort by pdiff second
            })

            .map((team, index) => {
              const games = team.w + team.l + team.t;
              const pct = games ? (team.w + 0.5 * team.t) / games : 0;
              const pdiff = team.pf - team.pa;

              return (
                <tr key={team.teamID}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={team.logo} alt="" width={24} />{" "}
                  </td>
                  <td>{team.displayName}</td>
                  <td>{team.w}</td>
                  <td>{team.l}</td>
                  <td>{team.t}</td>
                  <td>{pct.toFixed(3)}</td>
                  <td>{team.pf}</td>
                  <td>{team.pa}</td>
                  <td>{pdiff}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default Standings;
