import React from 'react'
import "./Window.css"
import window from "../../assets/img/window.png" 
import LockIcon from '@mui/icons-material/Lock';

function WindowScreen() {
  return (
    <>
        <div className='window'>
            <div className='window1'>
                <img src={window} className='window_img' alt='Not Found'/> 

                <p className='download'>Download App for Windows</p>

                <p style={{color:'#667781'}}>Make calls, share your screen and get a faster experience when you download the Windows app.</p>

                <button className='window_btn'>Get from Microsoft Store</button>

                <div className='lock'>
                    <LockIcon fontSize='small'/>
                    <p>Your personal messages are end-to-end encrypted </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default WindowScreen