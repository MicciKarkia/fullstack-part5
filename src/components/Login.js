import React from 'react'
import Notification from './Notification'

const Login = ({ handleLogin, username, password, notificationMessage, handleUsernameChange, handlePasswordChange}) => {
    
    return(
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
        <div>
            username
            <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
        </div>
            <div>
                password
            <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
    )
    
}

export default Login