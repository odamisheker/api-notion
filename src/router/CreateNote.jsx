import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { UserContext } from "../components/UserContextProvider";
import NoteForm from "../components/NoteForm";

export default function CreateNote() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCreateNote = () => {
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newNote = {
        title: title.trim(),
        text: text.trim(),
        date: Date.now(),
        authorId: user.id,
      };

      fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => response.json())
        .then((createdNote) => {
          navigate(`/view-note/${createdNote.id}`);
        })
        .catch((error) => console.error("Error creating note:", error));
    }
  };

  return (
    <Container>
      <Typography variant="h1">Create Note</Typography>
      <NoteForm
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        errors={errors}
        handleSaveNote={handleCreateNote}
      />
      <Link to="/notes" className="text-blue-500 no-underline pl-3">
        Back to Notes
      </Link>
    </Container>
  );
}
