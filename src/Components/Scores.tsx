import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
import { useGames } from "../hooks/useGames";
import { getCurrentWeek, WeekInterface } from "../utils/getCurrentWeek";
import axios from "axios";

function Scores() {
  const { games } = useGames({ currentWeekOnly: false });
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<WeekInterface[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<WeekInterface[]>("http://localhost:3000/weeks")
      .then((response) => {
        setWeeks(response.data);
        const currentWeek = getCurrentWeek(response.data);
        setCurrentWeek(currentWeek);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if theres no week selected, show all games
  // otherwise show games from the selected week
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
      <hr />
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((week) => (
              <li key={week}>
                <a href="#"
                  className={` ${
                    week == currentWeek ? "fw-bold" : ""
                  }`}
                  onClick={() => handleWeekClick(week)}
                >
                  {currentWeek == week ? `**Week ${week}**` : `Week ${week}`}
                </a>&nbsp;
                | &nbsp;
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <hr />
      <Scoreboard games={filteredGames} />
    </>
  );
}
export default Scores;
