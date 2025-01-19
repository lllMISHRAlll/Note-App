import React from "react";
import Note from "./Note";

export default function LeftPanel({ groups, setModalView }) {
  return (
    <div className="leftPanel">
      <h1>Pocket Notes</h1>
      <div className="notesDisplay">
        {groups.map((note, i) => (
          <Note key={i} groupName={note.groupName} color={note.color} />
        ))}
      </div>
      <button
        type="submit"
        className="addNewNote"
        onClick={() => {
          setModalView(true);
        }}
      >
        <img src="../public/assets/Group 24.png" />
      </button>
    </div>
  );
}
