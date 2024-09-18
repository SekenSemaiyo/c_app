import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SendMoney from './SendMoney';
import TransferPage from './TransferPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendMoney />} /> {/* 送金相手選択画面 */}
        <Route path="/transfer" element={<TransferPage />} /> {/* 送金処理画面 */}
      </Routes>
    </Router>
  );
};

export default App;
