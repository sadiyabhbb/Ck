const express = require("express");
const sendOtp = require("./src/osudpotro");    // OsudPotro OTP
const sendShikhoSms = require("./src/shikho"); // Shikho SMS
const sendBikroyOtp = require("./src/bikroy"); // Bikroy OTP
const { sendWithRetry: sendMimisCall } = require("./src/mimis"); // MimSMS Call

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.send("Unified SMS/OTP Server running ✅");
});

// =========================
// Unified send endpoint
// =========================
app.all("/send", async (req, res) => {
  const number = req.query.number || req.body.number;
  const amount = parseInt(req.query.amount || req.body.amount) || 1;
  const type = req.query.type || req.body.type || "student"; // default auto

  if (!number) return res.status(400).json({ error: "Mobile number is required" });

  const results = [];

  for (let i = 0; i < amount; i++) {
    try {
      // OsudPotro OTP
      const otpResponse = await sendOtp(number);

      // Shikho SMS
      const smsResponse = await sendShikhoSms(number, type);

      // Bikroy OTP
      const bikroyResponse = await sendBikroyOtp(number);

      // MimSMS Call
      const mimisResponse = await sendMimisCall(number);

      results.push({
        attempt: i + 1,
        otp: otpResponse,
        sms: smsResponse,
        bikroy: bikroyResponse,
        mimis: mimisResponse
      });
    } catch (err) {
      results.push({
        attempt: i + 1,
        error: err.message
      });
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
