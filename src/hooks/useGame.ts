// returns one game

import { useState, useEffect } from "react";
import axios from "axios";
import { GameWithLogos, Game } from "../interfaces/interfaces";
import { addTeamLogosToGames } from "../utils/addLogosToGames";

export function useGame(gameID: string | undefined) {
  const [game, setGame] = useState<GameWithLogos | null>(null);

  useEffect(() => {
    if (!gameID) return;

    axios
      .get<Game[]>(`http://localhost:3000/scores/game/${gameID}`)
      .then((response) => {
        const gameData = response.data;
        return addTeamLogosToGames(gameData).then((gamesWithLogos) => {
          return gamesWithLogos[0]; 
        });
      })
      .then((gameWithLogos) => {
        if (gameWithLogos) setGame(gameWithLogos);
      })
      .catch((err) => console.log(err));
  }, [gameID]);

  return { game };
}
