import React, { useState } from "react";

import { Box } from "@mui/material";

import User from "../User-ui/User";
import Footer from "../User-ui/Footer";
import Header from "../User-ui/Header";
import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";

function Maindashboard() {
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Header />
            <User
              setCurrentChat={setCurrentChat}
              setSelectedData={setSelectedData}
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
