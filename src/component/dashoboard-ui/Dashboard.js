import React, { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";

import { GetUserData } from "../Api/Api";

function Dashboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    AddUser();
  }, []);

  const AddUser = async () => {
    GetUserData()
      .then((response) => {
        console.log("Response:", response);
        setUser(response?.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      <Box
        sx={{
          width: "23%",
          background: "#fff",
          padding: "10px",
          "@media (max-width: 600px)": { width: "100%" },
        }}
      >
        {user.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              borderBottome: "1px solid #000",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Avatar
              src={item?.profilePicture}
              sx={{ width: 50, height: 50, marginRight: "10px" }}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "0",
                  marginBottom: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item?.username}
              </p>
              <p style={{ fontSize: "14px", color: "#777", margin: "0" }}>
                {item?.message && item?.message.length > 20
                  ? item?.message.substring(0, 20) + "..."
                  : item?.message}
              </p>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
}

export default Dashboard;
