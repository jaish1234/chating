import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import User from "../User-ui/User";
import Footer from "../User-ui/Footer";
import Header from "../User-ui/Header";
import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";
import { GetUserData } from "../Api/Api";

function Maindashboard() {
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [user, setUser] = useState([]);

  useEffect(() => {
    AddUser();
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

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Header user={user} />
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
