import React, { useState } from "react";
import { Avatar, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DialerSipIcon from '@mui/icons-material/DialerSip';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';

function Header({ selectedData }) {
  const [calling, setCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);

  const startCall = () => {
    setCalling(true);
    setIncomingCall(false);
  };

  const endCall = () => {
    setCalling(false);
    setIncomingCall(false); 
  };

  const receiveCall = () => {
    setIncomingCall(true);
  };

  return (
    <Box
      sx={{
        background: "#F0F2F5",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={selectedData?.profilePicture}
            sx={{ width: 40, height: 40, marginRight: "10px" }}
          />
          <p style={{ margin: 0 }}>{selectedData?.username}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchIcon
            style={{
              marginRight: "10px",
              color: "#616161",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          {calling ? (
            <>
              <IconButton onClick={endCall}>
                <CallEndIcon
                  style={{
                    color: "#FF0000",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={startCall}>
                {/* <DialerSipIcon
                  style={{
                    marginRight: "10px",
                    color: "#616161",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                /> */}
              </IconButton>
              <IconButton onClick={receiveCall}>
                <CallIcon
                  style={{
                    marginRight: "10px",
                    color: "#009688",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <VideocamIcon
                  style={{
                    marginRight: "10px",
                    color: "#616161",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </>
          )}
        </div>
      </div>
      {incomingCall &&  (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p>Incoming call for {selectedData.username}</p>
          <button onClick={startCall}>Answer</button>
          <button onClick={() => setIncomingCall(false)}>Decline</button>
        </div>
      )}
    </Box>
  );
}

export default Header;
