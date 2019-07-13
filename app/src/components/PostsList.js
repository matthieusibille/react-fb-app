import React, { useEffect } from 'react'
import '../scss/PostsList.scss'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import 'moment/locale/fr';
import { getPostsList, updatePostsList,clearSockets } from '../actions/postsActions'

function PostsList(props) {
  
  const { posts } = props
  
  useEffect(() => {
    props.onUpdatePostsList()
    props.onGetPostsList();

    return () =>{
      props.onClearSockets();
    }
  },[])

  
  return (
    <div className="posts-list">
      {
        posts.length ?
          posts.map(post =>
            <div key={post._id} className="post">
              <div className="user-container">
                <div className="user-img"></div>
                <div className="user">{post.username} <Moment subtract={{ seconds: 5 }} fromNow>{post.timeStamp}</Moment></div>
              </div>
              <div className="message">{post.message}</div>
            </div>
          ) : null
      }
      {
        null
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGetPostsList: () => { dispatch(getPostsList()) },
    onUpdatePostsList: () => { dispatch(updatePostsList()) },
    onClearSockets: () => { dispatch(clearSockets()) },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
