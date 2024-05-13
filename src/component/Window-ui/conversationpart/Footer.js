import React, { useState, useEffect } from "react";

function Footer({ userProfile, selectedData, setUserData, userData, setReceivedMessages, stompClient }) {

  const sendMessage = (e) => {
    if (stompClient && userData.message.trim() !== "") {
      const message = {
        userIds: [userProfile?.userId, selectedData?.userId],
        messages: [
          { senderId: userProfile?.userId, content: userData?.message },
        ],
      };
      // console.log("message", message);
      // setReceivedMessages((prevMessages) => [
      //   ...prevMessages,
      //   { senderId: userProfile?.userId, content: userData.message },
      // ]);
      // displayMessage(userProfile?.userId, userData.message);

      stompClient.send(`/app/messages/${selectedData?.userId}`, {}, JSON.stringify(message));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  return (
    <div>
        <div>
          <div
            style={{
              overflowY: "scroll",
              height: "calc(88vh - 20px)",
              padding: "10px 0 10px 0",
            }}
          >
            <div id="chat-messages"></div>
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
