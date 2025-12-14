import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGame } from "../hooks/useGame";

function ScoreUpdate() {
  const { id } = useParams<{ id: string }>();
  const { game } = useGame(id);
  const [error, setError] = useState("");
  const history = useHistory();

  const [formData, setFormData] = useState({
    team1Qtr1Score: "",
    team1Qtr2Score: "",
    team1Qtr3Score: "",
    team1Qtr4Score: "",
    team2Qtr1Score: "",
    team2Qtr2Score: "",
    team2Qtr3Score: "",
    team2Qtr4Score: "",
  });

  const team1Score =
    (Number(formData.team1Qtr1Score) || 0) +
    (Number(formData.team1Qtr2Score) || 0) +
    (Number(formData.team1Qtr3Score) || 0) +
    (Number(formData.team1Qtr4Score) || 0);

  const team2Score =
    (Number(formData.team2Qtr1Score) || 0) +
    (Number(formData.team2Qtr2Score) || 0) +
    (Number(formData.team2Qtr3Score) || 0) +
    (Number(formData.team2Qtr4Score) || 0);

  useEffect(() => {
    if (!game) return;

    setFormData({
      team1Qtr1Score: game.team1Qtr1Score?.toString() || "",
      team1Qtr2Score: game.team1Qtr2Score?.toString() || "",
      team1Qtr3Score: game.team1Qtr3Score?.toString() || "",
      team1Qtr4Score: game.team1Qtr4Score?.toString() || "",
      team2Qtr1Score: game.team2Qtr1Score?.toString() || "",
      team2Qtr2Score: game.team2Qtr2Score?.toString() || "",
      team2Qtr3Score: game.team2Qtr3Score?.toString() || "",
      team2Qtr4Score: game.team2Qtr4Score?.toString() || "",
    });
  }, [game]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const t1Q1 = Number(formData.team1Qtr1Score) || 0;
    const t1Q2 = Number(formData.team1Qtr2Score) || 0;
    const t1Q3 = Number(formData.team1Qtr3Score) || 0;
    const t1Q4 = Number(formData.team1Qtr4Score) || 0;

    const t2Q1 = Number(formData.team2Qtr1Score) || 0;
    const t2Q2 = Number(formData.team2Qtr2Score) || 0;
    const t2Q3 = Number(formData.team2Qtr3Score) || 0;
    const t2Q4 = Number(formData.team2Qtr4Score) || 0;

    const updates = {
      team1Qtr1Score: t1Q1,
      team1Qtr2Score: t1Q2,
      team1Qtr3Score: t1Q3,
      team1Qtr4Score: t1Q4,
      team2Qtr1Score: t2Q1,
      team2Qtr2Score: t2Q2,
      team2Qtr3Score: t2Q3,
      team2Qtr4Score: t2Q4,
      team1Score: team1Score,
      team2Score: team2Score,
    };

    axios
      .post(`http://localhost:3000/scores/game/${id}`, updates)
      .then((response) => {
        console.log(response);
        history.push(`/scoreDetail/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  if (!game) return <div></div>;

  return (
    <>
      <h1>Match Result</h1>
      <hr />
      <div>{error}</div>
      <div className="d-flex flex-row">
        <img src={game.team1Logo} width="40"></img>
        <h6>{game.team1DisplayName}</h6>
      </div>

      <label>Score</label>
      <input
        disabled
        type="text"
        className="form-control"
        value={team1Score}
      ></input>
      <label>Q1</label>
      <input
        type="text"
        className="form-control"
        name="team1Qtr1Score"
        value={formData.team1Qtr1Score}
        onChange={handleChange}
      />
      <label>Q2</label>
      <input
        type="text"
        className="form-control"
        name="team1Qtr2Score"
        value={formData.team1Qtr2Score}
        onChange={handleChange}
      />
      <label>Q3</label>
      <input
        type="text"
        className="form-control"
        name="team1Qtr3Score"
        value={formData.team1Qtr3Score}
        onChange={handleChange}
      />
      <label>Q4</label>
      <input
        type="text"
        className="form-control"
        name="team1Qtr4Score"
        value={formData.team1Qtr4Score}
        onChange={handleChange}
      />

      <div className="d-flex flex-row">
        <img src={game.team2Logo} width="40"></img>
        <h6>{game.team2DisplayName}</h6>
      </div>

      <label>Score</label>
      <input
        disabled
        type="text"
        className="form-control"
        value={team2Score}
      ></input>
      <label>Q1</label>
      <input
        type="text"
        className="form-control"
        name="team2Qtr1Score"
        value={formData.team2Qtr1Score}
        onChange={handleChange}
      />
      <label>Q2</label>
      <input
        type="text"
        className="form-control"
        name="team2Qtr2Score"
        value={formData.team2Qtr2Score}
        onChange={handleChange}
      />
      <label>Q3</label>
      <input
        type="text"
        className="form-control"
        name="team2Qtr3Score"
        value={formData.team2Qtr3Score}
        onChange={handleChange}
      />
      <label>Q4</label>
      <input
        type="text"
        className="form-control"
        name="team2Qtr4Score"
        value={formData.team2Qtr4Score}
        onChange={handleChange}
      />

      <div>
        <button
          className="btn btn-warning"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
}
export default ScoreUpdate;
