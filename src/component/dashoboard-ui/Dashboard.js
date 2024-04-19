import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
// import { GetUserData } from "../Api/Api";

function Dashboard() {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   AddUser();
  // }, []);

  // const AddUser = async () => {
  //   GetUserData()
  //     .then((response) => {
  //       console.log("Response:", response); 
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error); 
  //     });
  // };

  return (
    <div>
      <Box
        sx={{
          width: "25%",
          background: "#eceff1",
          padding: "10px",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Avatar
              src=""
              sx={{ width: 50, height: 50, marginRight: "10px" }}
            />
          </div>
          <div>
            <PeopleOutlineIcon
              style={{
                marginRight: "10px",
                color: "#616161",
                fontSize: "28px",
              }}
            />
            <AutorenewIcon
              style={{
                marginRight: "10px",
                color: "#616161",
                fontSize: "28px",
              }}
            />
            <CreateNewFolderOutlinedIcon
              style={{
                marginRight: "10px",
                color: "#616161",
                fontSize: "28px",
              }}
            />
            <MoreVertIcon
              style={{
                marginRight: "10px",
                color: "#616161",
                fontSize: "28px",
              }}
            />
          </div>
        </div>
      </Box>
      <Box
        sx={{
          width: "23%",
          background: "#fff",
          padding: "10px",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <TextField
              fullWidth
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
                  // color: "#fff",
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

        <div style={{ display: "flex", marginTop: "12px" }}>
          <div>
            <Avatar
              src=""
              sx={{ width: 50, height: 50, marginRight: "10px" }}
            />
          </div>

          <div style={{ marginLeft: "2px" }}>
            <p style={{ fontSize: "20px", textTransform: "capitalize" }}>
              Jaish
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Dashboard;
