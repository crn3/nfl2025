import { useEffect, useState } from "react";
import { getCurrentWeek, WeekInterface } from "../utils/getCurrentWeek";
import axios from "axios";
import { formatDate } from "../utils/formatters";
import { Game, GameWithLogos, Team } from "../interfaces/interfaces";
import Scoreboard from "./Scoreboard";


function CurrentWeek() {
  const [games, setGames] = useState<GameWithLogos[]>([]);

  useEffect(() => {
    const getAllData = async () => {
      // figure out what week it is
      const weeksResponse = await axios.get<WeekInterface[]>(
        "http://localhost:3000/weeks"
      );
      const weeks = weeksResponse.data;
      const currentWeek = getCurrentWeek(weeks);

      // get the week's games
      const gamesResponse = await axios.get<Game[]>(
        `http://localhost:3000/scores/${currentWeek}`
      );

      // get team data
      const teamsResponse = await axios.get<Team[]>(
        `http://localhost:3000/teams`
      );

      // get logo by id
      const getLogo = (teamId: number) =>
        teamsResponse.data.find((team) => team.teamID == teamId)?.teamLogo ??
        "";

      // include logos with game response
      const gamesWithLogos: GameWithLogos[] = gamesResponse.data.map(
        (game) => ({
          ...game,
          team1Logo: getLogo(game.team1ID),
          team2Logo: getLogo(game.team2Id),
        })
      );

      setGames(gamesWithLogos);
    };

    getAllData();
  }, []);

  return (
    <>
      <h1>Week {games[0]?.weekNumber}</h1>
      <Scoreboard games={games} />
    </>
  );
}
export default CurrentWeek;
