const express = require('express');
const sendOtp = require('./src/osudpotro'); // sendOtp.js → osudpotro.js

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('OsudPotro OTP API running ✅');
});

// Send OTP endpoint
app.get('/send-otp', async (req, res) => {
  const mobile = req.query.mobile;
  if (!mobile) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  try {
    const response = await sendOtp(mobile);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
