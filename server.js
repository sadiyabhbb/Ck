const express = require('express');
const sendOtp = require('./src/osudpotro'); // OsudPotro OTP
const sendShikhoSms = require('./src/shikho'); // Shikho SMS

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Server running ✅');
});

// =========================
// OsudPotro OTP API
// =========================
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

// =========================
// Shikho SMS API
// =========================

// POST request
app.post('/send-sms', async (req, res) => {
  const phone = req.body.phone;
  const type = req.body.type;

  try {
    const response = await sendShikhoSms(phone, type);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET request (browser friendly)
app.get('/send-sms', async (req, res) => {
  const phone = req.query.phone;
  const type = req.query.type;

  try {
    const response = await sendShikhoSms(phone, type);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
