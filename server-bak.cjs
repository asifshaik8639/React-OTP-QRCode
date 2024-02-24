import express from 'express';
import bodyParser from 'body-parser';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Endpoint to generate and provide a new secret for a user
app.post('/generate-secret', (req, res) => {
  const secret = speakeasy.generateSecret();
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: 'MyApp',
    algorithm: 'sha1',
  });

  QRCode.toDataURL(otpauthUrl, (err, dataUrl) => {
    if (err) throw err;
    res.json({ secret: secret.base32, qrCode: dataUrl });
  });
});

// Endpoint to verify the provided OTP
app.post('/verify-otp', (req, res) => {
  const { secret, otp } = req.body;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp,
    window: 1,
  });

  res.json({ verified });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
