import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EventWebsite from './components/home';
import LoginPage from './components/loginpage';
import UserSpace from './components/userspace';
import OrganizerSignUp from './components/signup_orga';
import SignUpPage from './components/signuppage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EventWebsite />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-space" element={<UserSpace />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-organisateur" element={<OrganizerSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
