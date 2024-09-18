// src/pages/PayPage.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // クエリパラメータから請求IDを取得
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('requestId');

  // 状態管理
  const [error, setError] = useState('');
  const [payee, setPayee] = useState(null); // 請求者
  const [requestData, setRequestData] = useState(null); // 請求データ

  // 請求データと請求者の情報を取得
  useEffect(() => {
    if (!requestId) {
      setError('無効な請求IDです。');
      return;
    }
  
    // 請求データの取得
    fetch(`http://localhost:3010/requests/${requestId}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('指定された請求は存在しません。');
          } else {
            throw new Error('サーバーエラー');
          }
        }
        return response.json();
      })
      .then((data) => {
        setRequestData(data);
        // 請求者の情報を取得
        return fetch(`http://localhost:3010/users/${data.payeeId}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('サーバーエラー');
        }
        return response.json();
      })
      .then((data) => setPayee(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [requestId]);

  const handlePayment = () => {
    if (!payee || !requestData) {
      setError('データの取得に失敗しました。');
      return;
    }

    const paymentAmount = Number(requestData.amount);

    // 請求者の残高を更新
    const updatedPayee = {
      ...payee,
      yokin: Number(payee.yokin) + paymentAmount,
    };

    // 請求データを更新（支払済みに設定）
    const updatedRequestData = {
      ...requestData,
      paid: true,
      payerId: 2, // 支払者のID（ここでは仮に2を指定）
    };

    // `json-server` に対してデータを更新するリクエストを送信
    Promise.all([
      fetch(`http://localhost:3010/users/${payee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayee),
      }),
      fetch(`http://localhost:3010/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequestData),
      }),
    ])
      .then(() => {
        // 支払い完了ページへ遷移
        navigate('/payment-completion');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        setError('支払い処理に失敗しました。');
      });
  };

  if (error) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">エラーが発生しました</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!requestData || !payee) {
    return <div className="container mt-5">読み込み中...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>請求内容の確認</h2>
      <p>
        <strong>請求ID：</strong>
        {requestId}
      </p>
      <p>
        <strong>請求金額：</strong>¥{Number(requestData.amount).toLocaleString()} 円
      </p>
      {requestData.message && (
        <p>
          <strong>メッセージ：</strong>
          {requestData.message}
        </p>
      )}
      <button className="btn btn-primary mt-4" onClick={handlePayment}>
        支払う
      </button>
    </div>
  );
};

export default PayPage;
