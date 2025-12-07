import { useEffect, useState } from "react";
//import logos from "../assets/logos/";
import axios from "axios";
import { Link } from "react-router-dom";
import { Team } from "../interfaces/interfaces";

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  //   https://vite.dev/guide/features#glob-import
  //   const logos = import.meta.glob("../assets.logos/*.png",
  //     {as: "url", query: "?url", import: "default", eager: true, } )

  useEffect(() => {
    axios
      .get<Team[]>("http://localhost:3000/teams")
      .then((response) => {
        const alphabetical = [...response.data].sort((a, b) =>
          a.teamDisplayName.localeCompare(b.teamDisplayName)
        );
        setTeams(alphabetical);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Abr</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamID}>
              <td>
                {/* <img
  src={new URL(`../assets/logos/${team.teamAbbreviation}.png`, import.meta.url).href} 
  style={{ width: "40px" }} ???????????
  
/> */}
                <img src={team.teamLogo} width={"40px"} />
              </td>
              <td>
                <Link
                  to={`/teamPlayers/${encodeURIComponent(
                    team.teamDisplayName
                  )}/${team.teamAbbreviation}`}
                >
                  {team.teamDisplayName}
                </Link>
              </td>
              <td>{team.teamAbbreviation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Teams;
