import { useEffect, useState } from "react";
import axios from "axios";
import { Game, GameWithLogos, Team } from "../interfaces/interfaces";
import { getCurrentWeek, WeekInterface } from "../utils/getCurrentWeek";
import Scoreboard from "./Scoreboard";

function Scores() {
  const [games, setGames] = useState<GameWithLogos[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameWithLogos[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  useEffect(() => {
    const getAllData = async () => {
        // get all weeks
        const weeksResponse = await axios.get<WeekInterface[]>(
          "http://localhost:3000/weeks"
        );
        const weeks = weeksResponse.data;
        const currentWeek = getCurrentWeek(weeks);

        // get all games
        const gamesResponse = await axios.get<Game[]>(
          `http://localhost:3000/scores`
        );

        // get team data
        const teamsResponse = await axios.get<Team[]>(
          "http://localhost:3000/teams"
        );

        //get logo by id
        const getLogo = (teamId: number) =>
          teamsResponse.data.find((team) => team.teamID === teamId)?.teamLogo ??
          "";

        // include logos in game responsse
        const gamesWithLogos: GameWithLogos[] = gamesResponse.data.map(
          (game) => ({
            ...game,
            team1Logo: getLogo(game.team1ID),
            team2Logo: getLogo(game.team2Id),
          })
        );

        setGames(gamesWithLogos);
        setFilteredGames(gamesWithLogos); // initially show all games
      
    };

    getAllData();
  }, []);

  const handleWeekClick = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    if (weekNumber === null) {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter((game) => game.weekNumber == weekNumber));
    }
  };

  return (
    <>
      <h1>Scores</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="contrainer-fluid">
        <ul className="navbar-nav me-auto nav-item">
        {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
          <li className="nav-item"><button
            key={week}
            className="btn btn-link"
            onClick={() => handleWeekClick(week)}>
            Week {week}
          </button>|</li>
        ))}
        </ul>
        </div>
      </nav>
      <Scoreboard games={filteredGames} />
    </>
  );
}
export default Scores;
