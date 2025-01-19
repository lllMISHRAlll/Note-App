import React from "react";

export default function RightPanel() {
  return (
    <div className="rightPanel">
      <img className="homeImage" src="./assets/homeImg.png" />
      <h1>Pocket Notes</h1>
      <p>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <div className="footer">
        <p>
          <img className="footerVector" src="./assets/FooterVector.png" />
          end-to-end encrypted
        </p>
      </div>
    </div>
  );
}
