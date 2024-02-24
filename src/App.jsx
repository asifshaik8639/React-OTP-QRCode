// src/App.js
import React, { useState } from 'react';
import GenerateOTP from './components/GenerateOTP';
import VerifyOTP from './components/VerifyOTP';

function App() {
  const [secret, setSecret] = useState(null);

  return (
    <div>
      <GenerateOTP setSecret={setSecret} />
      {secret && <VerifyOTP secret={secret} />}
    </div>
  );
}

export default App;
