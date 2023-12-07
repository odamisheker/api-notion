import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Typography, Container } from "@mui/material";
import { serverRequest } from "../util/App";

export default function Notes() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleViewNote = (noteId) => {
    navigate(`/view-note/${noteId}`);
  };

  const handleEdit = (noteId, e) => {
    e.stopPropagation();
    navigate(`/edit-note/${noteId}`);
  };

  useEffect(() => {
    serverRequest
      .getNotes(user.id)
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes: ", error));
  }, [user.id]);

  const handleDeleteNote = (noteId, e) => {
    e.stopPropagation();

    serverRequest.deleteNote(noteId).then(() => {
      serverRequest
        .getNotes(user.id)
        .then((data) => setNotes(data))
        .catch((error) => console.error("Error deleting note:", error));
    });
  };

  const sortedNotes = notes.sort((a, b) => b.date - a.date);

  return (
    <Container className="mx-auto my-7">
      <Link
        to="/"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Back
      </Link>
      <Typography variant="h1" className="text-2xl pt-5 font-bold">
        Notes
      </Typography>
      <Link
        to="/create-note"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Create a new note
      </Link>
      <div className="mt-6">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-300 p-4 my-4 rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-lg cursor-pointer"
            onClick={() => handleViewNote(note.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1 overflow-scroll">
                <Typography variant="h5" className="text-xl font-semibold">
                  {note.title}
                </Typography>
              </div>
              <Typography variant="body1" className="text-gray-600">
                Created on: {new Date(note.date).toLocaleDateString()}
              </Typography>
            </div>
            <div className="flex justify-end items-center space-x-2">
              <IconButton
                onClick={(e) => handleDeleteNote(note.id, e)}
                aria-label="delete"
                className="text-red-500 hover:text-red-600"
              >
                🗑️
              </IconButton>
              <IconButton
                onClick={(e) => handleEdit(note.id, e)}
                aria-label="edit"
                className="text-gray-500 hover:text-gray-600"
              >
                ✍️
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
