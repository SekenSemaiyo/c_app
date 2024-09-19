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
  const [payerIdInput, setPayerIdInput] = useState(''); // 支払者のID入力
  const [payer, setPayer] = useState(null); // 支払者の情報
  const [inputError, setInputError] = useState(false); // 入力エラーの状態
  const [isIdModalOpen, setIsIdModalOpen] = useState(false); // ID入力モーダルの表示状態
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 確認モーダルの表示状態

  // ページロード時にID入力モーダルを表示
  useEffect(() => {
    setIsIdModalOpen(true);
  }, []);

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
      .then((response) => response.json())
      .then((data) => setPayee(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [requestId]);

  // 入力値の検証
  const validateInput = (value) => {
    const regex = /^[0-9]+$/; // 半角数字のみ許可（空欄は不可）
    if (regex.test(value)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  // 支払者IDの入力ハンドラ
  const handlePayerIdInputChange = (e) => {
    const value = e.target.value;
    validateInput(value);
    setPayerIdInput(value);
  };

  // 支払者の情報を取得
  const handlePayerIdSubmit = () => {
    if (!payerIdInput) {
      setInputError(true);
      return;
    }

    if (inputError) {
      return;
    }

    // 入力されたIDから支払者情報を取得
    fetch(`http://localhost:3010/users/${payerIdInput}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('指定された支払者は存在しません。');
          } else {
            throw new Error('サーバーエラー');
          }
        }
        return response.json();
      })
      .then((data) => {
        // 請求者と同じIDの場合はエラー
        if (data.id === payee.id) {
          setError('請求者と支払者は同じユーザーにできません。');
          setPayer(null);
          return;
        }
        setPayer(data);
        setError('');
        setIsIdModalOpen(false); // モーダルを閉じる
      })
      .catch((error) => {
        console.error('Error fetching payer data:', error);
        setError(error.message);
        setPayer(null);
      });
  };

  // 支払うボタンのハンドラ
  const handleOpenConfirmModal = () => {
    if (!payer) {
      setError('支払者情報が正しく取得できていません。');
      return;
    }

    // 残高チェック
    if (Number(payer.yokin) < Number(requestData.amount)) {
      setError('支払者の残高が不足しています。');
      return;
    }

    setError('');
    setIsConfirmModalOpen(true);
  };

  // 確認モーダルを閉じる
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handlePayment = () => {
    if (!payee || !requestData || !payer) {
      setError('データの取得に失敗しました。');
      return;
    }

    const paymentAmount = Number(requestData.amount);

    // 残高チェック
    if (Number(payer.yokin) < paymentAmount) {
      setError('残高が不足しています。');
      return;
    }

    // 支払者の残高を更新
    const updatedPayer = {
      ...payer,
      yokin: Number(payer.yokin) - paymentAmount,
    };

    // 請求者の残高を更新
    const updatedPayee = {
      ...payee,
      yokin: Number(payee.yokin) + paymentAmount,
    };

    // 請求データを更新（支払済みに設定）
    const updatedRequestData = {
      ...requestData,
      paid: true,
      payerId: payer.id, // 支払者のIDを設定
    };

    // `json-server` に対してデータを更新するリクエストを送信
    Promise.all([
      fetch(`http://localhost:3010/users/${payer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayer),
      }),
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

      {/* 支払者情報の表示 */}
      {payer && (
        <div className="mt-4">
          <h4>支払者情報</h4>
          <p>
            <strong>支払者名：</strong>
            {payer.username}
          </p>
          <p>
            <strong>支払者の残高：</strong>
            ¥{Number(payer.yokin).toLocaleString()} 円
          </p>
        </div>
      )}

      {/* エラーメッセージの表示 */}
      {error && <p className="text-danger mt-2">{error}</p>}

      {/* 支払うボタン */}
      <button
        className="btn btn-primary mt-4"
        onClick={handleOpenConfirmModal}
        disabled={!payer}
      >
        支払う
      </button>

      {/* ID入力モーダル */}
      {isIdModalOpen && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {/* モーダルヘッダー */}
                <div className="modal-header">
                  <h5 className="modal-title">ユーザーIDの入力</h5>
                </div>
                {/* モーダルボディ */}
                <div className="modal-body">
                  <p>ユーザーのIDを入力してください：</p>
                  <input
                    type="text"
                    className={`form-control ${inputError ? 'is-invalid' : ''}`}
                    value={payerIdInput}
                    onChange={handlePayerIdInputChange}
                    autoFocus
                  />
                  {inputError && (
                    <div className="invalid-feedback">半角数字のみを入力してください。</div>
                  )}
                </div>
                {/* モーダルフッター */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePayerIdSubmit}
                    disabled={!payerIdInput || inputError}
                  >
                    確定
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* モーダルのバックドロップ */}
          <div className="modal-backdrop show"></div>
        </>
      )}

      {/* 確認用モーダル */}
      {isConfirmModalOpen && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {/* モーダルヘッダー */}
                <div className="modal-header">
                  <h5 className="modal-title">支払い内容の確認</h5>
                  <button type="button" className="close" onClick={handleCloseConfirmModal}>
                    <span>&times;</span>
                  </button>
                </div>
                {/* モーダルボディ */}
                <div className="modal-body">
                  <p>以下の内容で支払いを行います。よろしいですか？</p>
                  <p>
                    <strong>支払者：</strong>
                    {payer.username}
                  </p>
                  <p>
                    <strong>支払金額：</strong>
                    ¥{Number(requestData.amount).toLocaleString()} 円
                  </p>
                  <p>
                    <strong>支払前残高：</strong>
                    ¥{Number(payer.yokin).toLocaleString()} 円
                  </p>
                  <p>
                    <strong>支払後残高：</strong>
                    ¥
                    {(
                      Number(payer.yokin) - Number(requestData.amount)
                    ).toLocaleString()} 円
                  </p>
                </div>
                {/* モーダルフッター */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseConfirmModal}
                  >
                    キャンセル
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handlePayment}>
                    支払う
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* モーダルのバックドロップ */}
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
};

export default PayPage;
