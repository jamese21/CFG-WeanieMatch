import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ManagePlayers from './components/ManagePlayers';
import CreateSession from './components/CreateSession';
import Home from './components/Home';
import ManageInventory from './components/ManageInventory';
import Player from './components/Player';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className='App-inner'>
        <Header />
        <div className='Content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<ManagePlayers />} />
            <Route path="/session" element={<CreateSession />} />
            <Route path="/inventory" element={<ManageInventory />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/player" element={<Player />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
