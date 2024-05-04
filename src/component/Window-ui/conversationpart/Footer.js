import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Footer({ userProfile }) {
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
  });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (userData.connected) {
      const socket = new SockJS("http://192.168.29.203:8080/ws");
      const stomp = Stomp.over(socket);
      stomp.connect({}, () => {
        setStompClient(stomp);
        stomp.subscribe("/queue/messages", onMessageReceived);
      });
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userData.connected]);

  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setReceivedMessages((prevMessages) => [
      ...prevMessages,
      { username: receivedMessage.username, text: receivedMessage.text },
    ]);
  };

  const sendMessage = () => {
    if (stompClient && userData.message.trim() !== "") {
      const message = {
        username: userProfile?.username,
        text: userData.message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUserName = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const connectWebSocket = () => {
    setUserData({ ...userData, connected: true });
  };

  return (
    <div>
      {userData.connected ? (
        <div>
          <div>
            <ul>
              {receivedMessages.map((msg, index) => (
                <li key={index}>
                  <strong>{userProfile.username}: </strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type="text"
              value={userData.message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleUserName}
          />
          <button onClick={connectWebSocket}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default Footer;
