import { useEffect, useState } from "react";
import "./App.css";
import AddNoteModal from "./Components/AddNoteModal";
import LeftPanel from "./Components/LeftPanel";
import RightPanel from "./Components/RightPanel";
import ViewNotes from "./Components/ViewNotes";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [modalView, setModalView] = useState(false);
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 400px)").matches
  );

  const location = useLocation();

  useEffect(() => {
    const match = window.matchMedia("(max-width: 400px)");
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    match.addEventListener("change", handleResize);

    return () => {
      match.removeEventListener("change", handleResize);
    };
  }, []);

  const isViewingNotes = location.pathname === "/viewnotes";

  return (
    <div className="main">
      {(!isMobile || !isViewingNotes) && (
        <LeftPanel groups={groups} setModalView={setModalView} />
      )}
      <Routes>
        <Route path="/" element={<RightPanel />} />
        <Route
          path="/viewnotes"
          element={<ViewNotes groups={groups} setModalView={setModalView} />}
        />
      </Routes>
      {modalView && (
        <AddNoteModal
          addNote={(groupName, color) => {
            setGroups([...groups, { groupName, color }]);
            setModalView(false);
          }}
          setModalView={setModalView}
        />
      )}
    </div>
  );
}

export default App;
