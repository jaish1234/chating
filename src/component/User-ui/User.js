import React, { useState } from "react";
import { Avatar, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import axios from "axios";

function User({ setCurrentChat, setSelectedData, user, connectWebSocket, setReceiverMessages, userProfile, receiverMessages }) {
  const [searchTerm, setSearchTerm] = useState("");

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
        // console.log("vgfvdtguyghuihuijh", response);
      })
      .catch((error) => {
        console.log("Error fetching messages:", error);
      });
  };
  // console.log("receiverMessages in response ++: ", receiverMessages);  

  return (
    <div>
      <Box sx={{ width: "100%", background: "#fff", padding: "10px" }}>
        <Box
          sx={{
            width: "23%",
            background: "#fff",
            "@media (max-width: 600px)": { width: "100%" },
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <TextField
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    background: "#eceff1",
                    width: "21rem",
                    padding: "0",
                    height: "auto",
                  },
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
            <div
              key={index}
              style={{
                display: "flex",
                lignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
                borderBottome: "1px solid #000",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={() => handleOnClickChat(item, index)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Avatar
                src={item?.profilePicture}
                sx={{ width: 50, height: 50, marginRight: "10px" }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "0",
                    marginBottom: "2px", 
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.username}
                </p>
                {/* <p style={{ fontSize: "14px", color: "#777", margin: "0" }}>
                {item?.message && item?.message.length > 20
                  ? item?.message.substring(0, 20) + "..."
                  : item?.message}
              </p> */}
                <p>message...</p>
                {/* <p
                  style={{
                    fontSize: "14px",
                    color: "#888",
                    margin: "0",
                    marginTop: "5px",
                  }}
                >
                  {receiverMessages?.[0]?.content}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default User;
