import React, { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogin() {
    const query = new URLSearchParams({
      email,
      password,
    }).toString();
    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          userContext.onChange(user);
          navigate("/");
          setError(null);
        } else {
          setError("Invalid user");
        }
      });
  }

  return (
    <div className="prose flex flex-col gap-5 m-auto mt-6">
      <h1>Login</h1>
      <input
        className="border-2 border-solid border-black rounded-xl pl-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="border-2 border-solid border-black rounded-xl pl-2"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>Login</button>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <Link to="/signup" className="no-underline ml-56">
          У вас нет аккаунта?
        </Link>
      </div>
    </div>
  );
}
