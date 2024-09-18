import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// トップ画面コンポーネント
const Home = () => {
  const navigate = useNavigate();

  // ボタンクリックで新しい画面に遷移する関数
  const goToNewPage = () => {
    navigate('/new-page');  // 'new-page' に遷移
  };

  return (
    <div style={styles.container}>
      <h1>トップ画面</h1>
      <button onClick={goToNewPage} style={styles.button}>
        新しい画面に移動
      </button>
    </div>
  );
};

// 新しい画面コンポーネント
const NewPage = () => {
  return (
    <div style={styles.container}>
      <h1>新しい画面</h1>
      <Link to="/" style={styles.link}>トップに戻る</Link>
    </div>
  );
};

// ルーティング設定
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* トップページ */}
        <Route path="/new-page" element={<NewPage />} />  {/* 新しいページ */}
      </Routes>
    </Router>
  );
};

// 簡単なスタイル設定
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px',
  },
  link: {
    marginTop: '20px',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'blue',
  }
};

export default App;
