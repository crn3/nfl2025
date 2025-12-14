import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";

function ScoreDetail() {
  const { gameID } = useParams<{ gameID: string }>();
  const { game } = useGame(gameID);

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
