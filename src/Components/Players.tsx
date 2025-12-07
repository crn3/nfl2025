import axios from "axios";
import { useEffect, useState } from "react";
import { handleAge, handleHeight, handleWeight } from "../utils/formatters";

interface Player {
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

function Players() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await axios.get<Player[]>(
        "http://localhost:3000/playersTeamNames"
      );

      //https://coderwall.com/p/ebqhca/javascript-sort-by-two-fields
      const ordered = [...response.data].sort((a, b) =>
        a.teamDisplayName.localeCompare(b.teamDisplayName) || a.lastName.localeCompare(b.lastName));
      setPlayers(ordered);
    };
    getPlayers();
  }, []);
  return (
    <>
      <h1>Players</h1>
      <hr />
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
export default Players;
