import React from 'react';
import { useNavigate } from 'react-router-dom';

// サンプルデータ（ユーザー名と画像URL）
const users = [
  { id: 1, name: 'サンプル 氏名1', image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'サンプル 氏名2', image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'サンプル 氏名3', image: 'https://via.placeholder.com/50' },
];

const SendMoney = () => {
  const navigate = useNavigate();

  // 送金処理画面に遷移
  const selectRecipient = (user) => {
    navigate('/transfer', { state: user });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>送金相手を選択</h2>
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.listItem} onClick={() => selectRecipient(user)}>
            <img src={user.image} alt="user icon" style={styles.icon} />
            <span style={styles.userName}>{user.name}</span>
          </li>
        ))}
      </ul>
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
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
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
};

export default SendMoney;
