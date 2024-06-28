// import React, { useState } from "react";
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
//       // const timestamp = Date.now();
//       const messageToSend = {
//         userIds: [userProfile?.userId, selectedData?.userId],
//         messages: [
//           {
//             senderId: userProfile?.userId,
//             content: userData?.message,
//             status: "SENT",
//             // timestamp,
//           },
//         ],
//       };

//       stompClient.send(
//         `/app/messages/${selectedData?.userId}`,
//         {},
//         JSON.stringify(messageToSend)
//       );

//       const updatedMessages = [
//         ...receivedMessages,
//         {
//           senderId: userProfile?.userId,
//           content: userData?.message,
//           status: "SENT",
//           // timestamp,
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

//   // const getMessageStatus = (msg) => {
//   //   if (msg.senderId === userProfile?.userId) {
//   //     return msg.status === "sent" ? (
//   //       <DoneOutlinedIcon style={{ fontSize: 20 }}/>
//   //     ) : (
//   //       <DoneAllOutlinedIcon style={{ fontSize: 20, color: "#53bdeb" }} />
//   //     );
//   //   }
//   //   return null;
//   // };

//   const getMessageStatus = (msg) => {
//     if (msg.senderId === userProfile?.userId) {
//       if (msg.status === "SENT") {
//         return <DoneOutlinedIcon style={{ fontSize: 20 }} />;
//       } else if (msg.status === "DELIVERED") {
//         return <DoneAllOutlinedIcon style={{ fontSize: 20 }} />;
//       } else if (msg.status === "READ") {
//         return <DoneAllOutlinedIcon style={{ fontSize: 20, color: "#53bdeb" }} />;
//       }
//     }
//     return null;
//   };

//   const handleKeyPress = (event) =>{
//     if(event.key==="Enter"){
//       sendMessage(event);
//     }
//   }

//   return (
//     <div>
//       <div style={{display:'flex', flexDirection:'column', height:'92vh', "@media (max-width: 600px)":{height: '85.3vh'}}}>
//         <div id="#chat-messages" style={{overflowY:'scroll', backgroundColor:'#e5ddd5', height: "calc(88vh - 20px)", padding: "10px 0 10px 0" }}>
//           {receivedMessages?.map((msg, index) => (
//             <div key={index} style={{ display: 'flex', justifyContent: msg.senderId === userProfile?.userId ? 'flex-end' : 'flex-start' }}>
//               <div style={{ display: "flex", alignItems:'center', maxWidth: "60%", margin: "2px 10px", padding: "5px 10px", borderRadius: "10px", background: msg.senderId === userProfile?.userId ? "#DCF8C6" : "#FFF", color: "#000", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", position: "relative", wordBreak: "break-word"}}>
//                 <p style={{fontSize:'15px'}}>{msg?.content}</p>
//                 <span style={{ display: "flex", justifyContent: "flex-end", marginLeft:'5px' }}>
//                   {getMessageStatus(msg)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{display:'flex', alignItems:'center', padding:'10px', backgroundColor:'#f0f0f0', borderTop:'1px solid #ccc'}}>
//           <input
//             type="text"
//             id="content"
//             placeholder="Type your message..."
//             value={userData?.message}
//             onChange={handleMessageChange}
//             onKeyPress={(event)=>handleKeyPress(event)}
//             style={{
//               flex: 1,
//               padding: "10px",
//               borderRadius: "20px",
//               border: "1px solid #ddd",
//               outline: "none",
//             }}
//           />
//           <button onClick={(e) => sendMessage(e)} style={{
//               marginLeft: "10px",
//               padding: "10px 20px",
//               borderRadius: "20px",
//               border: "none",
//               background: "#4CAF50",
//               color: "#FFF",
//               cursor: "pointer",
//             }}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;

import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import what from "../../../assets/img/what.png"
// import EmojiPicker from 'emoji-picker-react';

function Footer({ userProfile, selectedData, setUserData, userData, receiverMessages, setReceiverMessages, stompClient }) {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [receiverMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (stompClient && stompClient.connected && userData?.message.trim() !== "") {
      const createdAt = Date.now();
      const uuId = uuidv4();
      const messageToSend = {
        userIds: [userProfile?.userId, selectedData?.userId],
        messages: [
          {
            senderId: userProfile?.userId,
            messageId: uuId,
            receiverId: selectedData?.userId,
            content: userData?.message,
            status: "SENT",
            createdAt
          },
        ],
      };
      // console.log("message To Send : ", messageToSend?.messages?.[0]?.messageId);
      stompClient.send(`/app/messages/${selectedData?.userId}`, {}, JSON.stringify(messageToSend)); 

      stompClient.send(`/app/messages-delivered/${selectedData?.userId}`, {},
        JSON.stringify({
          messageIds: [messageToSend?.messages?.[0]?.messageId],
          userIds: [selectedData?.userId,userProfile.userId]
        })
      );
      stompClient.send(`/app/messages-seen/${selectedData?.userId}`, {},
        JSON.stringify({
          messageIds: [messageToSend?.messages?.[0]?.messageId],
          userIds: [selectedData?.userId,userProfile.userId]
        })
      );

      const newMessage = {
        senderId: userProfile?.userId,
        receiverId: selectedData?.userId,
        content: userData.message,
        status: "SENT",
        createdAt
      }; 
      setReceiverMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserData({ ...userData, message: "" });
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  // console.log("userprofile in id : ", userProfile);
  // const getMessageStatus = (msg) => {
  //   // console.log("msg jiyhu8hyuihuih", msg);
  //   if (msg?.senderId === userProfile?.userId) {
  //     if (msg.status === "SENT") {
  //       return <DoneOutlinedIcon style={{ fontSize: 20 }} />;
  //     } else if (msg.status === "DELIVERED") {
  //       return <DoneAllOutlinedIcon style={{ fontSize: 20 }} />;
  //     } else if (msg.status === "READ") {
  //       return <DoneAllOutlinedIcon style={{ fontSize: 20, color: "#53bdeb" }} />;
  //     }
  //   }
  //   return null;
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "92vh"}}>
      <div ref={scrollRef} id="chat-messages" style={{ overflowY: "scroll", backgroundImage: `url(${what})`, height: "calc(88vh - 20px)", padding: "10px 0" }}>
        {receiverMessages?.map((msg, index) => (
          <div key={index} style={{ display: "flex", justifyContent: msg?.senderId === userProfile?.userId ? "flex-end" : "flex-start", margin: "5px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", maxWidth: "60%", margin: "2px 10px", padding: "10px", borderRadius: "10px", background: msg.senderId === userProfile?.userId ? "#DCF8C6" : "#FFF", color: "#000", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", wordBreak: "break-word" }}>
              <p style={{ fontSize: "15px", margin: "0" }}>{msg?.content}</p> 
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <p style={{ margin: "0 5px", fontSize: "12px", color: "#555" }}>{formatTimestamp(msg.createdAt)}</p>
                {/* {msg.senderId === userProfile?.userId &&
                  (msg.status === "READ" ? (
                    <DoneAllOutlinedIcon style={{ color: "#53bdeb", fontSize: "16px" }} />
                  ) : msg.status === "DELIVERED" ? (
                    <DoneAllOutlinedIcon style={{ fontSize: "16px" }} />
                  ) : (
                    <DoneOutlinedIcon style={{ fontSize: "16px" }} />
                  ))} */}
                  {msg?.senderId === userProfile?.userId && (
                    msg?.status === "READ" ? <DoneAllOutlinedIcon style={{ color: "#53bdeb", fontSize: "16px" }} /> :
                    msg?.status === "DELIVERED" ? <DoneAllOutlinedIcon style={{ fontSize: "16px" }} /> :
                    msg?.status === "SENT" ? <DoneOutlinedIcon style={{ fontSize: "16px" }} /> : null
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="input-container" style={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#f0f0f0", borderTop: "1px solid #ccc", }}>
          {/* <EmojiPicker/> */}
        <input type="text" id="content" placeholder="Type your message..." value={userData?.message} onChange={handleMessageChange}
          onKeyPress={(event) => handleKeyPress(event)}
          style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ddd", outline: "none" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "20px", border: "none", background: "#4CAF50", color: "#FFF", cursor: "pointer" }}>
          Send
        </button>
      </div>
      <style jsx>{`
          @media (max-width: 600px) {
            .input-container {
              height: 7vh;
              margin-top: -3.5rem;
            }
          }
        `}</style>
    </div>
  );
}

export default Footer;
