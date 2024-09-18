import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './Pages/TopPage';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import AboutPage from './Pages/AbputPage'; // AboutPage コンポーネントをインポート
import ListPage from './Pages/ListPage';
import SendMoneyPage from './Pages/SendMoneyPage';
import SendCompletionPage from './Pages/SendComplitionPage';
import RequestPage from './Pages/RequestPage';
import RequestComplition from './Pages/RequestComplitionPage';
import PayPage from './Pages/PayPage';
import PaymentComplition from './Pages/PaymentComplitionPage';
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
          <Route path="/request-completion" element={<RequestComplition />} /> {/* リンク作成完了画面 */}
          <Route path="/pay" element={<PayPage/>} /> {/* 請求支払い画面*/}
          <Route path="/payment-completion" element={<PaymentComplition/>} /> {/* 請求支払い完了画面*/}
          <Route path="/history" element={<HistoryPage />} /> {/* 請求履歴確認画面 */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;

