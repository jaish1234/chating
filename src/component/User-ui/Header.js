import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

function Header() {
  return  (
    <div style={{ position: "sticky", top: 0, zIndex: 1000, }}>
      <Box
        sx={{
          background: "#F0F2F5",
          padding: "10px",
          "@media (max-width: 600px)": { width: "100%", height: "100%" },
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
          <div style={{ display: "flex" }}>
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
          "@media (max-width: 600px)": { width: "100%" },
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
                  width: "22rem",
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
    </div>
  );
}

export default Header;
