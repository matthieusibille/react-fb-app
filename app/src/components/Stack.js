import React from 'react'
import '../css/StackComponent.css'

function Stack() {
    return (
        <div className="stack">
            <h2 className="header-label">Stack</h2>
            <h3>Front</h3>
            <ul>
                <li>- React</li>
                <li>- Redux</li>
            </ul>
            <h3>Backend</h3>
            <ul>
                <li>- Node</li>
                <li>- Express</li>
                <li>- Mongoose</li>
                <li>- Socket.io</li>
            </ul>
            <h3>Base de données</h3>
            <ul>
                <li>- Mongo DB</li>
            </ul>
        </div>
    )
}

export default Stack
