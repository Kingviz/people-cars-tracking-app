import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShowPage from '../pages/ShowPage';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/:id" element={<ShowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
