import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import NavigateButton from '../Components/NavigateButton';

function Login() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate(); // useNavigateフックを使用

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleLogin = () => {
    navigate(`/Toppage?userId=${userId}`); // ユーザーIDをクエリパラメータとして渡す
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
      <button onClick={handleLogin}>ログイン</button> {/* NavigateButtonをボタンに置き換え */}
    </div>
  );
}

export default Login;
