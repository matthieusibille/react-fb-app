import connectToSocket from 'socket.io-client';

const socket = connectToSocket('https://ms-demo-react-api.herokuapp.com');


export const userConnected = (user) =>{
    socket.emit('userConnected', user)
}

export const userDisconnected = (user) =>{
    socket.emit('userDisconnected', user)
}