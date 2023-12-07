import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export default function Layout() {
  const { onChange } = useContext(UserContext);

  const handleLogOut = () => {
    onChange(null);
    localStorage.clear();
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "grey" }}>
        <Toolbar>
          <Link
            onClick={handleLogOut}
            to="/"
            style={{
              marginLeft: "auto",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Typography variant="h6">Log out</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
