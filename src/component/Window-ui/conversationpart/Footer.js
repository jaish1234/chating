import React from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { IconButton, TextField } from '@mui/material';

 function Footer() {
  return (
    <div>
         <div
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          background: "#F0F2F5",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <TextField
            placeholder="Type a message"
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          />
          <IconButton>
            <KeyboardVoiceIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Footer;
