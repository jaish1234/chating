// import React, { useState, useEffect } from "react";
// import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
// import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

// function Footer({
//   userProfile,
//   selectedData,
//   setUserData,
//   userData,
//   receivedMessages,
//   setReceivedMessages,
//   stompClient,
// }) {
//   const [message, setMessage] = useState("");

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (stompClient && userData.message.trim() !== "") {
//       const timestamp = Date.now();
//       const message = {
//         userIds: [userProfile?.userId, selectedData?.userId],
//         messages: [
//           {
//             senderId: userProfile?.userId,
//             content: userData?.message,
//             status: "sent",
//             timestamp,
//           },
//         ],
//       };

//       stompClient.send(
//         `/app/messages/${selectedData?.userId}`,
//         {},
//         JSON.stringify(message)
//       );
      
//       const updatedMessages = [
//         ...receivedMessages,
//         {
//           senderId: userProfile?.userId,
//           content: userData?.message,
//           status: "sent",
//           timestamp,
//         },
//       ];
//       setReceivedMessages(updatedMessages);
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   const handleMessageChange = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, message: value });
//     setMessage(value);
//   };

//   useEffect(() => { 
//     const updateMessageStatus = () => {
//       const lastMessage = receivedMessages[receivedMessages.length - 1];
//       if (lastMessage?.senderId === selectedData?.userId) {
//         const updatedMessages = receivedMessages.map((msg) =>
//           msg !== lastMessage && msg.status !== "read"
//             ? { ...msg, status: "read" }
//             : msg
//         );
//         setReceivedMessages(updatedMessages);
//       }
//     };

//     updateMessageStatus();
//   }, [receivedMessages, selectedData, setReceivedMessages]);

//   return (
//     <div>
//       <div>
//         <div
//           id="chat-messages"
//           style={{
//             overflowY: "scroll",
//             height: "calc(88vh - 20px)",
//             padding: "10px 0 10px 0",
//           }}
//         >
//           {/* Display messages */}
//           {receivedMessages?.map((msg, index) => (
//             <div key={index}>
//               {msg.senderId === userProfile?.userId ? (
//                 <div style={{ display: "flex" }}>
//                   {msg?.content}&nbsp;&nbsp;
//                   {msg.status === "sent" && <DoneOutlinedIcon />}
//                   {msg.status === "delivered" && <DoneAllOutlinedIcon/>}
//                   {msg.status === "read" && <DoneAllOutlinedIcon style={{ color: '#53bdeb' }} />}
//                 </div>
//               ) : (
//                 <div style={{ display: "flex" }}>
//                   {msg?.content}&nbsp;&nbsp;
//                   {/* {msg.status === "sent" && <DoneOutlinedIcon />}
//                   {msg.status === "delivered" && <DoneAllOutlinedIcon style={{ color: '#53bdeb' }} />}
//                   {msg.status === "read" && <DoneAllOutlinedIcon style={{ color: '#53bdeb' }} />} */}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             id="content"
//             placeholder="Type your message..."
//             value={userData?.message}
//             onChange={handleMessageChange}
//           />
//           <button onClick={(e) => sendMessage(e)}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;


import React, { useState } from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

function Footer({
  userProfile,
  selectedData,
  setUserData,
  userData,
  receivedMessages,
  setReceivedMessages,
  stompClient,
}) {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (stompClient && userData.message.trim() !== "") {
      const timestamp = Date.now();
      const messageToSend = {
        userIds: [userProfile?.userId, selectedData?.userId],
        messages: [
          {
            senderId: userProfile?.userId,
            content: userData?.message,
            status: "sent",
            timestamp,
          },
        ],
      };

      stompClient.send(
        `/app/messages/${selectedData?.userId}`,
        {},
        JSON.stringify(messageToSend)
      );

      const updatedMessages = [
        ...receivedMessages,
        {
          senderId: userProfile?.userId,
          content: userData?.message,
          status: "sent",
          timestamp,
        },
      ];
      setReceivedMessages(updatedMessages);
      setUserData({ ...userData, message: "" });
    }
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
    setMessage(value);
  };

  const getMessageStatus = (msg) => {
    if (msg.senderId === userProfile?.userId) {
      return msg.status === "sent" ? (
        <DoneOutlinedIcon />
      ) : (
        <DoneAllOutlinedIcon style={{ color: "#53bdeb" }} />
      );
    }
    return null;
  };

  const handleKeyPress = (event) =>{
    if(event.key==="Enter"){
      sendMessage(event);
    }
  }

  return (
    <div>
      <div>
        <div
          id="chat-messages"
          style={{
            overflowY: "scroll",
            height: "calc(88vh - 20px)",
            padding: "10px 0 10px 0",
          }}
        >
          {receivedMessages?.map((msg, index) => (
            <div key={index}>
              <div style={{ display: "flex" }}>
                {msg?.content}&nbsp;&nbsp;
                {getMessageStatus(msg)}
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            id="content"
            placeholder="Type your message..."
            value={userData?.message}
            onChange={handleMessageChange}
            onKeyPress={(event)=>handleKeyPress(event)}
          />
          <button onClick={(e) => sendMessage(e)}>Send</button>
        </div>
      </div>
    </div>
  );
} 

export default Footer;


