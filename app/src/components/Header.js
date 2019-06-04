import React, { Component } from 'react'
import Login from './Login';
import { connect } from 'react-redux'
import '../css/HeaderComponent.css'
import { getUserData, clearUserData } from '../actions/userActions'


class Header extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = { }
    }
    
    
    logOutHandler = () =>{
        let token = localStorage.getItem('token');
        this.props.onClearUserData(token)
        
    }

    componentDidMount(){
        if( localStorage.getItem('token') ){
            let token = localStorage.getItem('token');
            this.props.onGetUserData(token)
        }
    }

    render(){
        
        if(this.props.display){
            return (
                <header className="top">
                    <h1>
                        <span className="center">
                            Facebook du <span>Très</span> pauvre
                        </span>
                        <span className="stamp">Alpha</span>
                    </h1>
                    <Login />
                </header>
              )
        }else{
            return (
                <header className="top">
                    <h1>
                        <span className="center">
                            Facebook du <span>Très</span> pauvre
                        </span>
                        <span className="stamp">Alpha</span>
                    </h1>
                    <div className="user">{this.props.username}</div>
                    <button className="logout" onClick={this.logOutHandler}>Déconnexion</button>
                </header>
             )
        }

    }
  
}

const mapStateToProps = (state) =>{
    if(state.user.token && state.user.user){
        return{
            display:false,
            username:state.user.user.profile.username
        }
    }else{
        return{
            display:true
        }
    }
    
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onGetUserData: (token) => { dispatch(getUserData(token)) },
        onClearUserData: (token) => { dispatch(clearUserData(token) )}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
