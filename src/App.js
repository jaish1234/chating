import './App.css';
import Signup from './component/Signup-page/Signup';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login1 from './component/login/Login1';

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
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
