// src/components/VerifyOTP.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ secret }) => {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleVerifyOTP = async () => {
    console.log('in handleVerifyOTP with secret => ', secret);
    const response = await axios.post('http://localhost:3001/verify-otp', { secret, otp });
    console.log('response from handleVerifyOTP in the UI => ', response);
    setIsValid(response.data.isValid);
  };

  return (
    <div>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {isValid !== null && (
        <div>{isValid ? 'OTP is valid' : 'OTP is not valid'}</div>
      )}
    </div>
  );
};

export default VerifyOTP;
