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

  const handleWeight = (weightPounds: number) => {
    const stone = Math.floor(weightPounds / 14);
    const pounds = weightPounds % 14;
    return `${stone}st ${pounds}lbs `;
  };

  const handleHeight = (heightInches: number) => {
    const feet = Math.floor(heightInches / 12);
    const inches = heightInches % 12;
    return `${feet}' ${inches}" `;
  };

  const handleAge = (jsonDate:string) => {
    //https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
    const diff_ms = Date.now() - Date.parse(jsonDate);
    const age_dt = new Date(diff_ms);
    const birthdateFormatted = new Date(jsonDate).toISOString().split("T")[0];
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    return `${birthdateFormatted} (${age})`;
    
  }

  useEffect(() => {
    const getPlayers = async () => {
      const response = await axios.get<TeamPlayer[]>(
        `http://localhost:3000/players/${teamAbbreviation}`
      );
      const alphabetical = [...response.data].sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setPlayers(alphabetical);
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
                {handleWeight(player.weight)}({player.weight}lbs)
              </td>
              <td>
                {handleHeight(player.height)}({player.height}")
              </td>
              <td>{handleAge(player.dateOfBirth)}</td>
              <td>{player.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default TeamPlayers;
