import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import User from "../User-ui/User"
import Chat from "../Window-ui/Chat"
import Chatting from "../Window-ui/conversationpart/Chatting"
import { GetUserData } from "../Api/Api"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import Header from "../User-ui/Header"
import Footer from "../User-ui/Footer"
import SockJS from "sockjs-client"
import Stomp from "stompjs"

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
  const [currentConnectedUserId, setCurrentConnectedUserId] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);

  useEffect(() => {
    addUser();
    userLoginProfilePicture();
    onMessageReceived();
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

  const connectWebSocket = (data) => {
    if (currentConnectedUserId !== data.userId) {
      if (stompClient && stompClient.connected) {
        disconnectWebSocket();
      }
      const socket = new SockJS("http://192.168.29.203:8080/ws");
      const stomp = Stomp.over(socket);
      stomp.connect({}, () => {
        setStompClient(stomp);
        console.log("WebSocket connected");
        setUserData({ ...userData, connected: true, stomp, user });
        setCurrentConnectedUserId(data.userId);
        stomp.subscribe(
          `/user/${userProfile?.userId}/topic/messages`,
          (message) => onMessageReceived(message, data)
        );
      });
    }
  };

  const onMessageReceived = async (message, data) => {
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
        console.log("websocket response", response?.data?.[0]?.messages);
        const newMessage = response?.data?.[0]?.messages?.map((msg) => ({
          senderId: msg.senderId,
          content: msg.content,
          status: msg.senderId === userProfile?.userId ? msg.status : "delivered"
        }));
        // setReceivedMessages((prevMessages) => [...prevMessages, ...newMessage]);
        setReceivedMessages(newMessage);
      })
      .catch((error) => {
        console.log("websocket error", error);
      });
  };

  const disconnectWebSocket = () => {
    const { stomp } = userData;
    if (stomp && userData.connected) {
      stomp.disconnect(() => {
        console.log("WebSocket disconnected");
        setUserData({ ...userData, connected: false, stomp: null });
        setCurrentConnectedUserId(null);
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
              userProfile={userProfile}
              connectWebSocket={connectWebSocket}
            />
            <Footer />
          </div>
          <div style={{ width: "74rem" }}>
            {currentChat ? (
              <Chatting
                selectedData={selectedData}
                receivedMessages={receivedMessages}
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
