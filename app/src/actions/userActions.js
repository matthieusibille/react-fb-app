import axios from 'axios'

import {apiUrl, loginUrl, getUserListUrl, updateUserUrl, getUserUrl} from '../const/api'

import connectToSocket from 'socket.io-client';
const socket = connectToSocket(apiUrl);

export const userLogin = (state) => {
    return dispatch => {
        axios.post(loginUrl, state)
            .then((response) => {
                const data = response.data
                if (data.noUser) {
                    dispatch({
                        type: 'USER_LOGIN_ERROR',
                        payload: 'Utilisateur inexistant'
                    })
                }
                if (data.wrongPassword) {
                    dispatch({
                        type: 'USER_LOGIN_ERROR',
                        payload: 'Mot de passe incorrect'
                    })
                }
                if (data.userData && data.token) {
                    dispatch({
                        type: 'UPDATE_USER',
                        payload: {
                            token: data.token,
                            user: data.userData
                        }
                    })
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.userData._id)
                }
            })
            .catch(error => {
                console.log('error', error)
            })
    }
}

export const setUser = (token, data) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            token: token,
            user: data
        }
    }
}

export const getUserList = () => {

    return dispatch => {
        axios.get(getUserListUrl)
            .then(response => {
                dispatch({
                    type: 'GET_USER_LIST',
                    payload: response.data
                })
                let token = localStorage.getItem('token')
                socket.emit('userConnected', token)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateUserProfile = (userData) => {

    let token = localStorage.getItem('token')
    return dispatch => {
        axios.post(updateUserUrl, userData, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        .then( response =>{
            //todo : update user info on front
            console.log(response.data);
            
        })
        .catch(error =>{
            console.log(error)

        })
    }

}

export const updateUserList = () => {
    return dispatch => {
        socket.on('updateUserList', (user) => {
            dispatch({
                type: 'UPDATE_USER_LIST',
                payload: user
            })
        })
    }
}

export const getUserData = () => {

    return dispatch => {
        let token = localStorage.getItem('token')
        axios.get(getUserUrl, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                dispatch({
                    type: 'UPDATE_USER',
                    payload: {
                        token: token,
                        user: response.data
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

}

export const clearUserData = () => {
    let token = localStorage.getItem('token')
    socket.emit('userDisconnected', token)
    socket.removeListener('updateUserList')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    return {
        type: 'CLEAR_USER_DATA'
    }
}