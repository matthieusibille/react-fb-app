import React, { useEffect } from 'react';

import '../scss/Header.scss';

import { getUserData, clearUserData } from '../actions/userActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import Login from './Login';
import Logo from './Logo';

function Header(props) {

    const logOutHandler = () => {
        props.onClearUserData()
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.onGetUserData()
        }
    }, [])

    if (props.display) {
        return (
            <header className="top">
                <Logo />
                <Login />
            </header>
        )
    } else {
        return (
            <header className="top">
                <Logo />
                <div className="user">
                    <Link to="/profile"><i className="material-icons">account_box</i> {props.username}</Link>
                </div>
                <button className="logout" onClick={logOutHandler} title="Se déconnecter"><i className="material-icons">exit_to_app</i></button>
            </header>
        )
    }

}

const mapStateToProps = (state) => {
    if (state.data.token && state.data.user) {
        return {
            display: false,
            username: state.data.user.profile.username
        }
    } else {
        return {
            display: true
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserData: () => { dispatch(getUserData()) },
        onClearUserData: () => { dispatch(clearUserData()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
