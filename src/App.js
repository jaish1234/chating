import './App.css';
import Signup from './component/Signup-page/Signup';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login1 from './component/login/Login1';
import  Dashboard  from './component/dashoboard-ui/Dashboard';

function App() {
  return (
    <>
      {/* <Login1/> */}
      {/* <Signup/> */}
      <div>
        <Router>
          <Routes>
            <Route index element={<Signup/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login1/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/> 
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
