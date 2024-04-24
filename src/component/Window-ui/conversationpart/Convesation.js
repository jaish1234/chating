import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

function Conversation() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (messageText) => {
    // Send message to the server
    socket.emit("message", { text: messageText });
    
    // Add sent message to the conversation
    setMessages((prevMessages) => [...prevMessages, { text: messageText }]);
  };

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

export default Conversation;
