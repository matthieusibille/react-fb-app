import axios from 'axios'

import {apiUrl, insertPostUrl, getPostsListUrl} from '../const/api'

import connectToSocket from 'socket.io-client';
const socket = connectToSocket(apiUrl);

export const insertNewPost = (message) => {
    return dispatch => {
        let token = localStorage.getItem('token')
        let msg = message

        axios.post(insertPostUrl, {message: msg}, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                dispatch({
                    type: 'INSERT_NEW_POST',
                    payload: response.data.post
                })
                socket.emit('newPostPublished', response.data.post)
            })
            .catch(error => {
                console.log(error)
            })
    }

}

export const getPostsList = () => {
    return dispatch => {

        axios.get(getPostsListUrl)
            .then(response => {
                dispatch({
                    type: 'GET_POSTS_LIST',
                    payload: response.data.filteredPosts
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const updatePostsList = () => {
    return dispatch => {
        socket.on('updatePostsList',(newPost) =>{
            dispatch({
                type: 'INSERT_NEW_POST',
                payload: newPost
            })
        })
    }

}

export const clearSockets = () =>{
    return dispatch => {
        socket.removeListener('updatePostsList')
    }
}

