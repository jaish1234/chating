import React from "react";

import { Box } from "@mui/material";

import Window from "../Window-ui/Window"
import Admin from "../User-ui/Admin";

function Maindashboard() {
  return (
    <>
      <div style={{ overflowY: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <div style={{ width: "26rem" }}>
           <Admin/>
          </div>
          <div style={{ width: "74rem" }}>
            <Window />
          </div>
        </Box>
      </div>
    </>
  );
}

export default Maindashboard;
