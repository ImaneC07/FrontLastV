import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EventWebsite from './components/home';
import About from './components/about';
import HelpCenter from './components/helpcenter';
import './App.css';
import SignUp from './components/Auth/signup';
import SignUpType from './components/Auth/signuptype';
import ParticipantSignUp from './components/Auth/participantsignup';
import OrganizerSignUp from './components/Auth/organizersignup';
import Login from './components/Auth/login';
import DashboardParticipant from './components/Dashboards/dashboardparticipant';
import DashboardOrganizer from './components/Dashboards/dashboardorganizer';
import EventDetails from './components/Dashboards/eventdetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EventWebsite />} />
          <Route path="/about" element={<About />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Auth/signuptype" element={<SignUpType />} />
          <Route path="/Auth/participantsignup" element={<ParticipantSignUp />} />
          <Route path="/Auth/organizersignup" element={<OrganizerSignUp />} />
          <Route path="/Auth/login" element={<Login />} />
          <Route path="/Dashboards/dashboardparticipant" element={<DashboardParticipant />} />
          <Route path="/Dashboards/dashboardorganizer" element={<DashboardOrganizer />} />
          <Route path="/Dashboards//event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
