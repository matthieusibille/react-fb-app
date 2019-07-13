import React, { useState } from 'react'

import { connect } from 'react-redux'
import { insertNewPost } from '../actions/postsActions'

import '../scss/PostForm.scss'

function PostForm(props) {

    const [state, setState] = useState({ message: '' })
    const { message } = state

    const changeHandler = (e) => {
        setState({
            ...state,
            message: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.onInsertNewPost(state.message)
        setState({
            ...state,
            message: ''
        })
    }

    return (
        <div className="form-container">

            <label className="header-label">
                Créer une publication <span>...même si tu sais très bien que ca n'intéresse personne</span>
            </label>

            <form  className="form" onSubmit={submitHandler}>
                <textarea name="body" value={message} onChange={changeHandler} placeholder='Exprime toi !'></textarea>
                <button className="btn-validate btn-blue" type="submit">Publier</button>
            </form>

        </div>
    )
}


/* const mapStateToProps = (state) => {
    return{
        message:''
     }
} */
const mapDispatchToProps = (dispatch) => {
    return {
        onInsertNewPost: (message) => { dispatch(insertNewPost(message)) }
    }
}

export default connect(null, mapDispatchToProps)(PostForm)
