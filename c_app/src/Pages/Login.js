import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleLogin = () => {
    navigate(`/Toppage?userId=${userId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>ログイン画面</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>ユーザーID：</label>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="ユーザーIDを入力"
          style={styles.input}
        />
      </div>
      <button  className="btn btn-danger btn-block mt-4" onClick={handleLogin} style={styles.button}>ログイン</button>
    </div>
  );
}

// スタイル定義
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    //backgroundColor: '#fff5f5', // 薄い赤の背景
    color: '#333',
  },
  header: {
    marginBottom: '20px',
    color: '#e74c3c', // 赤いテキスト
  },
  formGroup: {
    marginBottom: '20px',
    width: '300px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#e74c3c', // 赤いラベル
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#e74c3c', // 赤いボタン
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;
