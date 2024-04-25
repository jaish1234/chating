import React, { useState } from "react";
import { Avatar, Box } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Header({userPicture}) {

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Box
        sx={{
          background: "#fff",
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
              src={userPicture?.profilePicture}
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
    </div>
  );
}

export default Header;
