import React, { useState } from 'react'
import '../scss/Login.scss'
import { connect } from 'react-redux'
import { userLogin } from '../actions/userActions'

function Login(props) {
    
    const [state, setState] = useState( { email: '', password: '' } )
    const { email, password } = state
    
    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.onUserLogin(state)
    }

    const { error } = props

    return (
        <div className="loginBox">
            <form onSubmit={submitHandler} noValidate >
                <div className="col">
                    <div className="row">
                        <span>Adresse e-mail</span>
                        <input type="email" name="email" value={email} onChange={changeHandler} />
                    </div>
                    <div className="row">
                        <span>Mot de passe</span>
                        <input type="password" name="password" value={password} onChange={changeHandler} />
                    </div>
                </div>
                <div className="col">
                    <button className="btn-validate btn-blue" type="submit">Se connecter</button>
                </div>
            </form>
            {
                error ? <div className="error">{error}</div> : null
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        error: state.data.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (state) => { dispatch(userLogin(state)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
