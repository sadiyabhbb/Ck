const axios = require("axios");

/**
 * Send SMS via Shikho API (supports POST and GET)
 * @param {string} phone - Mobile number with country code
 * @param {string} type - Type of user (default: "student")
 * @returns {Promise<Object>} API response
 */
async function sendShikhoSms(phone = "8801761838316", type = "student") {
  const data = {
    phone,
    type,
    auth_type: "signup",
    vendor: "shikho"
  };

  try {
    const response = await axios.post(
      "https://api.shikho.com/auth/v2/send/sms",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://shikho.com",
          "x-requested-with": "mark.via.gp",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 12; M2010J19CG Build/SKQ1.211202.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.7258.143 Mobile Safari/537.36",
          "Referer": "https://shikho.com/"
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? JSON.stringify(error.response.data) : error.message
    );
  }
}

module.exports = sendShikhoSms;
