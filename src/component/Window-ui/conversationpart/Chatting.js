import React, { useState } from "react";
import Header from "./Header";
import Conversation from "./Conversation";
import Footer from "./Footer";

const Chatting = ({ selectedData, userProfile, setUserData, userData, setReceivedMessages, receivedMessages, displayMessage, stompClient }) => {
  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Header selectedData={selectedData} />
        <div style={{ display: "flex" }}>
          {/* <div
            style={{
              width: "70%",
              height: "calc(100vh - 140px)",
              overflowY: "auto",
            }}
          >
            <Conversation/>
          </div> */}
          <div style={{ width: "100%" }}>
            <Footer
              userProfile={userProfile}
              selectedData={selectedData}
              userData={userData}
              setUserData={setUserData}
              receivedMessages={receivedMessages}
              setReceivedMessages={setReceivedMessages}
              displayMessage={displayMessage}
              stompClient={stompClient}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
