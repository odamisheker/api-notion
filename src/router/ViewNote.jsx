import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Typography, IconButton } from "@mui/material";
import { UserContext } from "../components/UserContextProvider";
import { serverRequest } from "../util/App";

export default function ViewNote() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    serverRequest
      .getNote(id)
      .then((data) => {
        if (data.authorId === user.id) {
          setNote(data);
        } else {
          navigate("/notes");
        }
      })
      .catch((error) => console.error("Error fetching note: ", error));
  }, [id, user.id, navigate]);

  const handleEditNote = () => {
    navigate(`/edit-note/${id}`);
  };

  const handleDeleteNote = () => {
    serverRequest
      .deleteNote(id)
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Container className="mx-auto my-8 p-8 bg-white rounded-md shadow-md">
      <div className="flex justify-start items-center space-x-4 mb-6">
        <IconButton
          onClick={handleEditNote}
          aria-label="edit"
          className="text-gray-600 hover:text-gray-800"
        >
          ✍️
        </IconButton>
        <IconButton
          onClick={handleDeleteNote}
          aria-label="delete"
          className="text-red-500 hover:text-red-600"
        >
          🗑️
        </IconButton>
        <Link to="/notes" className="text-blue-500 hover:underline">
          Back to Notes
        </Link>
      </div>
      <Typography variant="h2" className="mb-4 text-blue-600 font-bold">
        {note.title}
      </Typography>
      <Typography variant="body1" className="whitespace-pre-wrap mb-4">
        {note.text}
      </Typography>
    </Container>
  );
}
