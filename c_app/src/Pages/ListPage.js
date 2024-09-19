import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // useNavigateフックを使用


  useEffect(() => {
    fetch('http://localhost:3010/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  // ユーザーを選択して遷移する関数
  const handleUserClick = (user) => {
    navigate('/sendmoney', { state: { user } }); // user-detailに送金画面処理の画面のURLに変更
  };


  return (
    <div>
      <h1>送金相手を選択</h1>
      {users.map((user) => (
        <div
          key={user.id}
          style={styles.container}
          onClick={() => handleUserClick(user)} // コンテナ全体がクリック可能
        >
          <img
            src={user.icon}
            alt={`${user.username}のアイコン`}
            style={styles.icon}
          />
          <div style={styles.info}>
            <p style={styles.label}>
              <span style={styles.value}>{user.username}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


// スタイル定義
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    maxWidth: '500px',
    margin: 'auto',
    cursor: 'pointer', // コンテナをクリック可能にする
    transition: 'background-color 0.3s ease', // ホバー時の視覚的効果
  },
  icon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '8px',
  },
  info: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  value: {
    fontWeight: 'normal',
    fontSize: '25px', // ここでフォントサイズを大きく変更
  },
};


export default ListPage;
