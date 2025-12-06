import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TeamPlayers() {
  const { teamName, teamAbbreviation } = useParams<{
    teamName: string;
    teamAbbreviation: string;
  }>();

  interface TeamPlayer {
    id: number;
    teamid: number;
    firstName: string;
    lastName: string;
    fullName: string;
    displayName: string;
    weight: number;
    height: number;
    age: number;
    dateOfBirth: string;
    debutYear: number;
    birthPlacecity: string;
    birthPlacestate: string;
    birthPlacecountry: string;
    college: string;
    slug: string;
    headshothref: string;
    jersey: number;
    position: string;
    experience: number;
    teamAbbreviation: string;
    teamDisplayName: string;
  }

  const [players, setPlayers] = useState<TeamPlayer[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await axios.get<TeamPlayer[]>(
        `http://localhost:3000/players/${teamAbbreviation}`
      );
      console.log(response);
      console.log({ teamAbbreviation });
      const alphabetical = [...response.data].sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setPlayers(alphabetical);
      console.log(alphabetical);
    };

    getPlayers();
  }, [teamAbbreviation]);
  return (
    <>
      <h1>{teamName}</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Birthdate (age)</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.jersey}</td>
              <td>{player.displayName}</td>
              <td>{player.teamDisplayName}</td>
              <td>{player.position}</td>
              <td>
                {(() => {
                  const stone = Math.floor(player.weight / 14);
                  const pounds = player.weight % 14;
                  return `${stone}st ${pounds}lbs `;
                })()}
                ({player.weight}lbs)
              </td>
              <td>
                {(() => {
                  const feet = Math.floor(player.height / 12);
                  const inches = player.height % 12;
                  return `${feet}' ${inches}" `;
                })()}
                ({player.height}")</td>
              <td>{player.dateOfBirth}</td>
              <td>{player.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default TeamPlayers;
