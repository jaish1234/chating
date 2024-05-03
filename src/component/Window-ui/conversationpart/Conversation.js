import React from 'react';

const Conversation = () => {
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100vh - 180px)', padding: '10px' }}>
      {/* {messages.map((message, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p>{message.senderName}: {message.message}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Conversation;