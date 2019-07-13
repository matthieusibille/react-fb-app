import React, { useState } from 'react'

import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'
import axios from 'axios'

import '../scss/Register.scss'

function Register(props) {

    const [state, setState] = useState({
        username: '',
        firstname: '',
        name: '',
        email: '',
        password: '',
        gender: '',
        error: ''
    })
    const { username, firstname, name, email, password, error } = state

    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = () => {
        axios.post('http://localhost:4000/api/register/', state)
            .then(response => {
                props.onSetUser(response.data.token, response.data.userData)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.userData._id)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (state.username === '' || state.firstname === '' || state.name === '') {
            setState({
                ...state,
                error: "Champ requis manquant"
            })
            return;
        }

        if (!validateEmail(state.email)) {
            setState({
                ...state,
                error: "Format d'email incorrect"
            })
            return;
        }

        if (state.password.length < 4) {
            setState({
                ...state,
                error: "Le mot de passe doit faire au moins 4 caractères"
            })
            return;
        }

        if (state.gender === '') {
            setState({
                ...state,
                error: "Genre non renseigné"
            })
            return;
        }

        registerUser()

    }

    return (
        <div className="form-container">
            <h2>
                <span>Créer un compte</span>
                <span>C'est gratuit</span> <span>...comme on revend vos données on va pas abuser</span>
            </h2>
            <form className="form" onSubmit={submitHandler} noValidate>

                <div className="row username">
                    <input name="username" type="text" value={username} onChange={changeHandler} placeholder="Pseudo" required />
                </div>

                <div className="row name">
                    <input name="firstname" type="text" value={firstname} onChange={changeHandler} placeholder="Prénom" required />
                    <input name="name" type="text" value={name} onChange={changeHandler} placeholder="Nom" required />
                </div>

                <div className="row email">
                    <input name="email" type="email" value={email} onChange={changeHandler} placeholder="Email" required />
                </div>

                <div className="row password">
                    <input name="password" type="password" minLength="4" value={password} onChange={changeHandler} placeholder="Mot de passe" required />
                </div>

                <div className="row radio">

                    <input id="male" type="radio" name="gender" value="Homme" onChange={changeHandler} />
                    <label htmlFor="male">Homme</label>

                    <input id="female" type="radio" name="gender" value="Femme" onChange={changeHandler} />
                    <label htmlFor="female">Femme</label>

                </div>

                <button className="btn-validate btn-green" type="submit">Inscription</button>
            </form>
            <div className={ error !== '' ? 'error' : 'error hide' }>{error}</div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUser: (token, user) => dispatch(setUser(token, user))
    }
}

export default connect(null, mapDispatchToProps)(Register)
