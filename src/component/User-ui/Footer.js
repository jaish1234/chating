import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        //   backgroundColor: "#128C7E",
        color: "#008069",
        padding: "0px 20px",
        borderRadius: "10px",

        width: "fit-content",
        marginLeft: "15px",
      }}
    >
      <WhatsAppIcon style={{ fontSize: "30px", marginRight: "5px"  ,  background:"#25D366",color:"#fff"}} />
      <p style={{ marginLeft: "10px", fontSize: "20px" ,}}>
        Get WhatsApp for Windows
      </p>
    </div>
  );
}

export default Footer;
