import React, { useEffect, useState } from 'react';

const SendMoneyPage = () => {
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const senderId = 1; // 送金者のID
  const recipientId = 2; // 送金宛先のID

  // 初回レンダリング時にユーザーデータを取得
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
  const recipient = users.find(user => user.id == recipientId);

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
      // 送金者の残高を更新
      await fetch(`http://localhost:3010/users?id=${senderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...sender, yokin: updatedSenderBalance.toString() }),
      });
      
      await fetch(`http://localhost:3010/users?id=${recipientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...recipient, yokin: updatedRecipientBalance.toString() }),
      });
      

      // ローカルのユーザーデータを更新
      const updatedUsers = users.map(user => {
        if (user.id == senderId) {
          return { ...user, yokin: updatedSenderBalance.toString() };
        }
        if (user.id == recipientId) {
          return { ...user, yokin: updatedRecipientBalance.toString() };
        }
        return user;
      });

      setUsers(updatedUsers);

      alert(`送金完了！${transferAmount}円を ${recipient.username} さんに送金しました。`);
      setAmount(''); // フォームをリセット
      setIsButtonEnabled(false);
    } catch (error) {
      console.error('Error updating user balance:', error);
      setErrorMessage('送金中にエラーが発生しました。');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>送金フォーム</h1>
        <div>
          <h2>送金宛先</h2>
          <img src={recipient.icon} alt={`${recipient.username}のアイコン`} style={{ width: '50px', height: '50px' }} />
          <p>氏名: {recipient.username}</p>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="amount">送金金額:</label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="金額を入力してください"
              style={{ marginRight: '5px', textAlign: 'right' }}
            />
            <span>円</span>
          </div>
        </div>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

        <button
          onClick={handleTransfer}
          disabled={!isButtonEnabled}
          style={{ display: 'block', margin: '0 auto' }}
        >
          送金する
        </button>

        <div>
          <h2>送金者の情報</h2>
          <p>送金上限額: {maxAmount}円</p>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;
