// src/App.js
import React, { useState, useRef } from 'react';
// import GenerateOTP from './components/GenerateOTP';
import VerifyOTP from './components/VerifyOTP';
// import axios from 'axios';
import './assets/login-page.css';

function App() {
  
  const [secret, setSecret] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');

  const onMobileNumberInputHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleGenerateOTP = async () => {
    console.log('in handleGenerateOTP');

    await fetch('http://localhost:3001/send-otp-with-twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      // Add the request body if needed
      // body: JSON.stringify({ key: 'value' }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); 
    })
    .then(result => {
      // Handle the data
      setSecret(result.secret);
      setQrCode(result.qrCode);
      console.log(result);
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });

  };

  return (
      <div className='page-container'>
            {
                !secret  ?
                <div className='login-parent-container'>
                    <div className='login-mnumber-section'>
                        <h2>Login</h2>
                        <div>
                          <label htmlFor="mnumber" required>Mobile number: </label>
                          <input type="text" value={mobileNumber} 
                                required 
                                onInput={(e) => onMobileNumberInputHandler(e)}/>
                        </div>
                    </div>
                    <div className='login-btn-container'>
                      <button onClick={() => handleGenerateOTP()}>Login</button>
                    </div>
                </div>
                :
                <div>
                    {
                      secret && <VerifyOTP 
                                secret={secret} 
                                qrCode={qrCode}
                                setSecret={setSecret}
                                setQrCode={setQrCode}
                                mobileNumber={mobileNumber}
                                handleRegenerateOTP={() => handleGenerateOTP()}
                                />
                    }
                </div>
            }
            {
              qrCode !== null && 
                  <div className='qrcode-section'>
                        <p className=''>If you are facing any issues with the OTP, as an alternate you can scan the below QRCode to get the OTP to login.</p>
                        
                        { <img src={qrCode} alt="QR Code" />}
                  </div>
            }
      </div>
  );
}

export default App;
