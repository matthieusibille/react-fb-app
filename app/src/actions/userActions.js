import axios from 'axios'

import connectToSocket from 'socket.io-client';
const socket = connectToSocket('https://ms-demo-react-api.herokuapp.com');

export const updateUser = (token, data) => {
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
        axios.get('https://ms-demo-react-api.herokuapp.com/api/users')
            .then(response => {
                dispatch({
                    type: 'GET_USER_LIST',
                    payload: response.data
                })
                let token = localStorage.getItem('token')
                socket.emit('userConnected', token )
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateUserList = () =>{
    return dispatch =>{
        socket.on('updateUserList', (user) =>{
            dispatch({
                type: 'UPDATE_USER_LIST',
                payload: user
            })
        })
    }
}

export const getUserData = (token) => {

    return dispatch => {

        axios.get('https://ms-demo-react-api.herokuapp.com/api/user', {
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

export const clearUserData = (token) => {
    socket.emit('userDisconnected', token)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    return {
        type: 'CLEAR_USER_DATA'
    }
}