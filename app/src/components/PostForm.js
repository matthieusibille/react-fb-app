import React, { Component } from 'react'
import '../css/PostFormComponent.css'
import {connect} from 'react-redux'
import {insertNewPost} from '../actions/postsActions'

class PostForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message:''
        }
    }

    changeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    submitHandler = (e) =>{
        e.preventDefault()
        let token = localStorage.getItem('token')
        this.props.onInsertNewPost(token, this.state.message)
        this.setState({
            message: ''
        })
    }

    render() {
        const { message } = this.state
        return (
            <div className="post-form">
                <label className="header-label">
                    Créer une publication <span>...même si tu sais très bien que ca n'intéresse personne</span>
                </label>
                <form onSubmit={this.submitHandler}>
                    <textarea name="body" value={message} onChange={this.changeHandler} placeholder='Exprime toi !'></textarea>
                    <button className="btn-validate" type="submit">Publier</button>
                </form>
            </div>
        )
    }
}

/* const mapStateToProps = (state) => {
    return{
        message:''
     }
} */
const mapDispatchToProps = (dispatch) => {
    return{ 
        onInsertNewPost : (token, message) =>{ dispatch(insertNewPost(token, message) ) }
    }
}

export default connect(null, mapDispatchToProps)(PostForm)
