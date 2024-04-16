export const createDeviceToken = async (token) => {
  try {
    const deviceToken = generateDeviceToken();

    console.log("Device Token:", deviceToken);
  } catch (error) {
    console.error("Error generating device token:", error);
  }
};

// Function to generate a unique device token
const generateDeviceToken = () => {
  const deviceToken = Math.random().toString(36).substr(2, 10);
  return deviceToken;
};
