import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList, updateUserList} from '../actions/userActions'
import '../css/UserListComponent.css'

class UserList extends Component {
    
    componentDidMount(){
        this.props.onGetUserList()
        this.props.OnUpdateUserList()
    }
    
    filterUserList = (user) =>{
        let userId = localStorage.getItem('id')
        return user.online === true && user._id !== userId
    }

    render() {

        const {userList} = this.props

        let usersOnline = userList.filter( this.filterUserList )

        return(
            <div className="user-list-container">
                <h2 className="header-label">Membres</h2>
                <div className="user-list">
                {
                    usersOnline.length ?    
                    usersOnline.map( user => 
                        <div key={user._id} className="user">
                            <span className={user.online ? "status online" : "status"}></span> 
                            <span className="username">{user.username}</span>
                        </div>
                    ) : <div className="emptyList">Aucun membre connecté</div>
                }
                {
                    null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userList: state.user.userList
     }
}

const mapDispatchToProps = (dispatch) => {
  return{ 
      onGetUserList : () =>{ dispatch( getUserList() ) },
      OnUpdateUserList : () =>{ dispatch( updateUserList() ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
