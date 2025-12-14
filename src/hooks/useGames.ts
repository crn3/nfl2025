// returns an array of games
// either all games from all weeks
// or all games from the current week

import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentWeek, WeekInterface } from "../utils/getCurrentWeek";
import { Game, GameWithLogos, Team } from "../interfaces/interfaces";
import { addTeamLogosToGames } from "../utils/addLogosToGames";

interface UseGamesOptions {
  currentWeekOnly?: boolean; // true = for CurrentWeek.tsx
}

export function useGames({ currentWeekOnly = false }: UseGamesOptions = {}) {
  const [games, setGames] = useState<GameWithLogos[]>([]);

  useEffect(() => {
    // figure out what week it is
    axios
      .get<WeekInterface[]>("http://localhost:3000/weeks")
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
        return addTeamLogosToGames(gamesResponse.data); //helper function to attach logos
      })
      .then((gamesWithLogos) => {
        setGames(gamesWithLogos);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
      });
  }, [currentWeekOnly]);

  return { games };
}
