import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Chatting = ({ selectedData, userProfile,startCall, setUserData, userData, peerConnection, setReceiverMessages, receiverMessages,acceptCall,declineCall, stompClient, setPeerConnection,setCallData,setIncomingCall,callData,incomingCall }) => {
  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Header
          selectedData={selectedData}
          setPeerConnection={setPeerConnection}
          userProfile={userProfile}
          stompClient={stompClient}
          declineCall={declineCall}
          peerConnection={peerConnection}
          incomingCall={incomingCall}
          acceptCall={acceptCall}
          setIncomingCall={setIncomingCall}
          startCall={startCall}
        />
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
