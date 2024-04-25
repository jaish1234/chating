import React, { useEffect, useState } from "react";
import "./Login1.css";
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import googleImage from "../../assets/img/google.png";

function Login1() {
  const [showPassword, setShowPassword] = useState(false);
  const [value1, setvalue1] = useState({});
  const [errors, seterror] = useState({});
  const [loginError, setLoginError] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("Rememberme") === "true";

    if (rememberMe && email && password) {
      setvalue1({ email, password });
      setChecked(true);
    }
  }, []);

  const HandleOnChange = (e) => {
    setvalue1({ ...value1, [e.target.name]: e.target.value });
    seterror({ ...errors, [e.target.name]: "" });
  };

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

    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        // console.log("firebase response", res);
        const userUid = res?.user?.uid;
        const messaging = getMessaging();

        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
            {
              scope: "/",
            }
          );
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
        Notification.requestPermission()
          .then(async (permission) => {
            if (permission === "granted") {
              getToken(messaging)
                .then((currentToken) => {
                  if (currentToken) {
                    axios
                      .get(`http://192.168.29.203:8080/v1/user/${userUid}`)
                      .then((response) => {
                        const decoded = jwtDecode(response?.data?.token);
                        localStorage.setItem("jwtToken", response?.data?.token);
                        console.log("decode ", decoded);

                        const body = {
                          userId: decoded?.userId,
                          deviceToken: currentToken,
                        };
                        axios
                          .post(
                            "http://192.168.29.203:8080/v1/user/device-token",
                            body
                          )
                          .then((deviceresponse) => {
                            console.log(
                              "Device token Response*****",
                              deviceresponse
                            );
                            navigate("/main_dashboard");
                          })
                          .catch((devicerror) => {
                            console.log("Device error", devicerror);
                          });

                        console.log("User data:", response.data);
                      })
                      .catch((error) => {
                        console.error("Error fetching user data:", error);
                      });
                  } else {
                    console.log("No registration token available.");
                  }
                })
                .catch((error) => {
                  console.error("Error retrieving token: ", error);
                });
            } else {
              console.log("Notification permission denied or blocked.");
            }
          })
          .catch((error) => {
            console.error("Error requesting notification permission: ", error);
          });
      })
      .catch((err) => {
        console.log("firebase error", err);
      });
  };

  const firebaseConfig = {
    apiKey: "AIzaSyAhlQJyVkDteRoSD7PFDcMCiLAAgCBrJ6M",
    authDomain: "auth-login-socket.firebaseapp.com",
    projectId: "auth-login-socket",
    storageBucket: "auth-login-socket.appspot.com",
    messagingSenderId: "601984663844",
    appId: "1:601984663844:web:aa8a0bbb3998dd6488f3b1",
    measurementId: "G-G23R084TFQ",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  function setCookie(name, value, hours) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validate()) {
      const body = {
        email: value1?.email,
        password: value1?.password,
      };
      await axios
        .post("http://192.168.29.203:8080/v1/login/user", body)
        .then((res) => {
          setCookie("jwtToken", res?.data?.token, 24);
          localStorage.setItem("jwtToken", res?.data?.token);

          const decoded = jwtDecode(res?.data?.token);
          console.log("decode ", decoded);

          if (localStorage.getItem("jwtToken")) {
            navigate("/main_dashboard");
          }
          if (checked) {
            localStorage.setItem("email", value1.email);
            localStorage.setItem("password", value1.password);
            localStorage.setItem("Rememberme", true);
          } else {
            localStorage.setItem("Rememberme", false);
          }

          const messaging = getMessaging();
          try {
            const registration = navigator.serviceWorker.register(
              "/firebase-messaging-sw.js",
              {
                scope: "/",
              }
            );
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          } catch (error) {
            console.error("Service Worker registration failed:", error);
          }
          Notification.requestPermission()
            .then(async (permission) => {
              if (permission === "granted") {
                getToken(messaging)
                  .then((currentToken) => {
                    if (currentToken) {
                      console.log("Device Token:", currentToken);

                      const body = {
                        userId: decoded?.userId,
                        deviceToken: currentToken,
                      };
                      axios
                        .post(
                          "http://192.168.29.203:8080/v1/user/device-token",
                          body
                        )
                        .then((deviceresponse) => {
                          console.log(
                            "Device token Response*****",
                            deviceresponse
                          );
                          navigate("/main_dashboard");
                        })
                        .catch((devicerror) => {
                          console.log("Device error", devicerror);
                        });
                    } else {
                      console.log("No registration token available.");
                    }
                  })
                  .catch((error) => {
                    console.error("Error retrieving token: ", error);
                  });
              } else {
                console.log("Notification permission denied or blocked.");
              }
            })
            .catch((error) => {
              console.error(
                "Error requesting notification permission: ",
                error
              );
            });
          toast("User logged in Successfully");
        })
        .catch((err) => {
          console.log(err);
          setLoginError("Login failed. Please check your credentials.");
        });
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
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <input
                    onChange={HandleOnChange}
                    value={value1?.email}
                    name="email"
                    placeholder="enter your Email"
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
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
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

              <Stack direction="column" alignItems="center" spacing={1}>
                <Button
                  onClick={handleGoogleSignIn}
                  style={{
                    color: "#000",
                    background: "#fff",
                    padding: "8px 40px",
                    marginTop: "24px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={googleImage}
                    alt="Google"
                    style={{
                      marginRight: "8px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <span style={{ flex: 1, textAlign: "right" }}>
                    Sign In with Google
                  </span>
                </Button>
              </Stack>
              <button
                className="signin_btn"
                onClick={() => navigate("/signup")}
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
