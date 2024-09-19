import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SendMoneyPage = () => {
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const recipient = location.state?.user;
  const senderId = 1;

  useEffect(() => {
    fetch('http://localhost:3010/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('データの取得に失敗しました。');
      });
  }, []);

  const sender = users.find(user => user.id == senderId);

  if (!sender || !recipient) {
    return <div>データが正しく取得できませんでした。</div>;
  }

  const maxAmount = parseFloat(sender.yokin);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setAmount('');
      setErrorMessage('');
      setIsButtonEnabled(false);
      return;
    }

    const inputAmount = parseFloat(inputValue);

    if (isNaN(inputAmount)) {
      setErrorMessage('無効な金額が入力されました。数値を入力してください。');
      setIsButtonEnabled(false);
    } else if (inputAmount > maxAmount) {
      setErrorMessage(`エラー: 送金金額が送金上限額(${maxAmount}円)を超えています。`);
      setIsButtonEnabled(false);
    } else {
      setErrorMessage('');
      setIsButtonEnabled(true);
    }

    setAmount(inputValue);
  };

  const handleTransfer = async () => {
    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      setErrorMessage('送金金額は正の数である必要があります。');
      return;
    }

    const updatedSenderBalance = maxAmount - transferAmount;
    const updatedRecipientBalance = parseFloat(recipient.yokin) + transferAmount;

    try {
      await fetch(`http://localhost:3010/users/${senderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...sender, yokin: updatedSenderBalance.toString() }),
      });
      
      await fetch(`http://localhost:3010/users/${recipient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...recipient, yokin: updatedRecipientBalance.toString() }),
      });

      const updatedUsers = users.map(user => {
        if (user.id == senderId) {
          return { ...user, yokin: updatedSenderBalance.toString() };
        }
        if (user.id == recipient.id) {
          return { ...user, yokin: updatedRecipientBalance.toString() };
        }
        return user;
      });

      setUsers(updatedUsers);
      alert(`送金完了！${transferAmount}円を ${recipient.username} さんに送金しました。`);
      setAmount('');
      setMessage('');
      setIsButtonEnabled(false);

      navigate('/sendcompletion');

    } catch (error) {
      console.error('Error updating user balance:', error);
      setErrorMessage('送金中にエラーが発生しました。');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333' }}>送金フォーム</h1>

        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ marginBottom: '10px', color: '#555' }}>送金宛先</h2>
          <img
            src={recipient.icon}
            alt={`${recipient.username}のアイコン`}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '10px',
            }}
          />
          <p style={{ fontSize: '18px', color: '#333' }}>氏名: {recipient.username}</p>
        </div>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <label htmlFor="amount" style={{ color: '#333' }}>
            送金金額:
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="金額を入力してください"
              style={{
                width: '100%',
                padding: '10px',
                textAlign: 'left', // 左寄せに変更
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px', // 「円」を右下に配置
                color: '#555',
                fontWeight: 'bold',
              }}
            >
              円
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="message" style={{ color: '#333' }}>
            メッセージ:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力してください"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxSizing: 'border-box',
              resize: 'none',
            }}
            rows={3}
          />
        </div>

        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleTransfer}
          disabled={!isButtonEnabled}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: isButtonEnabled ? '#007bff' : '#cccccc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
            marginBottom: '20px',
          }}
        >
          送金する
        </button>

        <div style={{ textAlign: 'center', color: '#555' }}>
          <h2 style={{ marginBottom: '10px' }}>送金者の情報</h2>
          <p>送金上限額: {maxAmount}円</p>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;
