// import React, { useState } from "react";
// import { Avatar, Box, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import DialerSipIcon from '@mui/icons-material/DialerSip';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import CallIcon from '@mui/icons-material/Call';
// import VideocamIcon from '@mui/icons-material/Videocam';

// function Header({ selectedData }) {
//   const [calling, setCalling] = useState(false);
//   const [incomingCall, setIncomingCall] = useState(false);

//   const startCall = () => {
//     setCalling(true);
//     setIncomingCall(false);
//   };

//   const endCall = () => {
//     setCalling(false);
//     setIncomingCall(false); 
//   };

//   const receiveCall = () => {
//     setIncomingCall(true);
//   };
  
//   return (
//     <Box sx={{ background: "#F0F2F5", padding: "10px", borderBottom: "1px solid #ddd" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Avatar
//             src={selectedData?.profilePicture}
//             sx={{ width: 40, height: 40, marginRight: "10px" }}
//           />
//           <p style={{ margin: 0 }}>{selectedData?.username}</p>
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <SearchIcon style={{ color: "#616161", fontSize: "24px", cursor: "pointer" }}/>

//           {calling ? (
//             <div>
//               <IconButton onClick={endCall}>
//                 <CallEndIcon style={{ color: "#FF0000", fontSize: "24px", cursor: "pointer" }}/>
//               </IconButton>
//             </div>
//           ) : (
//             <div>
//               <IconButton onClick={startCall}>
//                 {/* <DialerSipIcon style={{ marginRight: "10px", color: "#616161", fontSize: "24px", cursor: "pointer" }}/> */}
//               </IconButton>

//               <IconButton onClick={receiveCall}>
//                 <CallIcon style={{ color: "#009688", fontSize: "24px", cursor: "pointer" }}/>
//               </IconButton>

//               <IconButton>
//                 <VideocamIcon style={{ color: "#616161", fontSize: "24px", cursor: "pointer" }} />
//               </IconButton>
//             </div>
//           )}
//         </div>
//       </div>
//       {incomingCall &&  (
//         <div style={{ textAlign: "center", marginTop: "10px" }}>
//           <p>Incoming call for {selectedData.username}</p>
//           <button onClick={startCall}>Answer</button>
//           <button onClick={() => setIncomingCall(false)}>Decline</button>
//         </div>
//       )}
//     </Box>
//   );
// }

// export default Header;


// import React, { useState, useEffect } from "react";
// import { Avatar, Box, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CallIcon from '@mui/icons-material/Call';
// import CallEndIcon from '@mui/icons-material/CallEnd';

// function Header({ selectedData, userProfile, stompClient }) {
//   const [calling, setCalling] = useState(false);
//   const [incomingCall, setIncomingCall] = useState(false);
//   const [callData, setCallData] = useState(null);

//   useEffect(() => {
//     if (stompClient && stompClient.connected) {
//       stompClient.subscribe(`/user/${userProfile.userId}/topic/call`, handleIncomingCall);
//     }
//   }, [stompClient]);

//   const handleIncomingCall = (message) => {
//     const callMessage = JSON.parse(message.body);
//     setCallData(callMessage);
//     setIncomingCall(true);
//     // console.log("incomingCall ++++++++++ : ", incomingCall);
//     // console.log("callData *********** : ", callData);
//   };

//   const startCall = () => {
//     console.log("Call button clicked");
//     if (stompClient && stompClient.connected) {
//       const CandidateOffer = {
//         toUser: selectedData?.userId,
//         fromUser: userProfile?.userId,
//         answer: 'description'
//       }
//       stompClient.send(`/app/candidate`, {}, JSON.stringify(CandidateOffer))

//       const callMessage = {
//         userIds: [userProfile?.userId, selectedData?.userId],
//         details: [{callerId: userProfile?.userId, type: 'Audio'}]
//       };
//       stompClient.send(`/app/call`, {}, JSON.stringify(callMessage));
      
//       stompClient.send(`/app/offer`, {}, JSON.stringify(CandidateOffer))

//       setCalling(true); 
//     }
//   };

//   const endCall = () => {
//     if (stompClient && stompClient.connected) {
//       const endCallMessage = {
//         userIds: [userProfile?.userId, selectedData?.userId],
//         details: [{callerId: userProfile?.userId, type: 'Audio'}]
//       };
//       stompClient.send(`/app/call`, {}, JSON.stringify(endCallMessage));
//       setCalling(false);
//       setIncomingCall(false);
//     }
//   };

//   const acceptCall = () => {
//     if (stompClient && stompClient.connected) {
//       const callResponse = {
//         toUser: selectedData?.userId,
//         fromUser: userProfile?.userId,
//         answer: 'description'
//       };
//       stompClient.send(`/app/answer`, {}, JSON.stringify(callResponse));
//       setIncomingCall(false);
//     }
//   };

//   const declineCall = () => {
//     setIncomingCall(false);
//     endCall();
//   };

//   return (
//     <Box sx={{ background: "#F0F2F5", padding: "10px", borderBottom: "1px solid #ddd" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Avatar
//             src={selectedData?.profilePicture}
//             sx={{ width: 40, height: 40, marginRight: "10px" }}
//           />
//           <p style={{ margin: 0 }}>{selectedData?.username}</p>
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <SearchIcon style={{ color: "#616161", fontSize: "24px", cursor: "pointer" }} />
//           {calling ? (
//             <IconButton onClick={endCall}>
//               <CallEndIcon style={{ color: "#FF0000", fontSize: "24px", cursor: "pointer" }} />
//             </IconButton>
//           ) : (
//             <IconButton onClick={startCall}>
//               <CallIcon style={{ color: "#009688", fontSize: "24px", cursor: "pointer" }} />
//             </IconButton>
//           )}
//         </div>
//       </div>
//       {incomingCall && (
//         <div style={{ textAlign: "center", marginTop: "10px" }}>
//           <p>Incoming call from {callData.callerName}</p>
//           <button onClick={acceptCall}>Answer</button>
//           <button onClick={declineCall}>Decline</button>
//         </div>
//       )}
//     </Box>
//   );
// }

// export default Header;


import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Audio from "./Audio";

function Header({ selectedData, userProfile, stompClient , setIncomingCall, peerConnection, incomingCall, setPeerConnection }) {
  const [callState, setCallState] = useState({
    calling: false,
    audioContext: null,
    analyser: null,
    dataArray: null,
  });
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(`/user/${userProfile.userId}/topic/call` , handleIncomingCall);
    }
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [stompClient]);

  const handleIncomingCall = (message) => {
    try {
      const callMessage = JSON.stringify(message.body);
      // const callerName = callMessage.details[0]?.callerId
      setPeerConnection(callMessage);
      setIncomingCall(true);
    } catch (error) {
      console.error("Error parsing incoming call message:", error, message.body);
    }
  };

  const startCall = async () => {
    if (stompClient && stompClient.connected) {
      const Candidate_offer = {
        toUser: selectedData?.userId,
        fromUser: userProfile?.userId,
        answer: 'description'
      }  
      stompClient.send(`/app/candidate`, {}, JSON.stringify(Candidate_offer));

      const callMessage = { 
        userIds: [userProfile?.userId, selectedData?.userId], 
        details: [{ callerId: userProfile?.userId, type: 'Audio' }]
      };
      stompClient.send(`/app/call`, {}, JSON.stringify(callMessage));

      stompClient.send(`/app/offer`, {}, JSON.stringify(Candidate_offer))
      
      setCallState(prevState => ({ ...prevState, calling: true }));

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const source = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 2048;
      source.connect(analyserNode);
      
      setCallState(prevState => ({ ...prevState,
        audioContext: audioCtx,
        analyser: analyserNode,
        dataArray: new Uint8Array(analyserNode.frequencyBinCount),
      }));
    }
  };

  const endCall = () => {
    if (stompClient && stompClient.connected) {
      const endCallMessage = {
        userIds: [userProfile?.userId, selectedData?.userId],
        details: [{ callerId: userProfile?.userId, type: 'Audio' }]
      };
      stompClient.send(`/app/call`, {}, JSON.stringify(endCallMessage));
      
      setCallState({ calling: false, audioContext: null, analyser: null, dataArray: null });

      if (callState.audioContext) {
        callState.audioContext.close().then(() => {
          setCallState(prevState => ({ ...prevState,
            audioContext: null,
            analyser: null,
            dataArray: null,
          }));
        });
      }
    }
  };

  const acceptCall = () => {
    if (stompClient && stompClient.connected) {
      const callResponse = {
        toUser: selectedData?.userId, 
        fromUser: userProfile?.userId,
        answer: 'description'
      };
      stompClient.subscribe(`/user/${userProfile?.userId}/topic/answer`, callResponse);
      setIncomingCall(false);
    }
  };

  const declineCall = () => {
    if (stompClient && stompClient.connected) {
      const declineMessage = {
        toUser: selectedData?.userId,
        fromUser: userProfile?.userId,
      };
      stompClient.send(`/user/${userProfile?.userId}/topic/answer`, {}, JSON.stringify(declineMessage));
      setIncomingCall(false);
    }
  };

  return (
    <Box sx={{ background: "#F0F2F5", padding: "10px", borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={selectedData?.profilePicture}
            sx={{ width: 40, height: 40, marginRight: "10px" }}
          />
          <p style={{ margin: 0 }}>{selectedData?.username}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchIcon style={{ color: "#616161", fontSize: "24px", cursor: "pointer" }} />
          {callState.calling ? (
            <IconButton onClick={endCall}>
              <CallEndIcon style={{ color: "#FF0000", fontSize: "24px", cursor: "pointer" }} />
            </IconButton>
          ) : (
            <IconButton onClick={startCall}>
              <CallIcon style={{ color: "#009688", fontSize: "24px", cursor: "pointer" }} />
            </IconButton>
          )}
          {callState.calling && (
            <Audio 
              calling={callState.calling}
              animationIdRef={animationIdRef}
              analyser={callState.analyser}
              setDataArray={(data) => setCallState(prevState => ({ ...prevState, dataArray: data }))}
            />
          )}
        </div>
      </div>
      {incomingCall && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p>Incoming call from {userProfile?.callerName}</p>
          <button onClick={acceptCall}>Answer</button>
          <button onClick={declineCall}>Decline</button>
        </div>
      )}
    </Box>
  );
}

export default Header;

