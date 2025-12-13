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
  team1Qtr1Score: number;
  team1Qtr1ScorePeriod: number;
  team1Qtr2Score: number;
  team1Qtr2ScorePeriod: number;
  team1Qtr3Score: number;
  team1Qtr3ScorePeriod: number;
  team1Qtr4Score: number;
  team1Qtr4ScorePeriod: number;
  team2Id: number;
  team2DisplayName: string;
  team2Score: number;
  team2Qtr1Score: number;
  team2Qtr1ScorePeriod: number;
  team2Qtr2Score: number;
  team2Qtr2ScorePeriod: number;
  team2Qtr3Score: number;
  team2Qtr3ScorePeriod: number;
  team2Qtr4Score: number;
  team2Qtr4ScorePeriod: number;
}

export interface GameWithLogos extends Game {
  team1Logo: string;
  team2Logo: string;
}
export interface Standing {
  teamID: number;
  displayName: string;
  logo: string;
  w: number;
  l: number;
  t: number;
  pf: number;
  pa: number;
};