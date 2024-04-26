import React from 'react';

function Conversation({ messages }) {
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