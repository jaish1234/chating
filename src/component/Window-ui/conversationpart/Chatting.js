import React from "react";
import Header from "./Header";
import Convesation from "./Convesation";
import Footer from "./Footer";

function Chatting({ selectedData }) {
  const sendMessage = (message) => {
    console.log("Sending message:", message);
  };

  console.log("selectedData", selectedData);
  return (
    <div>
      <Header selectedData={selectedData} />
      <Convesation sendMessage={sendMessage} />
      <Footer sendMessage={sendMessage} />
    </div>
  );
}

export default Chatting;
