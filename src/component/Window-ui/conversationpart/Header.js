import React, { useState } from "react";
import { Avatar, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function Header({ selectedData }) {
  
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
          <MoreVertIcon
            style={{
              marginRight: "10px",
              color: "#616161",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <ChatBubbleIcon
            style={{
              marginRight: "10px",
              color: "#616161",
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </Box>
  );
}

export default Header;
