import { useState } from "react"

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        fetch('http://127.0.0.1:8000/auth/token/login/', {
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
            console.log('Login successful:', data);        
        })
        .catch(error => console.error('Error during login:', error));
    };

    return(
        <>
            <div className="black-bg"></div>
            <div className="login-modal form">
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
                    <span className="submit-btn" onClick={handleSubmit}>Log In</span>
                </div>
                
            </div>
        </>
        
    )
}

export default Login