const axios = require("axios");

/**
 * Send OTP via Bikroy API
 * @param {string} phone - Mobile number with country code
 * @returns {Promise<Object>} API response
 */
async function sendBikroyOtp(phone) {
  if (!phone) throw new Error("Mobile number is required");

  try {
    const response = await axios.post(
      `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${phone}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://bikroy.com",
          "Referer": "https://bikroy.com/",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 12; M2010J19CG Build/SKQ1.211202.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.7258.143 Mobile Safari/537.36",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? JSON.stringify(error.response.data) : error.message
    );
  }
}

module.exports = sendBikroyOtp;
