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
