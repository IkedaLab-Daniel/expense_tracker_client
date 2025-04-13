import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import closeSVG from '../assets/close.svg'

function Login({ onClose, onSwitch, onLoginSuccess }){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const notifySuccess = () => toast.success('Log In Successful!', {
        position: 'top-center',
        style: {padding: '15px 15px'}
    });
    
    const notifyFail = () => toast.error('Incorrect Username or Password!', {
        position: 'top-center',
        style: {padding: '15px 15px'}
    });

    const handleSubmit = () => {
        fetch('https://expense-tracker-7oow.onrender.com/auth/token/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const token = data.auth_token;
            localStorage.setItem('authToken', token);
            onClose();
            console.log('Login successful:', token);
            notifySuccess();
    
            return fetch('https://expense-tracker-7oow.onrender.com/auth/users/me/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch user info');
            }
            return res.json();
        })
        .then(userData => {
            console.log(userData);
            localStorage.setItem('username', userData.username);
            onLoginSuccess(userData.username);
        })
        .catch(error => {
            console.error('Error:', error);
            notifyFail();
        });
    
        setUsername('');
        setPassword('');
    };
    
    
    const token = localStorage.getItem('authToken');

    return(
        <>
            <div className="black-bg" onClick={onClose}></div>
            <div className="login-modal form">
                <img className="closeSVG" src={closeSVG} onClick={onClose}/>
                <h1>Log In</h1>
                <div className="vertical-center">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Log In</button>
                    <span className="redirect-message">
                        Don't have account? 
                        <button className="redirect-link" onClick={onSwitch}>Sign Up</button>
                    </span>
                    
                </div>
            </div>
            <Toaster />
        </>
        
    )
}

export default Login