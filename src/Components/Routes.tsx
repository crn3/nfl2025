import axios from "axios";
import { useRef, useState } from "react";

function Routes() {
  const [textarea, setTextArea] = useState("");
  const [textareaTitle, setTextAreaTitle] = useState("");

  const handleUpdateTextArea = async (url: string, routeName: string) => {
    setTextArea("");
    setTextAreaTitle("");
    const response = await axios.get(url);
    setTextArea(JSON.stringify(response.data, null, 2));
    setTextAreaTitle(routeName);
  };

  return (
    <>
      <h1>Routes</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Route</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Get venues</td>
            <td>
              <a href="http://localhost:3000/venues">/venues</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea(
                    "http://localhost:3000/venues",
                    "/venues"
                  )
                }
                id="venues"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
          <tr>
            <td>Get teams</td>
            <td>
              <a href="http://localhost:3000/teams">/teams</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea("http://localhost:3000/teams", "/teams")
                }
                id="teams"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
          <tr>
            <td>Get players</td>
            <td>
              <a href="http://localhost:3000/players">/players</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea(
                    "http://localhost:3000/players",
                    "/players"
                  )
                }
                id="players"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
          <tr>
            <td>Get players by team</td>
            <td>
              <a href="http://localhost:3000/players/KC">/players/KC</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea(
                    "http://localhost:3000/players/KC",
                    "/players/KC"
                  )
                }
                id="playersKC"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
          <tr>
            <td>Get scores</td>
            <td>
              <a href="http://localhost:3000/scores">/scores</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea(
                    "http://localhost:3000/scores",
                    "/scores"
                  )
                }
                id="scores"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
          <tr>
            <td>Get scores by week</td>
            <td>
              <a href="http://localhost:3000/scores/10">/scores/10</a>
            </td>
            <td>
              <button
                onClick={() =>
                  handleUpdateTextArea(
                    "http://localhost:3000/scores/10",
                    "/scores/10"
                  )
                }
                id="scores10"
                type="button"
                className="btn btn-primary"
              >
                Get
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <p>
        JSON response for route: <b>{textareaTitle}</b>
      </p>

      <textarea
        id="textarea"
        className="form-control"
        rows={20}
        cols={100}
        value={textarea}
        readOnly
      ></textarea>
    </>
  );
}
export default Routes;
