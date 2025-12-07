import Scoreboard from "./Scoreboard";
import { useGames } from "../hooks/useGames";

function CurrentWeek() {
  const { games } = useGames({ currentWeekOnly: true });

  return (
    <>
      <h1>Week {games[0]?.weekNumber}</h1>
      <Scoreboard games={games} />
    </>
  );
}
export default CurrentWeek;
