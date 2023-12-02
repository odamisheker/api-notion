import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);

  const formattedDate = new Date(user.date).toLocaleDateString();
  return (
    <div className="container prose mx-auto mt-8 p-4 bg-white rounded-md shadow-md text-center">
      <h1 className="text-3xl font-bold  text-black">
        Hello, {user.email}
      </h1>
      <h2>About me</h2>
      <p className="mb-3 text-gray-600">Registration Date: {formattedDate}</p>
      <Link
        to="/notes"
        className="text-blue-500 no-underline transition duration-300 ease-in-out"
      >
        Go to Notes
      </Link>
    </div>
  );
}
