import { formatDate } from "../utils/formatters";
import { GameWithLogos } from "../interfaces/interfaces"

interface ScoreboardProps {
    games: GameWithLogos[];
}

export default function Scoreboard ({games} : ScoreboardProps) {
    return (
        <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Game</th>
            <th></th>
            <th></th>
            <th>Score</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.weekNumber}</td>
              <td>{formatDate(game.date)}</td>
              <td>{game.shortName}</td>
              <td><img src={game.team1Logo} width="30"/></td>
              <td>{game.team1DisplayName}</td>
              <td>
                {game.team1Score}-{game.team2Score}
              </td>
              <td>{game.team2DisplayName}</td>
              <td><img src={game.team2Logo} width="30"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

    );
}