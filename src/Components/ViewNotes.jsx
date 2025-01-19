import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Note from "./Note";
import AddedNotes from "./AddedNotes";

export default function ViewNotes() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const color = queryParams.get("color");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(name || "notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [text, setText] = useState("");
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );

  useEffect(() => {
    const match = window.matchMedia("(max-width: 500px)");
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    match.addEventListener("change", handleResize);

    return () => {
      match.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    setNotes(() => {
      const savedNotes = localStorage.getItem(name || "notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    });
  }, [name]);

  const handleAddNote = () => {
    if (text.trim() && name) {
      const timestamp = new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const updatedNotes = [...notes, { text: text.trim(), timestamp }];
      setNotes(updatedNotes);
      localStorage.setItem(name, JSON.stringify(updatedNotes));
      setText("");
    }
  };

  return (
    <div className="viewNotesPanel">
      <div className="headPart">
        {isMobile && (
          <button className="backButton" onClick={() => navigate("/")}>
            <img className="backButtonImg" src="/public/assets/arrow.png" />
          </button>
        )}
        {name && color && (
          <Note groupName={name} color={`#${color}`} isInHeadPart={true} />
        )}
      </div>
      <div className="bodyPart">
        {notes.map((note, index) => (
          <AddedNotes key={index} text={note.text} timestamp={note.timestamp} />
        ))}
      </div>
      <div className="footerPart">
        <button
          type="submit"
          className="cursorPointer"
          onClick={handleAddNote}
          disabled={!text.trim()}
        >
          <img
            className="vector2"
            src="assets/Vector2.png"
            alt="Add Note"
          />
        </button>
        <textarea
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddNote();
            }
          }}
          onChange={(e) => setText(e.target.value)}
          placeholder="Here’s the sample text for sample work"
        ></textarea>
      </div>
    </div>
  );
}
