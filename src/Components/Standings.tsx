// pct = (Wins + 0.5xTies)/games played

interface TeamStanding {
    teamID: number;
    name: string;
    logo: string;
    wins: number;
    loses: number;
    ties: number;
    //pct: number;
    pf: number;
    pa: number;
    // pdiff: number;
}

// a TeamStanding interface for each team. standings is an array of TeamStandings
const standings: TeamStanding[] = []; 



// for each game in games
    // for team1
        // use scores.data[0].team1ID == team.id get team logo display name from team endpoint
        // if team1 score > team2 score
            // team1 team's wins += 1
        // else if team1 score < team2 score
            // team1 team's loses += 1
        // else if team1 score = team2 score
            // team1 team's ties += 1
        // team1 team's pf += team1 score
        // team1 team's pa += team2 score
        // team1 team's total games = wins + losses + ties
        // team1 team's pct = (team1 wins + .5*team1 ties)/team1 total games
        // team1 team's pdiff = pf - pa
    // for team 2
    // use scores.data[0].team2Id == team.id get team logo and display name from team endpoint
        // if team1 score < team2 score
                // team2 team's wins += 1
            // else if team1 score > team2 score
                // team2 team's loses += 1
            // else if team1 score = team2 score
                // team2 team's ties += 1
            // team2 team's pf += team2 score
            // team2 team's pa += team1 score
            // team2 team's total games = wins + losses + ties
            // team2 team's pct = (team1 wins + .5*team1 ties)/team1 total games
            // team2 team's pdiff = pf - pa



function Standings(){
return(
    <>
    <h1>Leeague Standings</h1>
    <hr />
    <table>
<thead>
    <tr>
        <th>#</th>
        <th>logo</th>
        <th>Name</th>
        <th>W</th>
        <th>L</th>
        <th>T</th>
        <th>PCT</th>
        <th>PF</th>
        <th>PA</th>
        <th>PDiff</th>
    </tr>
</thead>
    </table>
    </>

);
}
export default Standings;