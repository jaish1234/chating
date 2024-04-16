import { useEffect } from "react";
import "./App.css";
// import Chat from './component/Chatpart/Chat';
import Signup from "./component/Signup-page/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login1 from "./component/login/Login1";
import { getToken } from "firebase/messaging";
import { messaging } from "./component/login/Loginconfig";
import Dashboard from  "./component/dashoboard-ui/Dashboard";
// import Window from './component/window-screen/Window';

function App() {

  useEffect(() => {
    // Request permission to receive notifications and get FCM token
      getToken(messaging, { vapidKey: 'BCxf0ciwnbQcMKY8pw2co8tfaK2mZlEkdKaZ3EK8rPrkUXK63SHzwtBnlGZz_p-VrIDjHpdm2rgd17VnqT3npGc' }) // Replace 'your-actual-vapid-key' with your VAPID key
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM token:", currentToken);
        } else {
          console.log("No FCM token available.");
        }
      })
      .catch((error) => {
        console.error("Error obtaining FCM token:", error);
      });
  }, []);

  return (
    <>
      {/* <Login1/> */}
      {/* <Signup/> */}
      {/* <Window/> */}
      {/* <Chat/> */}
      <div>
        <Router>
          <Routes>
            <Route index element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login1 />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
