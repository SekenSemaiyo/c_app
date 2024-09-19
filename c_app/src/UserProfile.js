import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [users, setUsers] = useState([]); // 初期値を空配列に設定

  // データを取得するuseEffectフック
  useEffect(() => {
    fetch('http://localhost:3010/users/1')
      .then((response) => response.json())
      .then((data) => setUsers(Array.isArray(data) ? data : [data])) // データが単一オブジェクトの場合も考慮
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>ユーザー情報</h1>
      {users.length > 0 ? ( // usersが存在し、かつ配列に要素があるか確認
        users.map((user) => (
          <div key={user.id} style={styles.container}>
            {/* アイコンの表示 */}
            <img
              src={user.icon}
              alt={`${user.username}のアイコン`}
              style={styles.icon}
            />
            <div style={styles.info}>
              <p style={styles.label}>ユーザー名: <span style={styles.value}>{user.username}</span></p>
              <p style={styles.label}>口座番号: <span style={styles.value}>{user.accountNumber}</span></p>
              <p style={styles.label}>預金残高: <span style={styles.value}>{user.yokin}円</span></p>
            </div>
          </div>
        ))
      ) : (
        <p>ユーザー情報がありません。</p> // データがない場合の表示
      )}
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
