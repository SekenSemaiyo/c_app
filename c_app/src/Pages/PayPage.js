// src/pages/PayPage.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // クエリパラメータから請求IDを取得
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('requestId');
  const amount = queryParams.get('amount');
  const message = queryParams.get('message');

  const handlePayment = () => {
    // 支払い処理を実行（ここでは仮の処理）
    // 支払い完了ページへ遷移
    navigate('/payment-completion');
  };

  return (
    <div className="container mt-5">
      <h2>請求内容の確認</h2>
      <p><strong>請求ID：</strong>{requestId}</p>
      <p><strong>請求金額：</strong>¥{Number(amount).toLocaleString()} 円</p>
      {message && (
        <p><strong>メッセージ：</strong>{decodeURIComponent(message)}</p>
      )}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mt-4" onClick={handlePayment}>
        支払う
      </button>
    </div>
  );
};

export default PayPage;
