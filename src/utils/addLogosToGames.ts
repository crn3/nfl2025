// takes in an array of games
// adds logos
// exports the updated array

import axios from "axios";
import { Game, GameWithLogos, Team } from "../interfaces/interfaces";

export function addTeamLogosToGames(games: Game[]): Promise<GameWithLogos[]> {
  return axios
    .get<Team[]>("http://localhost:3000/teams")
    .then((teamsResponse) => {
      const teams = teamsResponse.data;

      const teamLogoMap = new Map<number, string>(
        teams.map((team) => [team.teamID, team.teamLogo])
      );

      return games.map((game) => ({
        ...game,
        team1Logo: teamLogoMap.get(game.team1ID) ?? "",
        team2Logo: teamLogoMap.get(game.team2Id) ?? "",
      }));
    });
}
