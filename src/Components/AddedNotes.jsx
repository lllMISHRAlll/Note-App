import React from "react";

export default function AddedNotes({ text, timestamp }) {
  return (
    <div className="AddedNotes">
      <p>{text}</p>
      <p className="timeStamp">{timestamp}</p>
    </div>
  );
}
