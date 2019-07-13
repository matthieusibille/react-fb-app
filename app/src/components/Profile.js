import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import {updateUserProfile} from '../actions/userActions'

import '../scss/Profile.scss'

function Profile(props) {

    const [userData, setUserData] = useState({
        email: '',
        firstname: '',
        name: '',
        username: '',
        password: '',
        gender: ''
    })

    const changeHandler = (e) => {
        setUserData({
            ...userData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.onUpdateUserProfile(userData)
    }

    useEffect(() => {
        if (props.user) {
            setUserData({
                ...userData,
                email: props.user.email,
                firstname: props.user.profile.firstname,
                name: props.user.profile.name,
                username: props.user.profile.username,
                gender: props.user.profile.gender
            })

        }
        
    }, [props])

    const { email, firstname, name, username, password, gender } = userData

    return (
        props.userConnected ?
            <div className="profile form-container">

                <label className="header-label">Profile</label>

                <form className="form" onSubmit={submitHandler} noValidate>
                    <div className="row username">
                        <input type="text" name="username" value={username} onChange={changeHandler} placeholder="Pseudo" />
                    </div>

                    <div className="row firstname">
                        <input type="text" name="firstname" value={firstname} onChange={changeHandler} placeholder="Prénom" />
                    </div>

                    <div className="row name">
                        <input type="text" name="name" value={name} onChange={changeHandler} placeholder="Nom" />
                    </div>

                    <div className="row email">
                        <input type="email" name="email" value={email} onChange={changeHandler} placeholder="Email" />
                    </div>

                    <div className="row password">
                        <input type="password" name="password" value={password} onChange={changeHandler} placeholder="Mot de passe" />
                    </div>

                    <div className="row radio">

                        <input id="male" type="radio" name="gender" value="Homme" checked={gender === 'Homme' ? true : false} onChange={changeHandler} />
                        <label htmlFor="male">Homme</label>

                        <input id="female" type="radio" name="gender" value="Femme" checked={gender === 'Femme' ? true : false} onChange={changeHandler} />
                        <label htmlFor="female">Femme</label>

                    </div>
                    <button type="submit" className="btn-validate btn-blue">Mettre à jour</button>
                </form>
            </div>
            : <Redirect to="/" />
    )
}

const mapStateToProps = (state) => {

    if (state.data.token && state.data.user) {
        return {
            userConnected: true,
            user: state.data.user
        }
    } else {
        return {
            userConnected: false
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateUserProfile: (userData) => { dispatch(updateUserProfile(userData)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
