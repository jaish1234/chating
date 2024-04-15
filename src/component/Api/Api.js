import axios  from "axios";

// UserApi

export async function GetUserData(id) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/users${id}`
    );
    console.log("response",response);
    return response;
  } catch (error) {
    throw error;
  }
}
