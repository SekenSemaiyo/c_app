// src/pages/RequestCompletionPage.js

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const RequestCompletionPage = () => {
  const location = useLocation();
  const { link } = location.state || {};

  if (!link) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">エラーが発生しました。</h2>
        <Link to="/">
          <button className="btn btn-primary mt-4">トップ画面に戻る</button>
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert('リンクをコピーしました。');
  };

  return (
    <div className="container mt-5">
      <h2>請求リンクが作成されました。</h2>
      <div className="mt-4">
        <p>以下のリンクを共有してください：</p>
        <div className="input-group">
          <input type="text" className="form-control" value={link} readOnly />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={handleCopyLink}>
              コピー
            </button>
          </div>
        </div>
      </div>
      <Link to="/toppage">
        <button className="btn btn-primary btn-block mt-4">トップ画面に戻る</button>
      </Link>
    </div>
  );
};

export default RequestCompletionPage;
