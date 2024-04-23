import axios, { AxiosHeaders } from "axios";

// UserApi

export async function GetUserData() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/users`,
      {
        headers:{
          Authorization:localStorage.getItem("jwtToken")
        }
      }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
}
