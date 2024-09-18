import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './Pages/TopPage';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ListPage from './Pages/ListPage';
import SendMoneyPage from './Pages/SendMoneyPage';
import SendCompletionPage from './Pages/SendCompletionPage';
import RequestPage from './Pages/RequestPage';
import RequestCompletion from './Pages/RequestCompletionPage';
import PayPage from './Pages/PayPage';
import PaymentCompletion from './Pages/PaymentCompletionPage';
import HistoryPage from './Pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TopPage />} /> {/* トップページ */}
          <Route path="/list" element={<ListPage />} /> {/* 送金宛先一覧 */}
          <Route path="/sendmoney" element={<SendMoneyPage />} /> {/* 送金処理画面 */}
          <Route path="/sendcompletion" element={<SendCompletionPage />} /> {/* 送金完了画面 */}
          <Route path="/request" element={<RequestPage />} /> {/* 請求画面 */}
          <Route path="/request-completion" element={<RequestCompletion />} /> {/* リンク作成完了画面 */}
          <Route path="/pay" element={<PayPage/>} /> {/* 請求支払い画面*/}
          <Route path="/payment-completion" element={<PaymentCompletion/>} /> {/* 請求支払い完了画面*/}
          <Route path="/history" element={<HistoryPage />} /> {/* 請求履歴確認画面 */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;

