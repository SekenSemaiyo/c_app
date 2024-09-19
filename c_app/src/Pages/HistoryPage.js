// src/pages/HistoryPage.js

import React, { useState, useEffect } from 'react';
import NavigateButton from '../Components/NavigateButton'; // NavigateButtonコンポーネントをインポート

const HistoryPage = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState({});

  // 請求履歴を取得
  useEffect(() => {
    fetch('http://localhost:3010/requests')
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);

  // ユーザー情報を取得
  useEffect(() => {
    fetch('http://localhost:3010/users')
      .then((response) => response.json())
      .then((data) => {
        const usersMap = {};
        data.forEach((user) => {
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>請求履歴</h2>

      <NavigateButton label="トップページに戻る" path="/" />

      <table className="table mt-4">
        <thead>
          <tr>
            <th>日付</th>
            <th>金額</th>
            <th>メッセージ</th>
            <th>支払状況</th>
            <th>支払者</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{new Date(request.date).toLocaleString()}</td>
              <td>¥{Number(request.amount).toLocaleString()} 円</td>
              <td>{request.message}</td>
              <td>{request.paid ? '支払済み' : '未払い'}</td>
              <td>
                {request.paid && request.payerId && users[request.payerId] ? (
                  <img
                    src={users[request.payerId].icon}
                    alt={users[request.payerId].username}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;