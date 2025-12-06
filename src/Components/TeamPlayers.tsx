import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { handleWeight, handleHeight, handleAge } from "../utils/formatters";

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
  
  function TeamPlayers() {
  const { teamName, teamAbbreviation } = useParams<{
    teamName: string;
    teamAbbreviation: string;
  }>();

  

  const [players, setPlayers] = useState<TeamPlayer[]>([]);

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
              <td><Link to={`/player/${player.id}`}>{player.displayName}</Link></td>
              <td>{player.teamDisplayName}</td>
              <td>{player.position}</td>
              <td>{handleWeight(player.weight)}</td>
              <td>{handleHeight(player.height)}</td>
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
