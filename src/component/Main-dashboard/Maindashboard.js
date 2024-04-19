import React from "react";
import Dashboard from "../dashoboard-ui/Dashboard";
import WindowScreen from "../window-screen/Window";
import { Box } from "@mui/material";

function Maindashboard() {
  return (
    <>
      <div>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
            <Dashboard />
          </div>
          <div style={{width:'74rem'}}>
            <WindowScreen />
          </div>
        </Box>
      </div>
    </>
  );
}

export default Maindashboard;
