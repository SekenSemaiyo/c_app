import React, { useState } from 'react';
import NavigateButton from '../Components/NavigateButton'; // NavigateButtonコンポーネントが同じフォルダにあると仮定

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>ログイン画面</h2>
      <div>
        <label>ユーザーID：</label>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="ユーザーIDを入力"
        />
      </div>
      <div>
        <label>パスワード：</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="パスワードを入力"
        />
      </div>
      <NavigateButton label="ログイン" path="/toppage" />
    </div>
  );
}

export default Login;
