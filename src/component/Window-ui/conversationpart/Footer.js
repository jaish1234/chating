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
        console.log("WebSocket connected"); // Log connection status
        setStompClient(stomp);
        stomp.subscribe("/topic/messages", onMessageReceived);
      }, (error) => {
        console.error("WebSocket connection error:", error); // Log any connection errors
      });
    }

    return () => {
      if (stompClient) {
        console.log("Disconnecting WebSocket"); // Log disconnection
        stompClient.disconnect();
      }
    };
  }, [userData.connected]);

  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const sendMessage = () => {
    if (!userData.connected && userData.username.trim() !== "") {
      // If username is provided and not already connected, initiate WebSocket connection
      connectWebSocket();
    } else if (stompClient && userData.message.trim() !== "") {
      const message = {
        username: userProfile?.username,
        text: userData.message,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message), (error) => {
        if (error) {
          console.error("Error sending message:", error);
        } else {
          console.log("Message sent successfully");
        }
      });
      setUserData({ ...userData, message: "" });
    }
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const connectWebSocket = () => {
    if (userData.username.trim() !== "") {
      setUserData({ ...userData, connected: true });
    } else {
      console.error("Username is required for WebSocket connection.");
    }
  };

  return (
    <div>
      {userData.connected ? (
        <div>
          <ul>
            {receivedMessages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.username}: </strong> {msg.text}
              </li>
            ))}
          </ul>
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
          ""
        </div>
      )}
    </div>
  );
}

export default Footer;
