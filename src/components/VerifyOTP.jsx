// src/components/VerifyOTP.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ secret, 
                     qrCode, 
                     mobileNumber, 
                     setSecret, 
                     setQrCode,
                     handleRegenerateOTP }) => {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleVerifyOTP = async () => {
    console.log('in handleVerifyOTP UI with otp => ', otp);
    console.log('in handleVerifyOTP UI with secret => ', secret);
    const response = await axios.post('http://localhost:3001/verify-otp', { secret, otp });
    console.log('response from handleVerifyOTP in the UI => ', response);
    setIsValid(response.data.isValid);
  };

  const onEditPhoneNumberHandler = (event) => {
    setSecret(null);
    setQrCode(null);
  };

  useEffect(() => {
    setOtp('');
    setIsValid(null);
  }, [secret, qrCode]);

  console.log('in verify OTP Component');

  return (
    <div className='verify-otp-container'>

      <div className='edit-number-section'>
          <input type="number" value={mobileNumber} readOnly disabled />
          <span className='login-num-edit-cls' 
                onClick={(e) => onEditPhoneNumberHandler(e) } > edit</span>
          <button onClick={(e) => handleRegenerateOTP(e)}>Resend OTP</button>
      </div>

      <div className='verify-otp-section'>
        <input type="text" value={otp} placeholder='Enter OTP'
          onChange={(e) => setOtp(e.target.value)} />
        <button onClick={() => handleVerifyOTP()}>Verify and Login</button>
      </div>
      {
       isValid !== null && 
          (
            <div className='otp-status-cls' >{isValid ? 'OTP is valid' : 'Entered OTP is not valid'}</div>
          )
      }
    </div>
  );
};

export default VerifyOTP;
