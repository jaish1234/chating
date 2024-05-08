import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Footer({ userProfile, selectedData }) {
  console.log("selectedData", selectedData);
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
        stomp.subscribe("/topic/messages", onMessageReceived);
      });
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userData.connected]);

  const onMessageReceived = (message) => {
    const messageData = JSON.parse(message.body);
    const newMessages = messageData.messages.map((msg) => ({
      senderId: msg.senderId,
      content: msg.content,
    }));
    setReceivedMessages((prevMessages) => [...prevMessages, newMessages]);
    displayNewMessages(newMessages);
  };

  const sendMessage = () => {
    if (stompClient && userData.message.trim() !== "") {
      const message = {
        userIds: [userProfile?.username, selectedData?.username],
        messages: [
          { senderId: userProfile?.username, content: userData.message },
        ],
      };
      // Update UI immediately
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { senderId: userProfile?.username, content: userData.message },
      ]);
      displayMessage(userProfile?.username, userData.message);

      // Send message to server
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      setUserData({ ...userData, message: "" });
    }
  };

  // const handleUserName = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, username: value });
  // };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const connectWebSocket = () => {
    setUserData({ ...userData, connected: true });
  };

  const displayNewMessages = (messages) => {
    // Clear existing messages
    document.getElementById("chat-messages").innerHTML = "";

    messages.forEach(({ senderId, content }) => {
      displayMessage(senderId, content);
    });
  };

  const displayMessage = (senderId, message) => {
    console.log("Received message from: " + senderId);
    console.log("Message content: " + message);

    const messageContainer = document.createElement("div");
    messageContainer.className = "message-container";

    const messageText = document.createTextNode(
      senderId ? senderId + ": " + message : message
    );
    messageContainer.appendChild(messageText);

    if (senderId === userProfile.username) {
      messageContainer.classList.add("sender");
    }

    document.getElementById("chat-messages").appendChild(messageContainer);
    // document.getElementById("chat-messages").scrollTop =
    //   document.getElementById("chat-messages").scrollHeight;
  };

  return (
    <div>
      {userData.connected ? (
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
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={connectWebSocket}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default Footer;
