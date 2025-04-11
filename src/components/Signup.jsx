import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

function Signup({ onClose, onSwitch }){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmError, setConfirmError] = useState(false)

    const notifySuccess = () => toast.success('User Registered!', {
        position: 'top-center',
        style: {padding: '15px 15px'}
    });
    
    const notifyFail = () => toast.error('Username already exist!', {
        position: 'top-center',
        style: {padding: '15px 15px'}
    });

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError('Confirm Password does not match!')
            setPassword('')
            setConfirmPassword('')
            setConfirmError(true)
            return
        }
    
        // 1. Register the user (Only need this if u don't want auto login)
        fetch('http://127.0.0.1:8000/auth/users/', {
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
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(() => {
            // 2. Auto-login right after signup (remove / edit this part if u want no auto login)
            // ? if you don't want auto login, remove fetch, call onSwitch() instead
            return fetch('http://127.0.0.1:8000/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login after signup failed');
            }
            return response.json();
        })
        .then(data => {
            const token = data.auth_token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            onClose(); // ? Close the modal (auto login) - Remove this if u want no auto login
            notifySuccess();
        })
        .catch(error => {
            console.error('Error during signup/login:', error);
            notifyFail();
        });
    
        setConfirmError(false);
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };
    
    
    return(
        <>
            <div className="black-bg" onClick={onClose}></div>
            <div className="login-modal form">
                <h1>Sign Up</h1>
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
                        style={
                            confirmError ? ({border: "2px solid #fe6161"}): ({})
                        }
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        style={
                            confirmError ? ({border: "2px solid #fe6161"}): ({})
                        }
                    />
                    <span className="submit-btn" onClick={handleSubmit}>Sign Up</span>
                    {error ? (
                        <div className="form-error">Error: {error}</div>
                    ): (
                        ''
                    )}
                    
                    <span className="redirect-message">
                        Already have an account?
                        <span className="redirect-link" onClick={onSwitch}> Log In</span>
                    </span>
                </div>
            </div>
            <Toaster />
        </>
        
    )
}

export default Signup