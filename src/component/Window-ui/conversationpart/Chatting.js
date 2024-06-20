import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Chatting = ({ selectedData, userProfile, setUserData, userData, setReceiverMessages, receiverMessages, stompClient }) => {
  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Header selectedData={selectedData} />
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <Footer
              userProfile={userProfile}
              selectedData={selectedData}
              userData={userData}
              setUserData={setUserData}
              stompClient={stompClient}
              receiverMessages={receiverMessages}
              setReceiverMessages={setReceiverMessages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
