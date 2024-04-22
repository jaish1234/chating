import React from 'react'
import window from "../../assets/img/window.png" 
import LockIcon from '@mui/icons-material/Lock';

function WindowScreen() {
  return (
    <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'47.5rem',backgroundColor:'#F0F2F5'}}>
            <div style={{width:'30rem',textAlign:'center',marginTop:'6rem'}}>
                <img src={window} style={{width:'15rem'}} alt='Not Found'/> 

                <p style={{fontSize:'35px',fontWeight:'300',margin:'2rem 0 1rem 0'}}>Download App for Windows</p>

                <p style={{color:'#667781'}}>Make calls, share your screen and get a faster experience when you download the Windows app.</p>

                <button style={{marginTop:'3rem',border:'none',padding:'0.5rem 2rem',borderRadius:'10rem',backgroundColor:'#108a00',color:'white'}}>Get from Microsoft Store</button>  

                <div style={{display:'flex',justifyContent:'center',marginTop:'8rem',color:'#667781'}}>
                    <LockIcon fontSize='small'/>
                    <p>Your personal messages are end-to-end encrypted </p>  
                </div>
            </div>
        </div>
    </>
  )
}

export default WindowScreen