// src/components/GenerateOTP.js
import React, { useState } from 'react';
import axios from 'axios';

const GenerateOTP = ({ setSecret }) => {

  const [qrCode, setQrCode] = useState('');

  const handleGenerateOTP = async () => {
    console.log('in handleGenerateOTP');
    const response = await axios.post('http://localhost:3001/generate-time-based-otp');
    //alert('Generate OTP ' +response.data.otp);
    console.log('Generate OTP => ', response.data.otp);
    setSecret(response.data.secret);
    setQrCode(response.data.qrCode);
  };

  return (
    <div>
      <button onClick={handleGenerateOTP}>Generate OTP 3</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default GenerateOTP;
