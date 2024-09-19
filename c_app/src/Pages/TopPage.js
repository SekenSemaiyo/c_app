import React from 'react';
import { useLocation } from 'react-router-dom'; // useLocationフックをインポート
import '../App.css';
import UserProfile from '../UserProfile';
import NavigateButton from '../Components/NavigateButton';

function TopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId'); // クエリパラメータからuserIdを取得

  return (
    <div className="App">
      <UserProfile userId={userId} /> {/* userIdをUserProfileに渡す */}
      <NavigateButton label="送金画面へ" path="/list" />
      <NavigateButton label="請求画面へ" path="/request" />
      <NavigateButton label="請求確認画面へ" path="/history" />
    </div>
  );
}

export default TopPage;
