import React from 'react'
import "./Chat.css"
import profile from "../../assets/img/profile.webp";
import { Avatar, Box, TextField } from "@mui/material";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


function Chat() {
  return (
    <>
        <div className='chatting'>
            <div className='chat'>
                <div className='chat1'>
                    <Avatar src={profile} className='avatar' alt="Not Found" sx={{ width: { xs: 54 }, height: { xs: 54}, marginLeft:'-0.6rem'}}/>
                    <div style={{marginLeft:'0.5rem'}}>
                        <h3>Alexander</h3>
                        <p>Online</p>
                    </div>
                </div>
                <PhoneForwardedIcon sx={{ fontSize: 25, '&:hover': { cursor: 'pointer' }}}/>
            </div>
            <div className='content'>
                <div className='content1'>
                    <div className='content2'>
                        The WebSocket offers persistent
                    </div>
                    <div className='content3'>
                        WebSocket communication takes
                    </div>
                    <div className='content2'>
                        The WebSocket offers persistent
                    </div>
                    <div className='content3'>
                        WebSocket communication takes
                    </div>
                    <div className='content2'>
                        The WebSocket offers persistent
                    </div>
                    <div className='content3'>
                        WebSocket communication takes
                    </div>
                    <div className='content2'>
                        The WebSocket offers persistent
                    </div>
                    <div className='content3'>
                        WebSocket communication takes
                    </div>
                    <div className='content2'>
                        The WebSocket offers persistent
                    </div>
                </div>
            </div>
            <Box sx={{marginTop:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <TextField placeholder='Type a Message' sx={{width:'38rem', "& input": { height: "5px" }}} variant="outlined" />
                <SendIcon sx={{mx:'1rem', '&:hover': { cursor: 'pointer' }}}/>
                <AddCircleOutlineOutlinedIcon sx={{'&:hover': { cursor: 'pointer' }}}/>
            </Box>
        </div>
    </>
  )
}

export default Chat