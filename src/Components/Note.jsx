import React, { useState, useEffect } from "react";
import "./Note.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Note({ groupName, color, isInHeadPart }) {
  const [isSelected, setIsSelected] = useState(false);
  const formattedGroupName =
    groupName.charAt(0).toUpperCase() + groupName.slice(1);

  const userName = formattedGroupName.split(" ");
  const fnamePrefix = userName[0]?.[0]?.toUpperCase();
  const lnamePrefix = userName[1]?.[0]?.toUpperCase() || "";

  const safeColor = color || "#FFFFFF";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const selectedName = new URLSearchParams(location.search).get("name");
    if (selectedName === formattedGroupName) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [location.search, formattedGroupName]);

  const handleNameClick = () => {
    if (!isSelected) {
      navigate({
        pathname: "/viewnotes",
        search: `?name=${formattedGroupName}&color=${safeColor.replace(
          "#",
          ""
        )}`,
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={`noteContainer cursorPointer ${
        isInHeadPart ? "headpartNote" : ""
      } ${isSelected && !isInHeadPart ? "selectedNote" : ""}`}
      onClick={handleNameClick}
      title={`Open group ${formattedGroupName}`}
    >
      <div className="letterDisplay" style={{ backgroundColor: safeColor }}>
        <p>
          {fnamePrefix}
          {lnamePrefix}
        </p>
      </div>
      <div className="groupNameDisplay">
        <p>{formattedGroupName}</p>
      </div>
    </div>
  );
}
