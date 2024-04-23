import React, { useState } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

 function Footer() {

    const [message, setMessage] = useState('');
    const [inputIcon, setInputIcon] = useState(<InsertEmoticonIcon />);
  
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      setMessage(inputValue);
  
      // Change input icon based on input length
      if (inputValue.trim().length > 0) {
        setInputIcon(<SendIcon />);
      } else {
        setInputIcon(<InsertEmoticonIcon />);
      }
    };
  
    const sendMessage = () => {
      // Your logic to send the message
      console.log("Sending message:", message);
  
      // Clear the input field and reset the icon
      setMessage('');
      setInputIcon(<InsertEmoticonIcon />);
    };
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
            onChange={handleInputChange}
          />
           <IconButton onClick={sendMessage}>
            {inputIcon}
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Footer;
