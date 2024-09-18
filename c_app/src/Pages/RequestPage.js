// src/pages/RequestPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // モーダルの表示状態を管理
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルを開く
  const handleOpenModal = () => {
    // 金額が数値であり、0円以上であることを確認
    if (amount === '' || isNaN(amount) || Number(amount) < 0) {
      setError('有効な金額を入力してください。');
      return;
    }

    setError(''); // エラーをクリア
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // リンクを作成して遷移
  const handleCreateLink = () => {
    setIsModalOpen(false);

    // 請求リンクの生成（シンプルな例としてクエリパラメータを使用）
    const requestId = Date.now(); // 簡易的なID生成
    const link = `${window.location.origin}/pay?requestId=${requestId}&amount=${amount}&message=${encodeURIComponent(message)}`;

    // 状態を渡すために navigate の state オプションを使用
    navigate('/request-completion', { state: { link } });
  };

  // 金額入力の変更ハンドラ
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 数字以外を除去
    setAmount(value);
  };

  return (
    <div className="container mt-5">
      <h2>請求リンクの作成</h2>
      <div className="form-group mt-4">
        <label>請求金額(半角数字のみ)</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="金額を入力"
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">円</span>
          </div>
        </div>
      </div>
      <div className="form-group mt-3">
        <label>メッセージ（任意）</label>
        <textarea
          className="form-control"
          placeholder="メッセージを入力"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      {error && <p className="text-danger mt-2">{error}</p>}
      <button className="btn btn-primary btn-block mt-4" onClick={handleOpenModal}>
        リンクを作成
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {/* モーダルヘッダー */}
                <div className="modal-header">
                  <h5 className="modal-title">請求内容の確認</h5>
                  <button type="button" className="close" onClick={handleCloseModal}>
                    <span>&times;</span>
                  </button>
                </div>
                {/* モーダルボディ */}
                <div className="modal-body">
                  <p>以下の内容で請求リンクを作成します。よろしいですか？</p>
                  <p>
                    <strong>請求金額：</strong>¥{Number(amount).toLocaleString()} 円
                  </p>
                  {message && (
                    <p>
                      <strong>メッセージ：</strong>
                      {message}
                    </p>
                  )}
                </div>
                {/* モーダルフッター */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    キャンセル
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleCreateLink}>
                    リンクを作成
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

export default RequestPage;
