import axios from 'axios'
import connectToSocket from 'socket.io-client';
const socket = connectToSocket('https://ms-demo-react-api.herokuapp.com');

export const insertNewPost = (token, message) => {

    return dispatch => {
        let serverPayload = { message: message }
        axios.post('https://ms-demo-react-api.herokuapp.com/api/insert-post', serverPayload, {
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

        axios.get('https://ms-demo-react-api.herokuapp.com/api/posts')
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