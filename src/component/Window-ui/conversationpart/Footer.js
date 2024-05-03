import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Footer = () => {
  // const [stompClient, setStompClient] = useState(null);
  // const [userData, setUserData] = useState({
  //   username: "",
  //   connected: false,
  //   message: "",
  // });
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   connect();
  // }, []);

  // const connect = () => {
  //   let socket = new SockJS("http://192.168.29.203:8080/ws");
  //   let client = Stomp.over(socket);
  //   client.connect({}, onConnected, onError);
  //   setStompClient(client);
  // };

  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true });
  //   if (stompClient) {
  //     stompClient.subscribe("/queue/messages", onMessageReceived);
  //   } else {
  //     console.error("Stomp client is null");
  //   }
  // };

  // const onError = (err) => {
  //   console.log(err);
  // };

  // const onMessageReceived = (message) => {
  //   const messageData = JSON.parse(message.body);
  //   displayMessage(messageData.senderId, messageData.content);
  // };

  // const sendMessage = () => {
  //   if (!stompClient) {
  //     console.error("Stomp client is not initialized.");
  //     return;
  //   }

  //   const { senderId, recipientId, content } = userData;
  //   stompClient.send(
  //     "/app/chat",
  //     {},
  //     JSON.stringify({
  //       userIds: [senderId, recipientId],
  //       messages: [{ senderId, content }],
  //     })
  //   );

  //   // Clear input field after sending message
  //   setUserData({ ...userData, message: "" });
  // };

  // const displayMessage = (senderId, content) => {
  //   setMessages([...messages, { senderId, content }]);
  // };

  // const handleMessageChange = (event) => {
  //   setUserData({ ...userData, message: event.target.value });
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     sendMessage();
  //   }
  // };

  // const handleUsernameChange = (event) => {
  //   setUserData({ ...userData, username: event.target.value });
  // };

  // const registerUser = () => {
  //   connect();
  // };

  return (
    <div className="footer">
      {/* {userData.connected ? ( */}
        <div>
          <input
            type="text"
            placeholder="Type a message..."
            // value={userData.message}
            // onChange={handleMessageChange}
            // onKeyPress={handleKeyPress}
          />
          <button 
          // onClick={sendMessage}
          >
            Send</button>
        </div>
      {/* ) : ( */}
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            // value={userData.username}
            // onChange={handleUsernameChange}
          />
          <button 
          // onClick={registerUser}
          >Connect</button>
        </div>
      {/* )} */}

      <div id="chat-messages" style={{ overflowY: "auto", maxHeight: "300px" }}>
        {/* {messages.map((message, index) => (
          <div key={index} className={message.senderId === userData.senderId ? "sender" : "recipient"}>
            <p>{message.senderId ? `${message.senderId}: ${message.content}` : message.content}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Footer;
