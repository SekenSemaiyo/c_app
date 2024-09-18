import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from '../images/approval.png';  // .png 画像のパスは適宜変更してください

const TransferComplete = () => {
  const navigate = useNavigate();

  // トップページに戻る関数
  const goToTopPage = () => {
    navigate('/');  // ルートとしてトップページに遷移
  };

  return (
    <div style={styles.container}>
      <img src={successImage} alt="送金完了" style={styles.image} />
      <h2 style={styles.message}>送金処理が完了しました</h2>
      <button onClick={goToTopPage} style={styles.button}>
        トップページに戻る
      </button>
    </div>
  );
};

// スタイリング
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  image: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default TransferComplete;
