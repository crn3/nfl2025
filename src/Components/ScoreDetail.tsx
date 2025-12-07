import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameWithLogos, Game, Team } from "../interfaces/interfaces";
import axios from "axios";

function ScoreDetail() {
  const { gameID } = useParams<{ gameID: string }>();
  const [game, setGame] = useState<GameWithLogos | null>(null);

  useEffect(() => {
    if (!gameID) return;

    // get the game data
    axios
      .get<Game[]>(`http://localhost:3000/scores/game/${gameID}`)
      .then((gameRes) => {
        const gameData = gameRes.data[0];
        if (!gameData) return;

        // get the logos
        axios.get<Team[]>("http://localhost:3000/teams").then((teamRes) => {
          const teams = teamRes.data;

          const getLogo = (id: number) =>
            teams.find((t) => t.teamID == id)?.teamLogo ?? "";

          // combine
          const gameWithLogos: GameWithLogos = {
            ...gameData,
            team1Logo: getLogo(gameData.team1ID),
            team2Logo: getLogo(gameData.team2Id),
          };

          setGame(gameWithLogos);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [gameID]);

  if (!game) return <div> </div>;
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={game.team2Logo} width="40" />
            </td>
            <td>{game.team2DisplayName}</td>
            <td>{game.team2Qtr1Score}</td>
            <td>{game.team2Qtr2Score}</td>
            <td>{game.team2Qtr3Score}</td>
            <td>{game.team2Qtr4Score}</td>
            <td>{game.team2Score}</td>
          </tr>
          <tr>
            <td>
              <img src={game.team1Logo} width="40" />
            </td>
            <td>{game.team1DisplayName}</td>
            <td>{game.team1Qtr1Score}</td>
            <td>{game.team1Qtr2Score}</td>
            <td>{game.team1Qtr3Score}</td>
            <td>{game.team1Qtr4Score}</td>
            <td>{game.team1Score}</td>
          </tr>
        </tbody>
      </table>
      <a href={`https://espn.com/nfl/recap?gameid=${gameID}`} target="_blank">
        Full report...
      </a>
    </>
  );
}
export default ScoreDetail;
