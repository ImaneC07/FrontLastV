import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EventWebsite from './components/home';
import LoginPage from './components/loginpage';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<EventWebsite />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
