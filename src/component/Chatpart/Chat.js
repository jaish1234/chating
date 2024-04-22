import React from "react";
import profile from "../../assets/img/profile.webp";
import { Avatar, Box, TextField } from "@mui/material";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";



function Chat() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "47vw",
            backgroundColor: "rgb(200, 223, 231)",
            height: "65px",
            marginTop: "1rem",
            borderRadius: "10rem",
            alignItems: "center",
            paddingRight: "1.5rem",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", padding: "0 1rem" }}
          >
            <Avatar
              src={profile}
              alt="Not Found"
              sx={{
                width: { xs: 54 },
                height: { xs: 54 },
                marginLeft: "-0.6rem",
              }}
            />
            <div style={{ marginLeft: "0.5rem" }}>
              <h3>Alexander</h3>
              <p>Online</p>
            </div>
          </div>
          <PhoneForwardedIcon
            sx={{ fontSize: 25, "&:hover": { cursor: "pointer" } }}
          />
        </div>
        <div
          style={{
            width: "43%",
            height: "75%",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#9b9b9b80 #ffffff80",
          }}
        >
          <div style={{ maxHeight: "500px", marginTop: "2rem" }}>
            <div style={{maxWidth:'40%',padding:'1rem',marginBottom:'1rem',backgroundColor:'lightblue',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>The WebSocket offers persistent</div>
            <div style={{maxWidth:'40%',padding:'1rem',margin:'0 0 1.5rem auto',backgroundColor:'#c6c6e6',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>WebSocket communication takes</div>
            <div style={{maxWidth:'40%',padding:'1rem',marginBottom:'1rem',backgroundColor:'lightblue',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>The WebSocket offers persistent</div>
            <div style={{maxWidth:'40%',padding:'1rem',margin:'0 0 1.5rem auto',backgroundColor:'#c6c6e6',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>WebSocket communication takes</div>
            <div style={{maxWidth:'40%',padding:'1rem',marginBottom:'1rem',backgroundColor:'lightblue',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>The WebSocket offers persistent</div>
            <div style={{maxWidth:'40%',padding:'1rem',margin:'0 0 1.5rem auto',backgroundColor:'#c6c6e6',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>WebSocket communication takes</div>
            <div style={{maxWidth:'40%',padding:'1rem',marginBottom:'1rem',backgroundColor:'lightblue',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>The WebSocket offers persistent</div>
            <div style={{maxWidth:'40%',padding:'1rem',margin:'0 0 1.5rem auto',backgroundColor:'#c6c6e6',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>WebSocket communication takes</div>
            <div style={{maxWidth:'40%',padding:'1rem',marginBottom:'1rem',backgroundColor:'lightblue',borderBottomRightRadius:'0.75rem',borderTopRightRadius:'0.75rem',borderBottomLeftRadius:'0.75rem'}}>The WebSocket offers persistent</div>
          </div>
        </div>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Type a Message"
            sx={{ width: "38rem", "& input": { height: "5px" } }}
            variant="outlined"
          />
          <SendIcon sx={{ mx: "1rem", "&:hover": { cursor: "pointer" } }} />
          <AddCircleOutlineOutlinedIcon
            sx={{ "&:hover": { cursor: "pointer" } }}
          />
        </Box>
      </div>
    </>
  );
}

export default Chat;
