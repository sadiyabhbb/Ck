const sendOtp = require('./sendOtp');

const info = {
  apiName: "OsudPotro OTP API",
  author: "YourName",
  description: "Send OTP from OsudPotro API"
};

async function getApiInfo(mobileNumber) {
  let responseData = null;

  if (mobileNumber) {
    try {
      responseData = await sendOtp(mobileNumber);
    } catch (err) {
      responseData = { error: err.message };
    }
  }

  return {
    ...info,
    lastResponse: responseData
  };
}

module.exports = getApiInfo;
