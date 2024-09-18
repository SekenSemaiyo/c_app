// src/pages/PayPage.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // クエリパラメータから請求情報を取得
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('requestId');
  const amount = queryParams.get('amount');
  const message = queryParams.get('message');

  // 状態管理
  const [error, setError] = useState('');
  const [payee, setPayee] = useState(null); // 請求者（山田太郎）

  // 請求者の情報を取得
  useEffect(() => {
    // 請求者の情報を取得（id:1）
    fetch('http://localhost:3010/users/1')
      .then((response) => response.json())
      .then((data) => setPayee(data))
      .catch((error) => console.error('Error fetching payee data:', error));
  }, []);

  const handlePayment = () => {
    const paymentAmount = Number(amount);

    if (!payee) {
      setError('ユーザー情報の取得に失敗しました。');
      return;
    }

    // 請求者の残高を更新
    const updatedPayee = {
      ...payee,
      yokin: Number(payee.yokin) + paymentAmount,
    };

    // `json-server` に対してデータを更新するリクエストを送信
    fetch(`http://localhost:3010/users/${payee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayee),
    })
      .then(() => {
        // 支払い完了ページへ遷移
        navigate('/payment-completion');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        setError('支払い処理に失敗しました。');
      });
  };

  if (!payee) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>請求内容の確認</h2>
      <p>
        <strong>請求ID：</strong>
        {requestId}
      </p>
      <p>
        <strong>請求金額：</strong>¥{Number(amount).toLocaleString()} 円
      </p>
      {message && (
        <p>
          <strong>メッセージ：</strong>
          {decodeURIComponent(message)}
        </p>
      )}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mt-4" onClick={handlePayment}>
        支払う
      </button>
    </div>
  );
};

export default PayPage;
