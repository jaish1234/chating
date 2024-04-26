import React, { useState } from "react";
import Header from "./Header";
import Conversation from "./Conversation"; // Corrected typo in component name
import Footer from "./Footer";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Changed port to match the server port

function Chatting({ selectedData }) {
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages from the server
  socket.on("message", (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  });

  const sendMessageToConversation = (message) => {
    // Emit the message to the server
    socket.emit("message", message);
    setMessages([...messages, message]);
  };

  const logMessage = (message) => {
    console.log("Message typed:", message);
  };

  return (
    <div>
      <Header selectedData={selectedData} />
      <Conversation messages={messages} />
      <Footer sendMessage={sendMessageToConversation} logMessage={logMessage} />
    </div>
  );
}

export default Chatting;
