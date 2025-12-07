import axios from "axios";
import { useEffect, useState } from "react";
import { handleAge, handleHeight, handleWeight } from "../utils/formatters";
import { Player } from "../interfaces/interfaces";

function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {

    axios
    .get<Player[]>("http://localhost:3000/playersTeamNames")
    .then((response) => {
      //https://coderwall.com/p/ebqhca/javascript-sort-by-two-fields
      const ordered = [...response.data].sort((a, b) =>
        a.teamDisplayName.localeCompare(b.teamDisplayName) || a.lastName.localeCompare(b.lastName));
      setPlayers(ordered);
    }).catch((err) => {
        console.log(err);
      });
  }, []);

const playersFiltered = players.filter((player) => {
    return(
        player.displayName.toLowerCase().includes(searchInput.toLowerCase()) || 
        player.teamDisplayName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, []);

  return (
    <>
      <h1>Players</h1>
      <hr />
      <input type="text" 
      className="form-control" 
      id="input" 
      placeholder="Search name or team"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)} />
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
          {playersFiltered.map((player) => (
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
