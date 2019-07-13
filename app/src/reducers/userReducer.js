import produce from 'immer'

const initState = {
    token: undefined,
    user: undefined,
    userList: [],
    error:''
}

export default function userReducer(state = initState, action){
    switch(action.type){
        case 'UPDATE_USER':{
            return { ...state, token: action.payload.token, user: action.payload.user }
        }    
        case 'CLEAR_USER_DATA':{  
            return { token: undefined, user: undefined, userList: [] }
        }    
        case 'GET_USER_LIST':{
            return { ...state, userList: action.payload }
        }    
        case 'UPDATE_USER_LIST':{

            let newState = produce( state, draftState => {

                let userIndex = state.userList.findIndex(user => user._id === action.payload._id);
                if(userIndex !== -1){
                    draftState.userList[userIndex].online = action.payload.online;
                }else{
                    let newUser = {
                        _id: action.payload._id,
                        username: action.payload.username,
                        online: action.payload.online
                    }
                    draftState.userList.push(newUser)
                }

            })
            //console.log('newState', newState)
            return{
                ...state,
                userList: newState.userList
            }
 
        }
        case 'USER_LOGIN_ERROR':{
            return { ...state, error: action.payload}
        }
        default:{
            return {...state}  
        }        
    }

}
