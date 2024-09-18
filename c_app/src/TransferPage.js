import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TransferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state; // 送金先のユーザーデータを取得
  const [amount, setAmount] = useState(''); // 入力された送金金額
  const maxAmount = 50000; // サンプルの預金残高（送金上限金額）

  const handleTransfer = () => {
    if (amount > 0 && amount <= maxAmount) {
      alert(`${user.name}に¥${amount}を送金しました！`);
      navigate('/'); // 送金完了後にトップページに戻る
    } else {
      alert('送金額が不正です。正しい金額を入力してください。');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>送金処理画面</h2>
      <div style={styles.userInfo}>
        <img src={user.image} alt="user icon" style={styles.icon} />
        <span style={styles.userName}>{user.name}</span>
      </div>
      <p>送金可能な上限金額: ¥{maxAmount}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="送金金額を入力"
        style={styles.input}
      />
      <button onClick={handleTransfer} style={styles.button}>送金する</button>
    </div>
  );
};

// スタイリング
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '20px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    marginRight: '15px',
  },
  userName: {
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TransferPage;
