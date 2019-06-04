import React, { Component } from 'react'
import axios from 'axios'
import '../css/LoginComponent.css'
import {connect} from 'react-redux'
import {updateUser} from '../actions/userActions'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            password: '',
            noUser: undefined,
            wrongPassword: undefined
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()

        axios.post('https://ms-demo-react-api.herokuapp.com/api/login/', this.state)
            .then(response => {
                const data = response.data
                if(data.noUser){
                    this.setState({ noUser: data.noUser })
                }
                if(data.wrongPassword){
                    this.setState({ wrongPassword: data.wrongPassword })
                }
                if(data.userData && data.token){
                    this.props.onUpdateUser(data.token, data.userData)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.userData._id)
                    
                }
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    render() {
        const { userId, password, noUser, wrongPassword } = this.state
        let error
        if (noUser) {
            error = <div className="error">Cet utilisateur n'existe pas</div>
        }
        if (wrongPassword) {
            error = <div className="error">Mot de passe incorrect</div>  
        }

        if (!this.props.userData) {
            return (
                <div className="loginBox">
                    <form onSubmit={this.submitHandler}>
                        <div className="col">
                            <div className="row">
                                <span>Adresse e-mail</span>
                                <input type="text" name="userId" value={userId} onChange={this.changeHandler}/>
                            </div>
                            <div className="row">
                                <span>Mot de passe</span>
                                <input type="password" name="password" value={password} onChange={this.changeHandler}/>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn-validate" type="submit">Se connecter</button>
                        </div>
                    </form>
                    {error}
                </div>
            )
        }else{
            return null
        }


    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onUpdateUser: (token, user) => dispatch( updateUser(token, user) )
    }
}


export default connect(null, mapDispatchToProps)(Login)
/* export default Login */
