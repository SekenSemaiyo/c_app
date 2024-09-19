// src/pages/PaymentCompletionPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCompletionPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">支払いが完了しました。</h2>
      <Link to="/toppage?userId=2">
        <button className="btn btn-primary mt-4">トップ画面に戻る</button>
      </Link>
    </div>
  );
};


export default PaymentCompletionPage;
