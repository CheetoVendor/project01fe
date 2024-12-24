import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import { useState } from 'react';
import Relationships from './relationships';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path="/relationships" element={<Relationships />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
