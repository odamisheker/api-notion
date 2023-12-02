import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { UserContext } from "../components/UserContextProvider";
import NoteForm from "../components/NoteForm";

export default function EditNote() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.authorId === user.id) {
          setNote(data);
          setTitle(data.title);
          setText(data.text);
        } else {
          navigate("/notes");
        }
      })
      .catch((error) => console.error("Error fetching note:", error));
  }, [id, user.id, navigate]);

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNoteData = await response.json();
      return updatedNoteData;
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleSaveNote = () => {
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedNote = {
        title: title.trim(),
        text: text.trim(),
        authorId: user.id,
        id: note.id,
        date: Date.now(),
      };

      updateNote(id, updatedNote).then((updatedNoteData) => {
        navigate(`/view-note/${id}`);
      });
    }
  };

  return (
    <Container className="prose mx-auto mt-2 p-7 bg-white rounded-md shadow-md">
      <Typography variant="h4" className="mb-4 text-blue-600 font-bold pb-5">
        Edit Note
      </Typography>
      <NoteForm
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        errors={errors}
        handleSaveNote={handleSaveNote}
      />
      <Link to="/notes" className="text-blue-500 no-underline pl-3">
        Back to Notes
      </Link>
    </Container>
  );
}
