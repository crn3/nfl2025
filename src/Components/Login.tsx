import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface Props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setLoggedIn }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data;

        const user = users.find(
          (u: { email: string; password: string }) =>
            u.email == username && u.password == password
        );

        console.log(user);

        if (user) {
          localStorage.setItem("loggedIn", "true");
          setLoggedIn(true);
          history.push("/admin"); // note lowercase path to match your routes
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error connecting to server");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-danger mb-3">{error}</div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
