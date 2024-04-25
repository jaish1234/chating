import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import User from "../User-ui/User";
import Footer from "../User-ui/Footer";
import Header from "../User-ui/Header";
import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";
import { GetUserData } from "../Api/Api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Maindashboard() {
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [user, setUser] = useState([]);
  const [userProfile, setuserProfile] = useState();
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);

  useEffect(() => {
    AddUser();
    UserLoginProfilepicture();
  }, []);

  const AddUser = async () => {
    GetUserData()
      .then((response) => {
        console.log("Response:", response);
        setUser(response?.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const UserLoginProfilepicture = async () => {
    await axios
      .get(`http://192.168.29.203:8080/v1/get/user/${decoded?.userId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setuserProfile(response?.data?.[0]);
        console.log("UserLoginProfilepicture response", response);
      })
      .catch((error) => {
        console.log("UserLoginProfilepicture error", error);
      });
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
            />
            <Footer />
          </div>
          <div style={{ width: "74rem" }}>
            {currentChat ? <Chatting selectedData={selectedData} /> : <Chat />}
          </div>
        </Box>
      </div>
    </>
  );
}

export default Maindashboard;
