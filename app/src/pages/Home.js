import React from 'react'
import '../scss/Home.scss'

import PostForm from '../components/PostForm';
import PostsList from '../components/PostsList';
import Register from '../components/Register';
import Stack from '../components/Stack';
import UserList from '../components/UserList';

import { connect } from 'react-redux'

function Home(props) {

    if (!props.userConnected) {
        return (
            <>
                <div className="main">
                    <Stack />
                    <Register />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="main">
                    <Stack />
                    <div className="posts-container">
                        <PostForm />
                        <PostsList />
                    </div>
                    <UserList />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.data.token && state.data.user) {
        return {
            userConnected: true
        }
    } else {
        return {
            userConnected: false
        }
    }
}

export default connect(mapStateToProps)(Home)
