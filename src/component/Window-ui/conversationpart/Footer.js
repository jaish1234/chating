import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

function Footer() {
  const [message, setMessage] = useState("");
  const [inputIcon, setInputIcon] = useState(<InsertEmoticonIcon />);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessage(inputValue);

    // Change input icon based on input length
    if (inputValue.trim().length > 0) {
      setInputIcon(<SendIcon />);
    } else {
      setInputIcon(<KeyboardVoiceIcon />);
    }
  };

  const sendMessage = () => {
    if (message.trim().length === 0) return; // Don't send empty messages

    console.log("Sending message:", message);

    socket.emit("message", { text: message });

    setMessage("");
    // setInputIcon(<InsertEmoticonIcon />);
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
          <IconButton onClick={sendMessage}>{inputIcon}</IconButton>
        </div>
      </div>
    </div>
  );
}

export default Footer;
