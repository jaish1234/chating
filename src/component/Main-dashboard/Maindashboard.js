import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import User from "../User-ui/User";

import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";
import { GetUserData } from "../Api/Api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import Header from "../User-ui/Header";
import Footer from "../User-ui/Footer";

function Maindashboard() {
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  

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

  function removeCookie(name) {
    const expirationDate = new Date();

    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `${name}=; ${expires}; path=/`;
  }

  const handleLogout = async () => {
    const body = {};
    await axios
      .post("http://192.168.29.203:8080/v1/logout/user", body)
      .then((response) => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("uid");
        localStorage.removeItem("userId");
        removeCookie("jwtToken");

        console.log("logout response", response);
        navigate("/login");
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Header userProfile={userProfile} handleLogout={handleLogout} />
            <User
              setCurrentChat={setCurrentChat}
              setSelectedData={setSelectedData}
              user={user}
            />

            <Footer />
          </div>
          <div style={{ width: "74rem" }}>
            {currentChat ? (
              <Chatting selectedData={selectedData} userId={decoded?.userId}  userProfile={userProfile} />
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
