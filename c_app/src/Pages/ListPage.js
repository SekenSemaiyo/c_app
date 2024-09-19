import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3010/users')
      .then((response) => response.json())
      .then((data) => {
        // user.idが1のユーザーをフィルタリングして保存
        const filteredUsers = data.filter((user) => user.id !== 1);
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // ユーザーを選択して遷移する関数
  const handleUserClick = (user) => {
    navigate('/sendmoney', { state: { user } });
  };

  return (
    <div>
      <h1>送金相手を選択</h1>
      {users.map((user) => (
        <div
          key={user.id}
          style={styles.container}
          onClick={() => handleUserClick(user)}
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
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
    fontSize: '25px',
  },
};

export default ListPage;
