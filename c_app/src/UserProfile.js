import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => { // userIdを受け取る
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3010/users/${userId}`) // userIdに基づいてデータを取得
        .then((response) => response.json())
        .then((data) => setUsers(Array.isArray(data) ? data : [data]))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [userId]);

  return (
    <div style={styles.wrapper}> {/* 余白を追加するためのラッパースタイル */}
      <h1 style={styles.title}>ユーザー情報</h1> {/* タイトルを中央寄せ */}      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} style={styles.container}>
            <img
              src={user.icon}
              alt={`${user.username}のアイコン`}
              style={styles.icon}
            />
            <div style={styles.info}>
              {/* ユーザー名と口座番号を縦に並べる */}
              <p style={styles.label}>
                <span style={styles.value}>{user.username}</span>
              </p>
              <p style={styles.label}>
                口座番号: <span style={styles.value}>{user.accountNumber}</span>
              </p>
              <p style={styles.label}>
                預金残高: <span style={styles.value}>{user.yokin}円</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>ユーザー情報がありません。</p>
      )}
    </div>
  );
} 

// スタイル定義
const styles = {
  wrapper: {
    marginTop: '100px', // 上に余白を追加
  },
  title: {
    textAlign: 'center', // タイトルを中央寄せ
    marginBottom: '30px' ,
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start', // 上揃えに変更
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    maxWidth: '500px',
    margin: 'auto',
  },
  icon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '16px',
  },
  info: {
    flex: 1,
    display: 'block', // 縦に並べる
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  value: {
    fontWeight: 'normal',
  },
};

export default UserProfile;
