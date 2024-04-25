// Footer.js
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

function Footer({ sendMessage }) {
  const [message, setMessage] = useState("");
  const [inputIcon, setInputIcon] = useState(<InsertEmoticonIcon />);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessage(inputValue);

    if (inputValue.trim().length > 0) {
      setInputIcon(<SendIcon />);
    } else {
      setInputIcon(<KeyboardVoiceIcon />);
    }
  };

  const handleSendMessage = () => {
    if (message.trim().length === 0) return;

    sendMessage(message);

    setMessage("");
    setInputIcon(<InsertEmoticonIcon />);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          background: "#F0F2F5",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <TextField
            placeholder="Type a message"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px" }}
            onChange={handleInputChange}
            value={message}
          />
          <IconButton onClick={handleSendMessage}>{inputIcon}</IconButton>
        </div>
      </div>
    </div>
  );
}

export default Footer;
