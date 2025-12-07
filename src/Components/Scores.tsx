import { useState } from "react";
import Scoreboard from "./Scoreboard";
import { useGames } from "../hooks/useGames";

function Scores() {
  const { games } = useGames({ currentWeekOnly: false });
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const filteredGames =
    selectedWeek == null
      ? games
      : games.filter((game) => game.weekNumber == selectedWeek);

  const handleWeekClick = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
  };

  return (
    <>
      <h1>Scores</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="contrainer-fluid">
          <ul className="navbar-nav me-auto nav-item">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
              <li className="nav-item" key={week}>
                <button
                  className="btn btn-link"
                  onClick={() => handleWeekClick(week)}
                >
                  Week {week}
                </button>
                |
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Scoreboard games={filteredGames} />
    </>
  );
}
export default Scores;
