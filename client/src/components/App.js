import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import React from 'react'
import Header from './Header'
import About from '../page/About'
import Users from '../page/Users'
import Home from '../page/Home'
import Login from '../page/Login'

export default function () {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}
