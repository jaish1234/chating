import React, { useState } from "react";
import Header from "./Header";
import Conversation from "./Conversation";
import Footer from "./Footer";

const Chatting = ({ selectedData, userProfile, userId, setUserData, userData }) => {

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Header selectedData={selectedData} />
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "70%",
              height: "calc(100vh - 140px)",
              overflowY: "auto",
            }}
          >
            <Conversation 
            // messages={messages} 
            />
          </div>
          <div style={{ width: "30%" }}>
            <Footer userProfile={userProfile} 
            selectedData={selectedData} 
            userData={userData}
            setUserData={setUserData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
