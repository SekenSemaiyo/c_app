import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './Pages/TopPage';
import SendComplitionPage from './Pages/SendComplitionPage'; // SendComplitionPage コンポーネントをインポート

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TopPage />} /> {/* トップページ */}
          <Route path="/about" element={<SendComplitionPage />} /> {/* アバウトページ */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;