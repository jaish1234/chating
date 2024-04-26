import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Header({ userProfile, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
              src={userProfile?.profilePicture}
              sx={{ width: 50, height: 50, marginRight: "10px" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <IconButton>
              <PeopleOutlineIcon
                style={{
                  color: "#616161",
                  fontSize: "28px",
                }}
              />
            </IconButton>
            <IconButton>
              <AutorenewIcon
                style={{
                  color: "#616161",
                  fontSize: "28px",
                }}
              />
            </IconButton>
            <IconButton>
              <CreateNewFolderOutlinedIcon
                style={{
                  color: "#616161",
                  fontSize: "28px",
                }}
              />
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon
                style={{
                  color: "#616161",
                  fontSize: "28px",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} sx={{ width: "10rem" }}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Header;
