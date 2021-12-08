
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import About from '../page/About';
import Users from '../page/Users';
import Home from '../page/Home';

export default function() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>

  )
}
