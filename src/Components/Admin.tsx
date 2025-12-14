import { useHistory } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import Scoreboard from "./Scoreboard";

function Admin() {
  const { games } = useGames({ currentWeekOnly: false });
  const history = useHistory();

  const handleUpdate = (gameId: number) => {
    history.push(`/ScoreUpdate/${gameId}`);
  };

  return (
    <>
      <h1>Admin</h1>
      <hr />

      <Scoreboard
        games={games}
        addButton={(game) => (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleUpdate(game.id)}
          >
            Update
          </button>
        )}
      />
    </>
  );
}
export default Admin;
