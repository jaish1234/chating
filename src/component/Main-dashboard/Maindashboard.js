// Api thraw Chatting

// import React, { useState, useEffect } from "react"
// import { Box } from "@mui/material"
// import User from "../User-ui/User"
// import Chat from "../Window-ui/Chat"
// import Chatting from "../Window-ui/conversationpart/Chatting"
// import { GetUserData } from "../Api/Api"
// import axios from "axios"
// import { jwtDecode } from "jwt-decode"
// import Header from "../User-ui/Header"
// import Footer from "../User-ui/Footer"
// import SockJS from "sockjs-client"
// import Stomp from "stompjs"

// function Maindashboard() {
//   const [userData, setUserData] = useState({
//     username: "",
//     connected: false,
//     message: "",
//   });
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [stompClient, setStompClient] = useState(null);
//   const [currentChat, setCurrentChat] = useState(false);
//   const [selectedData, setSelectedData] = useState();
//   const [user, setUser] = useState([]);
//   const [userProfile, setUserProfile] = useState();
//   const [currentConnectedUserId, setCurrentConnectedUserId] = useState(null);
//   const token = localStorage.getItem("jwtToken");
//   const decoded = jwtDecode(token);

//   useEffect(() => {
//     addUser();
//     userLoginProfilePicture();
//   }, []);

//   const addUser = async () => {
//     GetUserData()
//       .then((response) => {
//         console.log("Response:", response);
//         setUser(response?.data);
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   };

//   const userLoginProfilePicture = async () => {
//     await axios
//       .get(`http://192.168.29.203:8080/v1/get/user/${decoded?.userId}`, {
//         headers: {
//           Authorization: localStorage.getItem("jwtToken"),
//         },
//       })
//       .then((response) => {
//         setUserProfile(response?.data?.[0]);
//         console.log("UserLoginProfilepicture response", response);
//       })
//       .catch((error) => {
//         console.log("UserLoginProfilepicture error", error);
//       });
//   };

//   const connectWebSocket = (data) => {
//     if (currentConnectedUserId !== data.userId) {
//       if (stompClient && stompClient.connected) {
//         disconnectWebSocket();
//       }
//       const socket = new SockJS("http://192.168.29.203:8080/ws");
//       const stomp = Stomp.over(socket);
//       stomp.connect({}, () => {
//         setStompClient(stomp);
//         setUserData({ ...userData, connected: true, stomp, user });
//         setCurrentConnectedUserId(data.userId);
//         stomp.subscribe(
//           `/user/${userProfile?.userId}/topic/messages`,
//           () => onMessageReceived(data)
//         );
//       });
//     }
//   };

//   const onMessageReceived = async (data) => {
//     await axios
//       .get(
//         `http://192.168.29.203:8080/v1/get/messages?userId1=${userProfile?.userId}&userId2=${data?.userId}`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("jwtToken"),
//           },
//         }
//       )
//       .then((response) => {
//         console.log("websocket response", response?.data?.[0]?.messages);
//         const newMessage = response?.data?.[0]?.messages?.map((msg) => ({
//           senderId: msg.senderId,
//           content: msg.content,
//           status: msg.senderId === userProfile?.userId ? msg.status : "DELIVERED"
//         }));
//         setReceivedMessages(newMessage);
//       })
//       .catch((error) => {
//         console.log("websocket error", error);
//       });
//   };

//   // const handleReadReceipt = (message) => {
//   //   const updatedMessages = receivedMessages.map(msg => {
//   //     if (msg.senderId === message.senderId && msg.timestamp === message.timestamp) {
//   //       return { ...msg, status: 'read' };
//   //     }
//   //     return msg;
//   //   });
//   //   setReceivedMessages(updatedMessages);
//   // };

//   // // Example of setting up read receipt subscription
//   // useEffect(() => {
//   //   if (stompClient) {
//   //     stompClient.subscribe(`/user/${userProfile?.userId}/queue/read-receipts`, (message) => {
//   //       handleReadReceipt(JSON.parse(message.body));
//   //     });
//   //   }
//   // }, [stompClient]);

//   const disconnectWebSocket = () => {
//     const { stomp } = userData;
//     if (stomp && userData.connected) {
//       stomp.disconnect(() => {
//         setUserData({ ...userData, connected: false, stomp: null });
//         setCurrentConnectedUserId(null);
//       });
//     }
//   };

//   return (
//     <>
//       <div style={{ overflowY: "hidden" }}>
//         <Box sx={{ display: "flex" }}>
//           <div style={{ width: "26rem" }}>
//             <Header userProfile={userProfile} />
//             <User
//               setCurrentChat={setCurrentChat}
//               setSelectedData={setSelectedData}
//               user={user}
//               userData={userData}
//               userProfile={userProfile}
//               receivedMessages={receivedMessages}
//               setReceivedMessages={setReceivedMessages}
//               selectedData={selectedData}
//               connectWebSocket={connectWebSocket}
//               onMessageReceived={onMessageReceived}
//             />
//             <Footer />
//           </div>
//           <div style={{ width: "74rem" }}>
//             {currentChat ? (
//               <Chatting
//                 selectedData={selectedData}
//                 receivedMessages={receivedMessages}
//                 setReceivedMessages={setReceivedMessages}
//                 stompClient={stompClient}
//                 userData={userData}
//                 setUserData={setUserData}
//                 userId={decoded?.userId}
//                 userProfile={userProfile}
//               />
//             ) : (
//               <Chat />
//             )}
//           </div>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default Maindashboard;




import React, { useState, useEffect } from "react";
import User from "../User-ui/User";
import Chat from "../Window-ui/Chat";
import Chatting from "../Window-ui/conversationpart/Chatting";
import { GetUserData } from "../Api/Api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Header from "../User-ui/Header";
import Footer from "../User-ui/Footer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Box } from "@mui/material";

function Maindashboard() {
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
    status: "",
    createdAt: ""  
  });
  const [stompClient, setStompClient] = useState(null);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [peerConnection, setPeerConnection] = useState(null); // audiocall functionality
  const [incomingCall, setIncomingCall] = useState(false); // audiocall functionality
  const [currentChat, setCurrentChat] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [currentConnectedUserId, setCurrentConnectedUserId] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(token);

  // console.log("peerconnection : ", peerConnection);
  // console.log("incoming call  : ", incomingCall);
  // console.log("call data : ", callData);

  useEffect(() => {
    addUser();
    userLoginProfilePicture();
  }, []);

  const addUser = async () => {
    GetUserData()
      .then((response) => {
        // console.log("Response:", response);
        setUser(response?.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const userLoginProfilePicture = async () => {
    await axios
      .get(`http://192.168.29.203:8080/v1/get/user/${decoded?.userId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setUserProfile(response?.data?.[0]);
        // console.log("UserLoginProfilepicture response", response);
      })
      .catch((error) => {
        console.log("UserLoginProfilepicture error", error);
      });
  };

  const connectWebSocket = (data) => {
    if (currentConnectedUserId !== data.userId) {
      if (stompClient && stompClient.connected) {
        disconnectWebSocket();
      }
      const socket = new SockJS("http://192.168.29.203:8080/ws");
      const stomp = Stomp.over(socket);
      stomp.connect({}, () => {
        setStompClient(stomp);
        setUserData({ ...userData, connected: true, stomp });
        setCurrentConnectedUserId(data.userId);
        stomp.subscribe(`/user/${userProfile?.userId}/topic/messages`,
          (message) => onMessageReceived(message)
        );
        // stomp.subscribe(`/user/${userProfile.userId}/topic/messages-seen`, (message) => onMessageSeen(message))
        // stomp.subscribe(`/user/${userProfile.userId}/topic/messages-delivered`, (message) => onMessageDelivered(message))
        stomp.subscribe(`/user/${userProfile.userId}/topic/messages-delivered`,
          (message) => onMessageDelivered(message)  
        );
        stomp.subscribe(`/user/${userProfile.userId}/topic/messages-seen`,
          (message) => onMessageSeen(message)
        );
        // videocall and audiocall functionality
        stomp.subscribe(`/user/${userProfile.userId}/topic/candidate`, (message) => handleCandidate(message))
        stomp.subscribe(`/user/${userProfile.userId}/topic/call`, (message) => handleCall(message));
        stomp.subscribe(`/user/${userProfile.userId}/topic/offer`, (message) => handleOffer(message))
        stomp.subscribe(`/user/${userProfile?.userId}/topic/answer`, handleAnswer);
      });
    }
  };

  // const onMessageReceived = (message) => {
  //   const messageData = JSON.parse(message.body);
  //   const newMessages = messageData.messages.map((msg) => ({
  //     senderId: msg.senderId,
  //     content: msg.content,
  //     status: msg.senderId === userProfile?.userId ? msg.status : "DELIVERED",
  //   }))?.[0];
  //   setReceiverMessages((prevMessages) => [...prevMessages, newMessages]);
  // };

  const onMessageReceived = (message) => {
    const messageData = JSON.parse(message.body);
    const newMessages = messageData.messages.map((msg) => ({
      senderId: msg.senderId,
      content: msg.content,
      messageId: msg.messageId,
      status: msg.senderId === userProfile?.userId ? msg.status : "DELIVERED",
      // status: msg.status,
      createdAt: msg.createdAt,
    }))?.[0];
    if(newMessages?.senderId !== selectedData?.userId){
      setReceiverMessages((prevMessages) => [...prevMessages, newMessages]);
    }
  };

  const onMessageDelivered = (message) => {
    const messageData = JSON.parse(message.body);
    console.log("message data in deliverd : ", messageData?.messageIds);
    setReceiverMessages((prevMessages) => 
      prevMessages.map((msg) => {
        // console.log("Current message being processed: ", msg);
        return msg.messageId === messageData?.messageIds ? { ...msg, status: "DELIVERED" } : msg;
      })
    );
  }
  const onMessageSeen = (message) => {
    const messageData = JSON.parse(message.body);
    // console.log("message data in seen : ", messageData?.messageIds);  
    setReceiverMessages((prevMessages) =>
      prevMessages.map((msg) => { return msg.messageId === messageData?.messageIds ? { ...msg, status: "READ" } : msg })
    )
  }

  const handleCandidate = (message) => {
    const candidateData = JSON.stringify(message.body);
    const candidate = new RTCIceCandidate(candidateData);
    peerConnection.addIceCandidate(candidate).catch((e) => console.error("Error adding ICE candidate", e));
  }

  const handleCall = (message) => {
    const callMessage = JSON.stringify(message.body);
    setPeerConnection(callMessage); 
    setIncomingCall(true);
  }
  
  const handleOffer = async (message) => {
    const offer = JSON.stringify(message.body);
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));  
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    
    stompClient.subscribe(`/user/${userProfile?.userId}/topic/answer`,{}, JSON.stringify(handleAnswer));
  }

  const handleAnswer = async (message) => {
    const answer = JSON.stringify(message.body);
    const desc = new RTCSessionDescription(answer);
    await peerConnection.setRemoteDescription(desc);
  }

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        stompClient.send(`/app/candidate`, {}, JSON.stringify({ candidate: event.candidate, toUser: selectedData.userId, fromUser: userProfile.userId, answer: 'answer' }));
      }
    };
    pc.ontrack = (event) => {
      // Handle the remote stream here
      const remoteStream = event.streams[0];
      const videoElement = document.getElementById("remoteVideo");
      if (videoElement) {
        videoElement.srcObject = remoteStream;
      }
    };
    setPeerConnection(pc);
    return pc;
  };


  const disconnectWebSocket = () => {
    const { stomp } = userData;
    if (stomp && userData.connected) {
      stomp.disconnect(() => {
        setUserData({ ...userData, connected: false, stomp: null });
        setCurrentConnectedUserId(null);
      });
    }
  };

  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Header userProfile={userProfile}  />
            <User
              setCurrentChat={setCurrentChat}
              setSelectedData={setSelectedData}
              user={user}
              userProfile={userProfile} 
              connectWebSocket={connectWebSocket}
              receiverMessages={receiverMessages}
              setReceiverMessages={setReceiverMessages}
            />
            <Footer />
          </div>
          <div style={{ width: "74rem" }}>
            {currentChat ? (
              <Chatting
                selectedData={selectedData}
                userProfile={userProfile}
                userId={decoded?.userId}
                userData={userData}
                stompClient={stompClient}
                setUserData={setUserData}
                receiverMessages={receiverMessages}
                setReceiverMessages={setReceiverMessages}
                setPeerConnection={setPeerConnection}
                // callData={callData}
                peerConnection={peerConnection}
                incomingCall={incomingCall}
                // setCallData={setCallData}
                setIncomingCall={setIncomingCall}
              />
            ) : (
              <Chat />
            )}
          </div> 
        </Box>
      </div>
    </>
  );
}

export default Maindashboard;