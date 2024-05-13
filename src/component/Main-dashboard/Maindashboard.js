import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import User from "../User-ui/User";
import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";
import { GetUserData } from "../Api/Api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Header from "../User-ui/Header";
import Footer from "../User-ui/Footer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function Maindashboard() {
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
  });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);

  useEffect(() => {
    addUser();
    userLoginProfilePicture();
  }, []);

  const addUser = async () => {
    GetUserData()
      .then((response) => {
        console.log("Response:", response);
        setUser(response?.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const userLoginProfilePicture = async () => {
    await axios
      .get(`http://192.168.29.203:8080/v1/get/user/${decoded?.userId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setUserProfile(response?.data?.[0]);
        console.log("UserLoginProfilepicture response", response);
      })
      .catch((error) => {
        console.log("UserLoginProfilepicture error", error);
      });
  };

  // websocket functionality
  const connectWebSocket = (data) => {
    if (!userData.connected) {
      const socket = new SockJS("http://192.168.29.203:8080/ws");
      const stomp = Stomp.over(socket);
      stomp.connect({}, () => {
        setStompClient(stomp);
        console.log("WebSocket connected");
        setUserData({ ...userData, connected: true, stomp, user });
        // onMessageReceived()
        stomp.subscribe(
          `/user/${userProfile?.userId}/topic/messages`,
          onMessageReceived(data)
        );
      });
    }
  };
  console.log("selectedData +++++++++++*********", selectedData?.userId);

  const onMessageReceived = async (data) => {
    console.log("selectedData?.userId", selectedData?.userId);
    await axios
      .get(
        `http://192.168.29.203:8080/v1/get/messages?userId1=${userProfile?.userId}&userId2=${data?.userId}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {
        console.log("websocket response", response);
      })
      .catch((error) => {
        console.log("websocket error", error);
      });
  };

  // const onMessageReceived = (message) => {
  //   console.log("message ***********+", message);
  //   const messageData = JSON.parse(message.body);
  //   console.log("messageData ++++++++++++++++", messageData);
  //   const newMessages = messageData.messages.map((msg) => ({
  //     senderId: msg.senderId,
  //     content: msg.content,
  //   }));
  //   setReceivedMessages((prevMessages) => [...prevMessages, newMessages]);
  //   displayNewMessages(newMessages);
  // };

  // const displayNewMessages = (messages) => {
  //   document.getElementById("chat-messages").innerHTML = "";

  //   messages.forEach(({ senderId, content }) => {
  //     displayMessage(senderId, content);
  //   });
  // };

  // const displayMessage = (senderId, message) => {
  //   const messageContainer = document.createElement("div");
  //   messageContainer.className = "message-container";

  //   const messageText = document.createTextNode(
  //     senderId ? senderId + ": " + message : message
  //   );
  //   messageContainer.appendChild(messageText);

  //   if (senderId === userProfile.username) {
  //     messageContainer.classList.add("sender");
  //   }
  //   document.getElementById("chat-messages").appendChild(messageContainer);
  // };

  const disconnectWebSocket = () => {
    const { stomp } = userData;
    if (stomp && userData.connected) {
      stomp.disconnect(() => {
        console.log("WebSocket disconnected");
        setUserData({ ...userData, connected: false, stomp: null });
      });
    }
  };

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Header userProfile={userProfile} />
            <User
              setCurrentChat={setCurrentChat}
              setSelectedData={setSelectedData}
              user={user}
              userData={userData}
              connectWebSocket={connectWebSocket}
              disconnectWebSocket={disconnectWebSocket}
            />

            <Footer />
          </div>
          <div style={{ width: "74rem" }}>
            {currentChat ? (
              <Chatting
                selectedData={selectedData}
                // displayMessage={displayMessage}
                setReceivedMessages={setReceivedMessages}
                stompClient={stompClient}
                userData={userData}
                setUserData={setUserData}
                userId={decoded?.userId}
                userProfile={userProfile}
              />
            ) : (
              <Chat />
            )}
          </div>
        </Box>
      </div>
    </>
  );
}

export default Maindashboard;
