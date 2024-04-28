import React, { useState } from 'react'

function LoginPage({handleLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            handleLogin();
        } else {
            setError('Invalid username or password');
        }

    }
  return (
      <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      
    </div>
  )
}

export default LoginPage