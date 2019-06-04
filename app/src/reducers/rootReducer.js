import axios from 'axios';

const initState = {
    token: undefined,
    user:undefined
}

const rootReducer = (state = initState, action) => {
    
    if(localStorage.getItem('token')){

        let token = localStorage.getItem('token')
        let userData;

        axios.get('https://ms-demo-react-api.herokuapp.com/api/user', {
            headers: {
              authorization: 'Bearer ' + token
            }})
        .then(response => {
            console.log(response)
            userData = response.data
            
    
        })
        .catch(error => {
            console.log(error)
        })

        return{
            token: token,
            user: userData
        }
    }
    

    if(action.type === 'UPDATE_USER'){
        return{
            token:action.token,
            /* userData:action.userData */
        }
    }

    return state;
}

export default rootReducer