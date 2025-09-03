const express = require('express');
const sendOtp = require('./src/sendOtp');
const getApiInfo = require('./src/info');

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

// API Info endpoint
app.get('/api-info', async (req, res) => {
  const mobile = req.query.mobile || null; // mobile optional
  try {
    const info = await getApiInfo(mobile);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
