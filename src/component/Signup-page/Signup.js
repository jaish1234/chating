import React, { useState } from "react";
import "./Signup.css";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Avatar, Stack} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate} from "react-router-dom";
import profile from "../../assets/img/profile.webp";
import axios from "axios";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  }

  const Validation = () => {
    let error = {};
    const mailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!values.username) {
      error.username = "Please enter your Username";
    }

    if (!values.email) {
      error.email = "Email Required";
    } else if (!mailregex.test(values.email)) {
      error.email = "Invalid Email Address";
    }

    if (!values.phone) {
      error.phone = "Please enter your number";
    } else if (values.phone.length < 10) {
      error.phone = "Mobile number must be more than 10 characters";
    }

    if (!values.password) {
      error.password = "Please enter your password";
    } else if (values.password.length < 8) {
      error.password = "Password must be more than 8 characters";
    } else if (!passwordRegex.test(values.password)) {
      error.password =
        "Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!values.conpassword) {
      error.conpassword = "Please enter your confirm password";
    } else if (values.password !== values.conpassword) {
      error.conpassword = "Passwords do not match";
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  }

  const handleKeyDown = (e) => {
    const key = e.key;
    const phoneregex = /[0-9]|Backspace|Delete/;
    if (!phoneregex.test(key)) {
      e.preventDefault();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validation()) {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phone);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.conpassword);
      formData.append("profilePicture", values?.profilePicture);

      await axios
        .post("http://192.168.29.203:8080/v1/register/user", formData)
        .then((response) => {
          console.log("response", response);
          setValues({
            username: "",
            email: "",
            phone: "",
            password: "",
            conpassword: "",
            profilePicture: null,
          });
          navigate("/dashboard")
        })
        .catch((error) => {
          console.log("error", error);
        });
      console.log("values", values);
      toast("User registered successfully");
    } else {
      console.log("validation fails, Error");
    }
  }

  return (
    <>
      <div className="signup">
        <div className="sign">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                style={{ justifyContent: "center", position: "relative" }}
              >
                {values?.profilePicture ? (
                  <Avatar
                    src={URL.createObjectURL(values?.profilePicture)}
                    sx={{ width: 74, height: 74 }}
                  />
                ) : (
                  <Avatar
                    src={profile}
                    alt="Not Found"
                    sx={{ width: 94, height: 94 }}
                  />
                )}
                <IconButton
                  component="label"
                  htmlFor="profilePhotoInput"
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 0,
                    right: "166px",
                  }}
                >
                  <CameraAltIcon />
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleOnChange(e)}
                    style={{ display: "none" }}
                    name="profilePicture"
                  />
                </IconButton>
              </Stack>

              <TextField
                onChange={(e) => handleOnChange(e)}
                name="username"
                value={values?.username}
                placeholder="UserName"
                sx={{
                  mt: 4,
                  width: "100%",
                  maxWidth: "20rem",
                  "& input": { height: "5px" },
                }}
              />
              {errors?.username && (
                <p style={{ color: "red" }}>{errors?.username}</p>
              )}

              <TextField
                name="email"
                placeholder="Email"
                onChange={(e) => handleOnChange(e)}
                value={values?.email}
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "20rem",
                  "& input": { height: "5px" },
                }}
              />
              {errors?.email && <p style={{ color: "red" }}>{errors?.email}</p>}

              <TextField
                name="phone"
                placeholder="Phone no"
                inputProps={{ maxLength: 10 }}
                onChange={handleOnChange}
                value={values?.phone}
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "20rem",
                  "& input": { height: "5px" },
                }}
                variant="outlined"
                onKeyDown={(e) => handleKeyDown(e)}
              />
              {errors?.phone && <p style={{ color: "red" }}>{errors?.phone}</p>}

              <FormControl sx={{ width: "20rem", mt: 2 }} variant="outlined">
                <OutlinedInput
                  placeholder="Password"
                  value={values?.password}
                  name="password"
                  sx={{
                    width: "100%",
                    maxWidth: "20rem",
                    "& input": { height: "5px" },
                  }}
                  onChange={handleOnChange}
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
              {errors.password && (
                <p style={{ color: "red" }}>{errors?.password}</p>
              )}
              <FormControl sx={{ width: "20rem", mt: 2 }} variant="outlined">
                <OutlinedInput
                  placeholder="C Password"
                  name="conpassword"
                  onChange={handleOnChange}
                  value={values?.conpassword}
                  sx={{
                    width: "100%",
                    maxWidth: "20rem",
                    "& input": { height: "5px" },
                  }}
                  type={showConPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConPassword((show1) => !show1)}
                      >
                        {showConPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors?.conpassword && (
                <p style={{ color: "red" }}>{errors?.conpassword}</p>
              )}
            </Box>
            <button type="submit" className="sign_btn">
              Sign up
            </button>
            <ToastContainer
              position="top-center"
              autoClose={4000}
              closeOnClick
              rtl={false}
            />
          </form>
          <p className="log_link">
            Already have an account?
            <Link to={"/login"}> Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
