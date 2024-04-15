import React, { useEffect, useState } from "react";
import "./Login1.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import google from "../../assets/img/google.png";
import { auth, provider } from "./Loginconfig";
import { signInWithPopup } from "firebase/auth";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login1() {
  
  const [showPassword, setShowPassword] = useState(false); // password
  const [value1, setvalue1] = useState({}); //login button throw login to validation
  const [errors, seterror] = useState({}); //login button throw login to validation
  const [value, setValue] = useState(""); // Firebase state
  const [checked, setChecked] = useState(false);
  
  // Remember functionality
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("Rememberme") === "true";
    
    if (rememberMe && email && password) {
      setvalue1({ email, password });
      setChecked(true);
    }
  }, []);
  
  const Signpage = useNavigate();
  
  const HandleOnChange = (e) => {
    setvalue1({ ...value1, [e.target.name]: e.target.value });
    seterror({ ...errors, [e.target.name]: "" });
  }

  const Validate = () => {
    let errors = {};
    const mailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!value1?.email) {
      errors.email = "Email Required";
    } else if (!mailregex.test(value1?.email)) {
      errors.email = "Invalid Email Address";
    }

    if (!value1?.password) {
      errors.password = "please enter your password";
    } else if (value1?.password.length < 8) {
      errors.password = "password must be more than 8 char";
    } else if (!passwordRegex.test(value1.password)) {
      errors.password =
        "Password must meet criteria: password must be more than 8 char least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Remember functionality
    if (checked) {
      localStorage.setItem("email", value1.email);
      localStorage.setItem("password", value1.password);
      localStorage.setItem("Rememberme", true);
    } else {
      localStorage.setItem("Rememberme", false);
    }

    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  // Firebase -> Continue with Google
  const handleClick = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userUid = result.user;
        setValue(userUid);
        const uid = userUid.uid;
        localStorage.setItem("uid", uid);
        console.log("uiddata", uid);
        // const userEmail = userUid.email;

        const uid1 = {
          uid: uid,
        };
        axios
          .get(`http://192.168.29.203:8080/v1/user/${uid}`, uid1)
          .then((response) => {
            console.log("uid", response.data);
          })
          .catch((err) => {
            console.log("axios error", err);
          });
      })
      .catch((err) => {
        console.log("firebase error", err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // login api calling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validate()) {
      const body = {
        email: value1?.email,
        password: value1?.password,
      };
      // console.log("body", body);
      await axios
        .post("http://192.168.29.203:8080/v1/login/user", body)
        .then((res) => {
          console.log("res", res);
          console.log("apidata", res.data.message);
        })
        .catch((err) => {
          console.log(err);
          // signup error set
          setValue("Login failed. Please check your credentials.");
        });
      toast("Useer logged in Successfully");
      console.log("value1", value1);
    } else {
      console.log("validation fails, Error", errors);
    }
  };

  
  return (
    <>
      <div className="login">
        <div className="lmain">
          <div className="log2">
            <div className="log3">
              <form action="" onSubmit={(e) => handleSubmit(e)}>
                <p className="log4">Login</p>
                <div className="c3">
                  <div className="c4">
                    <span class="material-symbols-outlined">person</span>
                  </div>
                  <input
                    onChange={HandleOnChange}
                    value={value1?.email}
                    name="email"
                    placeholder="enter youre Email"
                  />
                </div>
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <FormControl
                  sx={{ width: "21.8rem", mt: 2.5 }}
                  variant="outlined"
                >
                  <OutlinedInput
                    placeholder="Password"
                    sx={{ height: "2.1rem" }}
                    value={value1?.password}
                    name="password"
                    onChange={HandleOnChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors?.password && (
                  <p style={{ color: "red" }}>{errors?.password}</p>
                )}

                <FormGroup sx={{ margin: "1rem 0 0 3rem" }}>
                  <FormControlLabel
                    control={<Checkbox checked={checked} />}
                    onChange={(e) => setChecked(e.target.checked)}
                    label="Remember Me"
                  />
                </FormGroup>

                <button className="conti" type="submit">
                  Continue with Email
                </button>
                {value && <p style={{ color: "red" }}>{value}</p>}
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  closeOnClick
                  rtl={false}
                />
              </form>
            </div>

            <div className="log5">
              <hr className="hr"></hr>
              <p id="or">or</p>

              <div className="google">
                <img className="google1" src={google} alt="not found" />

                {value ? (
                  <button onClick={handleLogout} className="google2" type="button">
                    Logout
                  </button>
                ) : (
                  <button type="button" onClick={handleClick} className="google2">
                    Continue with Google
                  </button>
                )}
              </div>
              <button
                className="signin_btn"
                onClick={() => Signpage("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login1;
