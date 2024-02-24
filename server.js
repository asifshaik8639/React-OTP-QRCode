import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

// Your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asif.testshaik@gmail.com',
    pass: 'nvxl vlfy ekvr utey' // 'cdyi yimr nmpz bcwn',
  },
});

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Add your allowed origin(s)
  credentials: true // If you're using credentials (cookies, headers, etc.)
}));

app.post('/generate-otp-basic', (req, res) => {
  // Generate a secret key
  const secret = speakeasy.generateSecret();
  res.json({ secret: secret.base32 });
});

app.post('/generate-time-based-otp', (req, res) => {
  const secret = speakeasy.generateSecret({ time: 30 });
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });
  const otpauthUrl = speakeasy.otpauthURL({ secret: secret.ascii, label: 'MyApp', algorithm: 'sha1' });
  
  QRCode.toDataURL(otpauthUrl, (err, dataUrl) => {
    if (err) throw err;
    res.json({ secret: secret.base32, qrCode: dataUrl , otp: otp });
  });
});

// Endpoint to generate and send OTP
app.post('/generate-and-send-otp-to-email', (req, res) => {

  // Generate a new secret and OTP
  const secret = speakeasy.generateSecret();
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  console.log('in server and otp', otp);

  // Send OTP to the user's email
  const userEmail = 'asif.shaik8639@gmail.com' || req.body.email; // req.body.email; // Assuming email is sent in the request body
  const mailOptions = {
    from: 'asif.testshaik@gmail.com',
    to: userEmail,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('OTP sent to your email');
  });


});

app.post('/github-webhook', (req, res) => {
  const eventKey = req.headers['x-event-key'];
  const payload = req.body;

  console.log('Successfully recieved payload from github', payload);

  if (eventKey === 'repo:push') {
    console.log('Bitbucket Push Event received:', payload);
    // Handle push event logic here
  }

  res.status(200).send('Bitbucket Webhook received successfully.');
});



app.post('/verify-otp', (req, res) => {
  const { secret, otp } = req.body;
  const isValid = speakeasy.totp.verify({ secret, encoding: 'base32', token: otp });
  console.log('server respone after verifying OTP', isValid);
  res.json({ isValid });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});