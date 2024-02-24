// src/components/GenerateSecret.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const GenerateSecret = ({ setSecret }) => {
  const [qrCode, setQrCode] = useState('');

  const handleGenerateSecret = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-secret');
      setSecret(response.data.secret);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating secret:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Generate Secret</h2>
      <button className="btn btn-primary" onClick={handleGenerateSecret}>
        Generate Secret
      </button>
      {qrCode && <img className="mt-3" src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default GenerateSecret;
