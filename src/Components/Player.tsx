import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleWeight, handleHeight, handleAge } from "../utils/formatters";
import { Player as IPlayer } from "../interfaces/interfaces";

function Player() {
  const { id } = useParams<{ id: string }>();

  const [player, setPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    axios
      .get<IPlayer[]>(`http://localhost:3000/player/${id}`)
      .then((response) => {
        setPlayer(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!player) {
    return <p>No player info</p>; //error unless you account for player being null
  }

  return (
    <>
      <img src={player.headshothref} width="200" />
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
