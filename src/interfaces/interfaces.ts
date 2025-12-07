export interface Team {
    teamID: number;
    teamLocation: string;
    teamName: string;
    teamAbbreviation: string;
    teamDisplayName: string;
    teamColor: string;
    teamVenueId: number;
    teamLogo: string;
  }

  export interface Player {
  id: number;
  teamid: number;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  weight: number;
  height: number;
  age: number;
  dateOfBirth: string;
  debutYear: number;
  birthPlacecity: string;
  birthPlacestate: string;
  birthPlacecountry: string;
  college: string;
  slug: string;
  headshothref: string;
  jersey: number;
  position: string;
  experience: number;
  teamAbbreviation: string;
  teamDisplayName: string;
}

  export interface Game {
  id: number;
  date: string;
  name: string;
  shortName: string;
  year: number;
  weekNumber: number;
  team1ID: number;
  team1DisplayName: string;
  team1Score: number;
  team2Id: number;
  team2DisplayName: string;
  team2Score: number;
}

export interface GameWithLogos extends Game {
  team1Logo: string;
  team2Logo: string;
}