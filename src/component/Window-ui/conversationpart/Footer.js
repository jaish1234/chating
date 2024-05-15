import React, { useState, useEffect } from "react";

function Footer({ userProfile, selectedData, setUserData, userData, receivedMessages, setReceivedMessages, stompClient }) {

  const [message, setMessage] = useState("");

  console.log("r+e+c+i+v+e+r+m+e+s+s+a+g+e", receivedMessages);
  const sendMessage = (e) => {
    e.preventDefault();
    if (stompClient && userData.message.trim() !== "") {  
      const message = {
        userIds: [userProfile?.userId, selectedData?.userId],
        messages: [
          { senderId: userProfile?.userId, content: userData?.message },
        ],
      };
      console.log("message", message);
      // setReceivedMessages((prevMessages) => [
      //   ...prevMessages,
      //   { senderId: userProfile?.userId, content: userData.message },
      // ]);
      // displayMessage(userProfile?.userId, userData.message);
      // console.log("recivermessage yfgewyugyugtuigiuy", receivedMessages);

      stompClient.send(`/app/messages/${selectedData?.userId}`, {}, JSON.stringify(message));
      const updatedMessages = [...receivedMessages, { senderId: userProfile?.userId, content: userData.message }];
      setReceivedMessages(updatedMessages);

      setUserData({ ...userData, message: "" });
    }
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
    setMessage(event.target.value);
  };

  return (
    <div>
        <div>
          <div
          id="chat-messages"
          style={{
            overflowY: "scroll",
            height: "calc(88vh - 20px)",
            padding: "10px 0 10px 0",
          }}
        >
          {/* Display messages */}
          {receivedMessages.map((msg, index) => (
            <div key={index}>
              {msg.senderId}: {msg.content}
            </div>
          ))}
        </div>
          <div className="input-container">
            <input
              type="text"
              id="content"
              placeholder="Type your message..."
              value={userData.message}
              onChange={handleMessageChange}
            />
            <button onClick={(e) => sendMessage(e)}>Send</button>
          </div>
        </div>
    </div>
  );
}

export default Footer;
