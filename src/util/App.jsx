import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../router/Login";
import Home from "../router/Home";
import UserContextProvider from "../components/UserContextProvider";
import RequireAuth from "../components/RequireAuth";
import SignUp from "../router/SignUp";
import NotFound from "../router/NotFound";
import Layout from "../router/Layout";
import Notes from "../router/NoteList";
import CreateNote from "../router/CreateNote";
import EditNote from "../router/EditNote";
import ViewNote from "../router/ViewNote";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/create-note",
        element: <CreateNote />,
      },
      {
        path: "/edit-note/:id",
        element: <EditNote />,
      },
      {
        path: "/view-note/:id",
        element: <ViewNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  );
}
