// src/mimis.js
const axios = require("axios");

const headers = {
  "sec-ch-ua": '"Not;A=Brand";v="99", "Android WebView";v="139", "Chromium";v="139"',
  "sec-ch-ua-mobile": "?1",
  "sec-ch-ua-platform": '"Android"',
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Linux; Android 12; M2010J19CG Build/SKQ1.211202.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.7258.143 Mobile Safari/537.36",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "dnt": "1",
  "x-requested-with": "mark.via.gp",
  "sec-fetch-site": "none",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "en-US,en;q=0.9",
  // সব cookies একত্রিত করে পাঠানো
  "cookie": `pys_start_session=true; pys_first_visit=true; pysTrafficSource=google.com; pys_landing_page=https://www.mimsms.com/; last_pysTrafficSource=google.com; last_pys_landing_page=https://www.mimsms.com/; _fbp=fb.1.1756666009286.6200100102; pbid=f259622f9e936e6639e5ad114970552418ffec6a13cfccf021bb4ac91fbee2bc; WHMCSYVUpwx4aSYdQ=209db06fb5e4b5809cfd84ea6024d824; __utma=113560987.1701700097.1756666096.1756666096.1756666096.1; __utmc=113560987; __utmz=113560987.1756666096.1.1.utmcsr=mimsms.com|utmccn=(referral)|utmcmd=referral|utmcct=/; TawkConnectionTime=0; twk_uuid_58ebb585f7bbaa72709c57d8=%7B%22uuid%22%3A%221.1hHcKnnxwgrcTbrl1sGBU8TcECZ2o9Nrufz9VSRzAnjuNDKfhtL15RFoDtaqnupGeB9NE56QJrsaON8tJ8VcmlG5S6jNwT2xh9RPbQRU5z9r0ZrXt1u%22%2C%22version%22%3A3%2C%22domain%22%3A%22mimsms.com%22%2C%22ts%22%3A1756668454782%7D`
};

/**
 * Send MimSMS call
 * @param {string} phone - full phone number with country code, e.g. +8801761838316
 * @returns {Promise<Object>} - { success: true/false, data/message }
 */
async function sendWithRetry(phone) {
  try {
    const encodedPhone = encodeURIComponent(phone);
    const url = `https://billing.mimsms.com/index.php?m=smsmanager&action=request&request_type=call&guest=1&phonenumber=${encodedPhone}&country=bd&countrycode=880&icphone=${encodedPhone}`;

    const response = await axios.get(url, { headers });

    // যদি response status ok বা expected html/text আসে
    if (response.status === 200) {
      return { success: true, data: "Call/SMS triggered" };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {
    return {
      success: false,
      data: error.response ? error.response.data : error.message
    };
  }
}

module.exports = { sendWithRetry };
