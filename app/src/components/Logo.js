import React from 'react'
import { Link } from 'react-router-dom';

import '../scss/Logo.scss'

function Logo() {
    return (
        <>
            <h1 className="logo">
                    <Link to="/">
                        <span className="center">
                            Facebook du <span>Très</span> pauvre
                        </span>
                    </Link>
                    <span className="stamp">Alpha 0.2</span>
            </h1>
        </>
    )
}

export default Logo
