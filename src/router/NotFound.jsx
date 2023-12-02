import React from "react";
import { Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Typography variant="h1">404 - Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1">
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          Go back to the homepage
        </Link>
      </Typography>
    </Container>
  );
}