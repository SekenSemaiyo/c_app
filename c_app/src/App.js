import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './Pages/TopPage';
import AboutPage from './Pages/AbputPage'; // AboutPage コンポーネントをインポート

//
import ListPage from './Pages/ListPage';
//

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TopPage />} /> {/* トップページ */}
          <Route path="/about" element={<AboutPage />} /> {/* アバウトページ */}
          <Route path="/a" element={<ListPage />} /> {/* アバウトページ */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;

