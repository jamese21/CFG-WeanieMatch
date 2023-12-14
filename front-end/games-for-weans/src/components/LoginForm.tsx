import { useState } from "react";
import '../css/LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
const URL = "http://sefdb02.qut.edu.au:3000";


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState('false');
    const handleSubmit = (e) => {

            // Perform login logic here
            setMessage("");
            console.log('Username:', username);
            console.log('Password:', password);
            
            const data = {
                username: username,
                password: password,
            }
        
            fetch(`${URL}/user/login`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    console.log(response.status);
                    switch(response.status) {
                        case 401:
                            throw new Error("Incorrect email or password.");
                    }
                }
                return response.json()
            })
            .then(result => {
                return result;
            })
            .catch(error => {
                setMessage(error.message);
            })
        };
    
    return(
    <form className="loginForm" onSubmit={handleSubmit}>
    <div>
        <label htmlFor="username"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>Username:</label>
        <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => {
            setUsername(event.target.value);
        }}
        />
    </div>
    <div>
        <label htmlFor="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon>Password:</label>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => {
            setPassword(event.target.value);
        }}
        />
    </div>
    <button className="loginButton" type="submit">Login</button>
    <p>{error}</p>
    </form>
    );
}