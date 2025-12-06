import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleWeight, handleHeight, handleAge } from "../utils/formatters";

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
}

function Player() {
  const { id } = useParams<{ id: string }>();

  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const getPlayer = async () => {
      const response = await axios.get<Player[]>(
        `http://localhost:3000/player/${id}`
      );
      setPlayer(response.data[0]);
    };

    getPlayer();
  }, [id]);

  if (!player) {
    return <p>No player info</p>; //error unless you account for player being null
  }

  return (
    <>
      <img src={player.headshothref} alt={player.fullName} width="200"/>
      <h1>{player.displayName} </h1>
      <p>{player.position}</p>

      <table className="table table-striped">
        <tbody>
          <tr>
            <td>Height / Weight</td>
            <td>
              {handleHeight(player.height)} / {handleWeight(player.weight)}
            </td>
          </tr>

          <tr>
            <td>Birthdate</td>
            <td>{handleAge(player.dateOfBirth)}</td>
          </tr>

          <tr>
            <td>College</td>
            <td>{player.college}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Player;
