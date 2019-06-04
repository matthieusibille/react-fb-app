import React, { Component } from 'react'
import '../css/PostsListComponent.css'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import 'moment/locale/fr';
import {getPostsList, updatePostsList} from '../actions/postsActions'

class PostsList extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         posts:[],
         error:''
      }
    }
    
    componentDidMount(){
        this.props.onGetPostsList();
        this.props.onUpdatePostsList()
    }

  render() {
    const {posts} = this.props
    return (
      <div className="posts-list">
        {
            posts.length ?
            posts.map(post => 
            <div key={post._id} className="post">
              <div className="user-container">
                <div className="user-img"></div>
                <div className="user">{ post.username } <Moment subtract={{ seconds: 5 }} fromNow>{ post.timeStamp }</Moment></div>
              </div>
              <div className="message">{ post.message }</div>
            </div>
            ) : null
        }
        {
           null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        posts:state.posts.posts
     }
}
const mapDispatchToProps = (dispatch) => {
  return{ 
      onGetPostsList : () =>{ dispatch( getPostsList() ) },
      onUpdatePostsList : () =>{ dispatch( updatePostsList() ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
