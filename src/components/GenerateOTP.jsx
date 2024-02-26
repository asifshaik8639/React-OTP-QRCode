// src/components/GenerateOTP.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import '../assets/login-page.css';

const GenerateOTP = forwardRef(({ setSecret, setQrCode, ref }) => {

  const handleGenerateOTP = async () => {
    console.log('in handleGenerateOTP');
    const response = await axios.post('http://localhost:3001/send-otp-with-twilio');
    //alert('Generate OTP ' +response.data.otp);
    console.log('Generate OTP => ', response.data.otp);
    setSecret(response.data.secret);
    setQrCode(response.data.qrCode);
  };

    // Expose the function using useImperativeHandle
    useImperativeHandle(ref, () => ({
      handleGenerateOTP
    }));

  return (
    <div className='login-btn-container'>
      <button onClick={() => handleGenerateOTP()}>Login</button>
    </div>
  );
});;

export default GenerateOTP;
