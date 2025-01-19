import React, { useEffect, useRef, useState } from "react";
import ColorButton from "./ColorButton";
import "./AddNoteModal.css";

export default function AddNoteModal({ setModalView, addNote }) {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const [selectedColor, setSelectedColor] = useState("");
  const [groupName, setGroupName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCreate = () => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];

    if (savedGroups.some((group) => group.groupName === groupName.trim())) {
      alert("Group name already exists.");
      return;
    }

    if (!groupName.trim()) {
      alert("Group name is required.");
      return;
    }

    if (!selectedColor) {
      alert("Select a Color");
      return;
    }

    addNote(groupName, selectedColor);
    setGroupName("");
    setSelectedColor(colors[0]);
    setModalView(false);
  };

  const handleModalClick = () => {
    setModalView(false);
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modalBg" onClick={handleModalClick}>
      <div className="modalContainer" onClick={handleContainerClick}>
        <div className="headingTxt">
          <h2>Create New Group</h2>
        </div>
        <div className="groupName">
          <p>Group Name</p>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="chooseColour">
          <p>Choose Colour</p>
          <div className="colourOptions">
            {colors.map((color, index) => (
              <ColorButton
                key={index}
                color={color}
                isSelected={selectedColor === color}
                onSelect={setSelectedColor}
              />
            ))}
          </div>
        </div>
        <div className="btnContainer">
          <button
            type="button"
            className="createSubmit"
            onClick={handleCreate}
            disabled={!groupName.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
