import { useEffect, useState } from "react";
import { getCurrentWeek, WeekInterface } from "../utils/currentWeek";
import axios from "axios";
import { formatDate } from "../utils/formatters";

interface Game {
  id: number;
  date: string;
  name: string;
  shortName: string;
  year: number;
  weekNumber: number;
  //   attendance: number;
  //   venueId: number;
  //   venueName: string;

  team1ID: number;
  team1DisplayName: string;
  team1Score: number;

  team2Id: number;
  team2DisplayName: string;
  team2Score: number;
}

function CurrentWeek() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const weeksResponse = await axios.get<WeekInterface[]>(
        "http://localhost:3000/weeks"
      );
      const weeks = weeksResponse.data;

      const currentWeek = getCurrentWeek(weeks);
      if (!currentWeek) return;

      const gamesResponse = await axios.get<Game[]>(
        `http://localhost:3000/scores/${currentWeek}`
      );
      setGames(gamesResponse.data);
    };
    getGames();
  }, []);
  return (
    <>
      <h1>Week {games[0]?.weekNumber}</h1>
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
              <td></td>
              <td>{game.team1DisplayName}</td>
              <td>
                {game.team1Score}-{game.team2Score}
              </td>
              <td>{game.team2DisplayName}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default CurrentWeek;
