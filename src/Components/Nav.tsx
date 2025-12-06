import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logos/nfl.png";
import { useEffect, useState } from "react";

function Nav() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") == "true"
  );

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    history.push("/routes");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/routes" className="navbar-brand">
          <img src={logo} style={{ width: "60px", borderRadius: "0px" }} />
        </Link>

        <ul className="navbar-nav me-auto nav-item">
          <li>&nbsp;
            <Link to="/routes">Routes</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/venues">Venues</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/teams">Teams</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/players">Players</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/currentWeek">Current Week</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/scores">Scores</Link> |
          </li>

          <li className="nav-item">&nbsp;
            <Link to="/standings">Standings</Link> |
          </li>

          {loggedIn ? (
            <>
              <li className="nav-item">&nbsp;
                <Link to="/admin">Admin</Link> |
              </li>
              <li className="nav-item">&nbsp;
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>{" "}
              |
            </>
          ) : (
            <li className="nav-item">&nbsp;
              <Link to="/login">Login</Link> |
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
