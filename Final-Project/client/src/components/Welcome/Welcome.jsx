import React from 'react'
import './Welcome.css'

import { socket } from '../../App';
import { setSession } from '../../session'

const Welcome = () => {
    const Login = () => {
        // Handle User Input
        const username = document.getElementById('usernameInput').value;
        setSession(username);
        socket.emit("setUsername", username)
        console.log("Welcome " + username)

        // Navigate to HomePage
        window.location.href = `/home`
    }

    return (
        <div className="home-container">
            <input
                name="username"
                type="text"
                placeholder="Input Your Name"
                className="text-input-field"
                id="usernameInput"
            />
            <button className="enter-room-button" onClick={Login}>Login</button>
        </div>
    )
}

export default Welcome


