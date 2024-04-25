// Conversation.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

function Convesation({ sendMessage }) {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  console.log("sendMessage",sendMessage);

  console.log("messages",messages);

  return (
    <div
      style={{
        overflowY: "auto",
        height: "calc(100vh - 180px)",
        padding: "10px",
      }}
    >
      {messages.map((message, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Convesation;
