const axios = require('axios');

async function sendOtp(mobileNumber) {
  try {
    const response = await axios.post(
      'https://api.osudpotro.com/api/v1/users/send_otp',
      {
        mobile: mobileNumber,
        deviceToken: "web",
        language: "bn",
        os: "web"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://osudpotro.com',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2010J19CG Build/SKQ1.211202.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.7258.143 Mobile Safari/537.36',
          'X-Requested-With': 'mark.via.gp'
          // 'Authorization': 'Bearer <token>'  // যদি লাগে uncomment করো
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

module.exports = sendOtp;
