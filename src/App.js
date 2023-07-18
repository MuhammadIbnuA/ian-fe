import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Guru from './component/Tguru';
import Loginpage from './component/loginform'
import Register from './component/register'
import './css/Navbar.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/gurus">Data Pengajar</Link>
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/gurus">Guru</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/gurus" element={<Guru />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
