import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import { useState } from 'react';

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
        </Routes>

      </div>
    </Router>
  );
}

export default App;
