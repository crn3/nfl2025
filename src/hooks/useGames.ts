import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentWeek, WeekInterface } from "../utils/getCurrentWeek";
import { Game, GameWithLogos, Team } from "../interfaces/interfaces";

interface UseGamesOptions {
  currentWeekOnly?: boolean; // true = for CurrentWeek.tsx
}

export function useGames({ currentWeekOnly = false }: UseGamesOptions = {}) {
  const [games, setGames] = useState<GameWithLogos[]>([]);

  useEffect(() => {
    // figure out what week it is
    axios.get<WeekInterface[]>("http://localhost:3000/weeks")
      .then((weeksResponse) => {
        const weeks = weeksResponse.data;
        const currentWeek = getCurrentWeek(weeks);

        // get current week's games or get all games
        const gamesUrl = currentWeekOnly
          ? `http://localhost:3000/scores/${currentWeek}`
          : `http://localhost:3000/scores`;

        return axios.get<Game[]>(gamesUrl);
      })
      .then((gamesResponse) => {
        const gamesData = gamesResponse.data;

        // get teams data
        return axios.get<Team[]>("http://localhost:3000/teams")
          .then((teamsResponse) => {
            const teams = teamsResponse.data;

            // get logo by id
            const getLogo = (teamId: number) =>
              teams.find((team) => team.teamID == teamId)?.teamLogo ?? "";

            // combine
            const gamesWithLogos: GameWithLogos[] = gamesData.map((game) => ({
              ...game,
              team1Logo: getLogo(game.team1ID),
              team2Logo: getLogo(game.team2Id),
            }));

            setGames(gamesWithLogos);
          });
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
      });
  }, [currentWeekOnly]);

  return { games };
}
