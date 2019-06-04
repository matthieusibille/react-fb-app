const initState = {
    posts:[]
}

export default function postsReducer(state = initState, action){
    switch(action.type){
        case 'INSERT_NEW_POST':{
            return { ...state, posts:[action.payload, ...state.posts] }
        }    
        case 'GET_POSTS_LIST':{
            return { posts: action.payload }
        }    
    }
    return state
}
