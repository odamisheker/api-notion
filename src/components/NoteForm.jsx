import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function NoteForm({
  title,
  setTitle,
  text,
  setText,
  errors,
  handleSaveNote,
}) {
  return (
    <>
      <TextField
        label="Note Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
      />
      <div className="pb-5"></div>
      <TextField
        label="Note Body"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="pb-5"></div>
      <Button
        variant="contained"
        color="primary"
        className=""
        onClick={handleSaveNote}
      >
        Save
      </Button>
    </>
  );
}
