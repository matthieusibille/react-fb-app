//REDUX
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
/* import {createLogger} from 'redux-logger' */

//REDUCERS
import userReducer from './reducers/userReducer'
import postsReducer from './reducers/postsReducer'

const reducers = combineReducers({
    data: userReducer,
    posts: postsReducer
})

const middleware = applyMiddleware(/* createLogger(), */thunk)

export default createStore(reducers, middleware)