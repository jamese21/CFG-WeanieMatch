import logo from '../images/logo.png'
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams} from 'react-router-dom';
import { useState } from 'react';
export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App-header">
            <img src={logo} className='Header-item logo' id="start" />
            <div className='Header-item'><Link className="Nav-button-medium" to={'/'}>Home</Link></div>
            <div className='Header-item'><Link className="Nav-button-medium" to={'/players'}>Manage Players</Link></div>
            <div className='Header-item'><Link className="Nav-button-medium" to={'/session'}>Add Session</Link></div>
            <div className='Header-item'><Link className="Nav-button-medium" to={'/inventory'}>Manage Inventory</Link></div>
            {!loggedIn && <div className='Header-item'><Link className="Nav-button-medium" to={'/login'}>Login</Link></div>}
            {loggedIn && <div className='Header-item' id="end"><Link className="Nav-button-medium" to={'/logout'}>Logout</Link></div>}
            <img src={logo} className='Header-item logo' id="end" />
        </div>
    )
}