import React from "react";

import wpweb from "../../assets/img/wpweb.png";
import LockIcon from "@mui/icons-material/Lock";

function Chat() {
  return (
    <>
      <div className="window">
        <div
          className="window1"
          style={{ marginTop: "-20px", textAlign: "center" }}
        >
          <img src={wpweb} className="window_img" alt="Not Found" 
          style={{width:"320px"}}/>

          <p className="download">Download App for Windows</p>

          <p
            style={{
              color: "#667781",
              fontSize: "18px",
              marginTop: "18px",
              lineHeight: "20px",
            }}
          >
            Make calls, share your screen and get a faster experience when you
            download the Windows app.
          </p>

          <button
            className="window_btn"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              lineHeight: " 1.1429",
              fontWeight: "500",
              paddingRight: "24px",
              background: "#008069",
              fontSize: "16px",
            }}
          >
            Get from Microsoft Store
          </button>

          <div className="lock">
            <LockIcon fontSize="small" />
            <p>Your personal messages are end-to-end encrypted </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
