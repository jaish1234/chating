import React from "react";
import Header from "./Header";
import Convesation from "./Convesation";
import Footer from "./Footer";

function Chatting({ selectedData }) {
  console.log("selectedData", selectedData);
  return (
    <div>
      <Header selectedData={selectedData}/>
      <Convesation />
      <Footer/>
    </div>
  );
}

export default Chatting;
