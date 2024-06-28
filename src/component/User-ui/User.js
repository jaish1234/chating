import React, { useEffect, useState } from "react";
import { Avatar, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import axios from "axios";

function User({ setCurrentChat, setSelectedData, user, connectWebSocket, setReceiverMessages, userProfile, receiverMessages }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userProfile && userProfile.userId) {
      user.forEach((item) => {
        fetchLastMessage(item);
      });
    }

    if (receiverMessages.length > 0) {
      const lastMessage = receiverMessages[receiverMessages.length - 1];
      const userId = lastMessage.senderId === userProfile.userId
        ? lastMessage.receiverId
        : lastMessage.senderId;
      const userToUpdate = user.find(u => u.userId === userId);
      if (userToUpdate) {
        userToUpdate.lastMessage = lastMessage;
      }
    }
  }, [userProfile, user, userProfile?.userId]);

  const filteredUsers = Array.isArray(user)
    ? user.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleOnClickChat = (data) => {
    setCurrentChat(true);
    setSelectedData(data);
    connectWebSocket(data);
    setReceiverMessages([])
    fetchLastMessage(data)
  };

  const fetchLastMessage = (data) => {
    axios
    .get(
      `http://192.168.29.203:8080/v1/get/messages?userId1=${userProfile?.userId}&userId2=${data?.userId}`,
      {
        headers: {Authorization: localStorage.getItem("jwtToken")},
      }
    )
    .then((response) => {
      const messages = response.data?.[0]?.messages;
      setReceiverMessages(messages);
      if (messages && messages.length > 0) {
        data.lastMessage = messages[messages.length - 1];
      }
    })
    .catch((error) => {
      console.log("Error fetching messages:", error);
    });
  }

  return (
    <div>
      <Box sx={{ width: "100%", background: "#fff", padding: "10px" }}>
        <Box sx={{ width: "23%", background: "#fff", "@media (max-width: 600px)": { width: "100%" }}}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <TextField fullWidth placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { background: "#eceff1", width: "21rem", padding: "0", height: "auto" },
                }}
              />
            </div>
            <div style={{ marginLeft: "12px" }}>
              <FilterListOutlinedIcon />
            </div>
          </div>
        </Box>

        <div style={{ overflowY: "scroll", height: "calc(78.3vh - 20px)" }}>
          {filteredUsers.map((item, index) => (
            <div key={index} onClick={() => handleOnClickChat(item, index)}
              style={{ display: "flex", lignItems: "center", justifyContent: "space-between", marginTop: "12px", borderBottome: "1px solid #000", cursor: "pointer", padding: "10px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>

              <Avatar src={item?.profilePicture} sx={{ width: 50, height: 50, marginRight: "10px" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0", marginBottom: "2px",  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",}}>
                  {item?.username}
                </p>
                <p style={{ fontSize: "14px", color: "#888", margin: "0", textOverflow: 'ellipsis', overflow:'hidden', width:'10rem', whiteSpace:'nowrap' }}>
                  {item.lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default User;