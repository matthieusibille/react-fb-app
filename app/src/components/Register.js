import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../actions/userActions'
import axios from 'axios'
import '../css/RegisterComponent.css'

class register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstname: '',
            name: '',
            email: '',
            password: '',
            gender: '',
            error: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        axios.post('https://ms-demo-react-api.herokuapp.com/api/register/', this.state)
            .then(response => {
                this.props.onUpdateUser(response.data.token, response.data.userData)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.userData._id)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    submitHandler = (e) => {
        e.preventDefault()

        if (this.state.username === '' || this.state.firstname === '' || this.state.name === '') {
            this.setState({
                error: "Champ requis manquant"
            })
            return;
        }

        if (!this.validateEmail(this.state.email)) {
            this.setState({
                error: "Format d'email incorrect"
            })
            return;
        }

        if (this.state.password.length < 4) {
            this.setState({
                error: "Le mot de passe doit faire au moins 4 caractères"
            })
            return;
        }

        if (this.state.gender === '') {
            this.setState({
                error: "Genre non renseigné"
            })
            return;
        }

        this.register()

    }

    render() {

        const { username, firstname, name, email, password, error } = this.state

        let errorMessage
        if (error !== '') {
            errorMessage = <div className="error">{error}</div>
        }

        return (
            <div className="register-container">
                <h2>
                    <span>Créer un compte</span>
                    <span>C'est gratuit</span> <span>...comme on revend vos données on va pas abuser</span>
                </h2>
                <form onSubmit={this.submitHandler} noValidate>
                    
                    <div className="row username">
                        <input name="username" type="text" value={username} onChange={this.changeHandler} placeholder="Pseudo" required />
                    </div>
                    
                    <div className="row name">
                        <input name="firstname" type="text" value={firstname} onChange={this.changeHandler} placeholder="Prénom" required />
                        <input name="name" type="text" value={name} onChange={this.changeHandler} placeholder="Nom" required />
                    </div>
                    
                    <div className="row email">
                        <input name="email" type="email" value={email} onChange={this.changeHandler} placeholder="Email" required />
                    </div>
                    
                    <div className="row password">
                        <input name="password" type="password" minLength="4" value={password} onChange={this.changeHandler} placeholder="Mot de passe" required />
                    </div> 
                    
                    <div className="row radio">

                        <input id="male" type="radio" name="gender" value="Homme" onChange={this.changeHandler} />
                        <label htmlFor="male">Homme</label>

                        <input id="female" type="radio" name="gender" value="Femme" onChange={this.changeHandler} />
                        <label htmlFor="female">Femme</label>

                    </div>

                    <button className="btn-validate" type="submit">Inscription</button>
                </form>
                {errorMessage}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateUser: (token, user) => dispatch(updateUser(token, user))
    }
}

export default connect(null, mapDispatchToProps)(register)
