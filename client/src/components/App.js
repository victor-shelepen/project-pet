import React from 'react'
import {
  HashRouter as Router, Route, Routes
} from "react-router-dom"
import About from '../page/About'
import Home from '../page/Home'
import Login from '../page/Login'
import FormMeasurement from '../page/Measurement/Form'
import ListMeasurement from '../page/Measurement/List'
import ChartMeasurement from '../page/Measurement/Chart'
import Register from "../page/Register"
import Users from '../page/Users'
import Header from './Header'

export default function () {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/measurement/add" element={<FormMeasurement type='add'/>} />
        <Route path="/measurement/edit/:id" element={<FormMeasurement type='edit'/>} />
        <Route path="/measurement/list" element={<ListMeasurement />} />
        <Route path="/measurement/chart" element={<ChartMeasurement />} />
      </Routes>
    </Router>
  )
}
