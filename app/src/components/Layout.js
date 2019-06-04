import React from 'react'
import Header from './Header';
import PostForm from './PostForm';
import PostsList from './PostsList';
import { connect } from 'react-redux'
import Register from './Register';
import '../css/LayoutComponent.css'
import Stack from './Stack';
import UserList from './UserList';

function Layout(props) {

    if ( !props.userConnected ) {
        return (
            <div>
                <Header />
                <div className="main">
                    <Stack />
                    <Register />
                </div>
                
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <div className="main">
                    <Stack />
                    <div className="posts-container">
                        <PostForm />
                        <PostsList />
                    </div>
                    <UserList />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.user.token && state.user.user) {
        return {
            userConnected: true
        }
    } else {
        return {
            userConnected: false
        }
    }
}

export default connect(mapStateToProps)(Layout)
